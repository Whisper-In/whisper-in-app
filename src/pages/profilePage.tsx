import { RouteProp, useRoute } from "@react-navigation/native";
import { Alert, View } from "react-native";
import { Avatar, Button, Text, useTheme } from "react-native-paper";
import { HomePageNavigationProp, HomeStackNavigatorParamList } from "../navigation/types";
import { useEffect, useState } from "react";
import { IPriceTierDto, IProfileDto } from "../store/dtos/profile.dtos";
import { getProfile } from "../store/services/profileService";
import { createSubscriptionPaymentSheet } from "../store/services/paymentService";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import appJson from "../../app.json";
import { useAppDispatch, useAppSelector } from "../store/store";
import SubscribeButton from "../components/atoms/subscribeButton";
import { Tabs, TabScreen } from "react-native-paper-tabs";
import Icon from "react-native-paper/src/components/Icon";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { options } from "axios";
import { createNewChat } from "../store/services/chatService";
import { createUserAISubscription } from "../store/services/userService";
import { isFulfilled } from "@reduxjs/toolkit";
import { fetchChats } from "../store/slices/chats/thunks";

export default function ProfilePage({ navigation }: { navigation: HomePageNavigationProp }) {
    const theme = useTheme();
    const route = useRoute<RouteProp<HomeStackNavigatorParamList, "Profile">>();
    const [profile, setProfile] = useState<IProfileDto>();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isPaymentInitialized, setIsPaymentInitialized] = useState(false);
    const me = useAppSelector(state => state.user.me);

    const dispatch = useAppDispatch();

    const initializePaymentSheet = async (aiProfileId:string, price: number) => {
        try {
            const paymentSheetResult = await createSubscriptionPaymentSheet(price, {
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
                    defaultBillingDetails: {
                        name: me?.name,
                        email: me?.email
                    }
                });

                setIsPaymentInitialized(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (route.params.profileId) {
            getProfile(route.params.profileId, route.params.isAI)
                .then(result => {
                    setProfile(result);

                    if (result?.priceTiers?.length && result?.priceTiers[0].price)
                        initializePaymentSheet(result.id, result?.priceTiers[0].price);
                    else
                        setIsPaymentInitialized(true);

                    if (result?.isSubscribed) {
                        setIsSubscribed(true);                        
                    }
                });
        }
    }, []);

    const openPaymentSheet = async () => {
        createUserAISubscription(me!.id, profile!.id, profile!.priceTiers?.length ? profile!.priceTiers[0].tier : 0);

        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            const navigateToChat = (chatId: string) => {
                navigation.replace("Chat", {
                    chatId,
                    contactId: profile!.id,
                    name: profile!.name,
                    avatar: profile!.avatar,
                    isAI: route.params.isAI
                });
            }
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
    }

    const getSubscriptionPrice = (priceTiers: IPriceTierDto[]) => {
        if (priceTiers?.length) {
            return priceTiers[0].price / 100;
        } else {
            return 0;
        }
    }

    if (isPaymentInitialized && profile) {
        return (
            <View>
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
                        {profile.name}
                    </Text>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 30
                    }}>
                        <View style={{ marginRight: 10 }}>
                            <Icon source="information-outline"
                                size={20} />
                        </View>

                        <Text style={{
                            ...theme.fonts.bodyMedium
                        }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Text>
                    </View>

                    {route.params.isAI &&
                        <SubscribeButton
                            isSubscribed={isSubscribed}
                            price={getSubscriptionPrice(profile.priceTiers)}
                            onPress={() => openPaymentSheet()}
                            style={{
                                marginBottom: 20
                            }} />}
                </View>

                <Tabs
                    dark={false}
                    uppercase={false}
                    mode="scrollable"
                    showLeadingSpace={false}
                    style={{
                        backgroundColor: "transparent"
                    }}>
                    <TabScreen label="Bookmarks" icon="star-outline">
                        <View>
                            <Text>Bookmarks</Text>
                        </View>
                    </TabScreen>
                    <TabScreen label="Images" icon="image-outline">
                        <View>
                            <Text>Images</Text>
                        </View>
                    </TabScreen>
                    <TabScreen label="Videos" icon="video-outline">
                        <View>
                            <Text>Videos</Text>
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