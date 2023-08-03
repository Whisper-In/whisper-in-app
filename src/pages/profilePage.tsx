import { RouteProp, useRoute } from "@react-navigation/native";
import { Alert, View } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";
import { HomePageNavigationProp, HomeStackNavigatorParamList } from "../navigation/types";
import { useEffect, useState } from "react";
import { IPriceTierDto, IProfileDto } from "../store/dtos/profile.dtos";
import * as profileService from "../store/services/profileService";
import { PaymentSheet, PaymentSheetError, StripeError, initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import appJson from "../../app.json";
import { useAppDispatch, useAppSelector } from "../store/store";
import SubscribeButton from "../components/atoms/subscribeButton";
import { Tabs, TabScreen } from "react-native-paper-tabs";
import Icon from "react-native-paper/src/components/Icon";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { createNewChat } from "../store/services/chatService";
import { createUserAISubscription } from "../store/services/userService";
import { fetchChats } from "../store/slices/chats/thunks";
import { ChatFeature } from "../store/states/chatsState";

export default function ProfilePage({ navigation }: { navigation: HomePageNavigationProp }) {
    const theme = useTheme();
    const isDarkMode = useAppSelector((state) => state.app.darkMode);
    const route = useRoute<RouteProp<HomeStackNavigatorParamList, "Profile">>();
    const [profile, setProfile] = useState<IProfileDto>();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isPaymentUpdateInProgress, setIsPaymentUpdateInProgress] = useState(false);
    const me = useAppSelector(state => state.user.me);

    const dispatch = useAppDispatch();

    const initializePaymentSheet = async (aiProfileId: string, price: number) => {
        try {
            const paymentSheetResult = await profileService.createPaymentSubscription(price, {
                userId: me!.id,
                aiProfileId: aiProfileId
            });

            if (paymentSheetResult) {
                const { error } = await initPaymentSheet({
                    merchantDisplayName: appJson.expo.name,
                    customerId: paymentSheetResult.customer,
                    customerEphemeralKeySecret: paymentSheetResult.ephemeralKey,
                    paymentIntentClientSecret: paymentSheetResult.paymentIntent,
                    allowsDelayedPaymentMethods: true,
                    billingDetailsCollectionConfiguration: {
                        address: PaymentSheet.AddressCollectionMode.NEVER
                    }
                });

                setIsPaymentUpdateInProgress(true);

                return paymentSheetResult.subscriptionId;
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (route.params.profileId) {
            profileService.getProfile(route.params.profileId, route.params.isAI)
                .then(result => {
                    setProfile(result);

                    if (result?.isSubscribed) {
                        setIsSubscribed(true);
                    }
                });
        }
    }, []);

    const navigateToChat = (chatId: string) => {
        navigation.navigate("Chat", {
            chatId,
            contactId: profile!.id,
            name: profile!.name,
            avatar: profile!.avatar,
            isAI: route.params.isAI
        });
    }

    const openPaymentSheet = async () => {
        const _createNewChat = async () => {
            try {
                const chatId = await createNewChat(me!.id, profile!.id);

                Alert.alert('Success', `You have successfully subscribed to ${profile?.name}`,
                    [{
                        text: "Ok",
                        onPress: () => navigateToChat(chatId)
                    }],
                    {
                        onDismiss: () => navigateToChat(chatId)
                    });

                setIsSubscribed(true);
                dispatch(fetchChats(me!.id));
            } catch (error) {
                Alert.alert('Create Chat Failed', `You have successfully subscribed to ${profile?.name} but failed to create new chat.`);
            }
        }

        setIsPaymentUpdateInProgress(true);

        const priceTier = profile!.priceTiers?.length ? profile!.priceTiers[0] : null;

        if (priceTier && priceTier.price > 0) {
            const subscriptionId = await initializePaymentSheet(profile!.id, priceTier.price);

            if (!subscriptionId) {
                Alert.alert("Oops", "Payment initialization failed. Please try again.");
                return;
            }

            createUserAISubscription(me!.id, profile!.id, priceTier ? priceTier.tier : 0, subscriptionId);

            const { error } = await presentPaymentSheet();

            setIsPaymentUpdateInProgress(false);

            if (error) {
                if (error.code == "Canceled") {
                    console.log(`Error code: ${error.code}`, error.message);
                } else {
                    Alert.alert("Oops", "Payment failed. Please try again.");
                }

                return;
            }

            _createNewChat();

        } else {
            await createUserAISubscription(me!.id, profile!.id, priceTier?.tier);

            _createNewChat();
        }
    }

    const cancelSubscription = async () => {
        if (isSubscribed) {
            Alert.alert("Unsubscribe", "Are you sure you want to unsubscribe?", [{
                text: "Yes",
                onPress: async () => {
                    setIsPaymentUpdateInProgress(true);
                    try {
                        const deletedSubscription = await profileService.cancelPaymentSubscription(me!.id, profile!.id);

                        setIsSubscribed(false);
                        setIsPaymentUpdateInProgress(false);
                    } catch (error) {
                        Alert.alert("Unsubscribe Failed", "Please try again.");
                        console.log(error);
                    }
                }
            }, {
                text: "No"
            }]);
        }
    }

    const getSubscriptionPrice = (priceTiers: IPriceTierDto[]) => {
        if (priceTiers?.length) {
            return priceTiers[0].price / 100;
        } else {
            return 0;
        }
    }

    const getFeatures = (priceTiers: IPriceTierDto[]):ChatFeature[] => {                
        if(priceTiers.length) {
            return priceTiers[0].features.map(f => ChatFeature[f as keyof typeof ChatFeature]);
        } else {
            return [];
        }
    }

    if (profile) {
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    alignItems: "center",
                    padding: 15,
                    marginTop: 50
                }}>
                    <Avatar.Image
                        source={{ uri: profile.avatar }}
                        size={150}
                        style={{ marginBottom: 20 }} />

                    <Text style={{
                        ...theme.fonts.titleLarge,
                        marginBottom: 30
                    }}>
                        {profile.name ?? profile.email}
                    </Text>

                    {
                        profile.aboutMe &&
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 30,
                            paddingHorizontal: 10
                        }}>
                            <View style={{ marginRight: 10 }}>
                                <Icon source="information-outline"
                                    size={20} />
                            </View>


                            <Text style={{
                                ...theme.fonts.bodyMedium,
                            }}>
                                {profile.aboutMe}
                            </Text>
                        </View>
                    }

                    {route.params.isAI &&
                        <SubscribeButton
                            disabled={isPaymentUpdateInProgress}
                            isSubscribed={isSubscribed}
                            price={getSubscriptionPrice(profile.priceTiers)}
                            onPress={() => !isSubscribed ? openPaymentSheet() : cancelSubscription()}
                            features={getFeatures(profile.priceTiers)}
                            style={{
                                marginBottom: 20
                            }} />}
                </View>

                <Tabs
                    dark={isDarkMode}
                    uppercase={false}
                    mode="fixed"
                    showLeadingSpace={false}
                    style={{
                        backgroundColor: "transparent"
                    }}>
                    <TabScreen label="Images" icon="image-outline">
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text>No images yet.</Text>
                        </View>
                    </TabScreen>
                    <TabScreen label="Videos" icon="video-outline">
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text>No videos yet.</Text>
                        </View>
                    </TabScreen>
                </Tabs>
            </View>
        );
    } else {
        return (
            <SkeletonPlaceholder highlightColor="#888">
                <SkeletonPlaceholder.Item
                    alignItems="center"
                    padding={15}
                    marginTop={50}
                >
                    <SkeletonPlaceholder.Item
                        width={150}
                        height={150}
                        borderRadius={75}
                        opacity={0.2}
                        marginBottom={20}
                    ></SkeletonPlaceholder.Item>


                    <SkeletonPlaceholder.Item
                        width={150}
                        height={30}
                        opacity={0.2}
                        marginBottom={30}
                    ></SkeletonPlaceholder.Item>

                    <SkeletonPlaceholder.Item
                        width={300}
                        height={50}
                        opacity={0.2}
                        marginBottom={30}
                        flexGrow={1}
                    ></SkeletonPlaceholder.Item>

                    <SkeletonPlaceholder.Item flexDirection="row">
                        <SkeletonPlaceholder.Item
                            flexGrow={1}
                            height={45}
                            opacity={0.2}
                            borderRadius={999}
                        ></SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        )
    }
}