import { RouteProp, useRoute } from "@react-navigation/native";
import { Alert, Pressable, View } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";
import { HomePageNavigationProp, HomeStackNavigatorParamList } from "../../navigation/types";
import { useEffect, useRef, useState } from "react";
import { IPriceTierDto, IProfileDto } from "../../store/dtos/profile.dtos";
import * as profileService from "../../store/services/profileService";
import { PaymentSheet, initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import appJson from "../../../app.json";
import { useAppDispatch, useAppSelector } from "../../store/store";
import SubscribeButton from "../../components/profile/subscribeButton";
import { Tabs, TabScreen } from "react-native-paper-tabs";
import Icon from "react-native-paper/src/components/Icon";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { createNewChat, updateChatProfileBlockStatus } from "../../store/services/chatService";
import { createUserAISubscription } from "../../store/services/userService";
import { fetchChats } from "../../store/slices/chats/thunks";
import { ChatFeature } from "../../store/states/chatsState";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { IReportReasonDto } from "../../store/dtos/business.dtos";
import * as reportService from "../../store/services/reportService";
import PostList from "../../components/profile/postList";
import { PostDto, PostType } from "../../store/dtos/content.dtos";
import * as postService from "../../store/services/postService";
import { isFulfilled } from "../../utils/promise";
import ProfileStatItem from "../../components/profile/profileStatItem";

export default function ProfilePage({ navigation }: { navigation: HomePageNavigationProp }) {
    const theme = useTheme();
    const isDarkMode = useAppSelector((state) => state.app.darkMode);
    const route = useRoute<RouteProp<HomeStackNavigatorParamList, "Profile">>();
    const [profile, setProfile] = useState<IProfileDto>();
    const [isPaymentUpdateInProgress, setIsPaymentUpdateInProgress] = useState(false);
    const me = useAppSelector(state => state.user.me);
    const { showActionSheetWithOptions } = useActionSheet();
    const [reportReasons, setReportReasons] = useState<IReportReasonDto[]>();
    const [photos, setPhotos] = useState<PostDto[]>();
    const [videos, setVideos] = useState<PostDto[]>();
    const [pageIndex, setPageIndex] = useState(0);
    const postsPerLoad = 9;

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (route.params.profileId) {
            profileService.getProfile(route.params.profileId, route.params.isAI)
                .then(result => {
                    setProfile(result);
                });
        }

        initHeaderRight();

        getReportReasons();

        getPosts();
    }, []);

    useEffect(() => {
        initHeaderRight();
    }, [reportReasons, profile]);


    const initHeaderRight = () => {
        navigation.setOptions({
            headerRight: (props) => (
                <Pressable onPress={() => showActionSheetWithOptions({
                    options: [
                        profile?.isBlocked ? "Unblock" : "Block",
                        "Report",
                        "Cancel"
                    ],
                    textStyle: {
                        textAlign: "center",
                        flex: 1
                    },
                    cancelButtonIndex: 2,
                    destructiveButtonIndex: [0, 1]
                }, (index) => {
                    switch (index) {
                        case 0:
                            toggleBlockStatus();
                            break;
                        case 1:
                            reportProfile();
                            break;
                    }
                })}>
                    <Icon source="dots-horizontal" size={30} />
                </Pressable>
            )
        });
    }

    const getPosts = async () => {
        try {
            const photosQuery = postService.getPosts(
                route.params.profileId,
                PostType[PostType.PHOTO],
                pageIndex,
                postsPerLoad);

            const videosQuery = postService.getPosts(
                route.params.profileId,
                PostType[PostType.VIDEO],
                pageIndex,
                postsPerLoad)

            const results = await Promise.allSettled([
                photosQuery,
                videosQuery
            ]);

            if (isFulfilled(results[0])) {
                setPhotos(results[0].value);
            }

            if (isFulfilled(results[1])) {
                setVideos(results[1].value);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getReportReasons = async () => {
        try {
            const result = await reportService.getReportReasons();

            setReportReasons(result);
        } catch (error) {
            console.log("Failed to retrieve report reasons.", error);
        }
    }

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

                profile!.isSubscribed = true;
                setProfile({ ...profile } as any);

                Alert.alert('Success', `You have successfully subscribed to ${profile?.name}`,
                    [{
                        text: "Ok",
                        onPress: () => navigateToChat(chatId)
                    }],
                    {
                        onDismiss: () => navigateToChat(chatId)
                    });

                dispatch(fetchChats(me!.id));
            } catch (error) {
                Alert.alert('Create Chat Failed', `You have successfully subscribed to ${profile?.name} but failed to create new chat.`);
            }
        }

        const priceTier = profile!.priceTiers?.length ? profile!.priceTiers[0] : null;

        if (priceTier && priceTier.price > 0) {
            setIsPaymentUpdateInProgress(true);

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
        if (profile?.isSubscribed) {
            Alert.alert("Unsubscribe", "Are you sure you want to unsubscribe?", [{
                text: "Yes",
                onPress: async () => {
                    setIsPaymentUpdateInProgress(true);
                    try {
                        const deletedSubscription = await profileService.cancelPaymentSubscription(me!.id, profile!.id);

                        profile.isSubscribed = false;
                        setProfile({ ...profile });
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

    const getFeatures = (priceTiers: IPriceTierDto[]): ChatFeature[] => {
        if (priceTiers.length) {
            return priceTiers[0].features.map(f => ChatFeature[f as keyof typeof ChatFeature]);
        } else {
            return [];
        }
    }

    const toggleBlockStatus = () => {
        if (profile) {
            profile.isBlocked = !profile.isBlocked;

            const _toggleBlockStatus = async () => {
                try {

                    await updateChatProfileBlockStatus(me?.id!, profile?.id!, profile.isBlocked ?? false);
                } catch (error) {
                    console.log(error);
                }

                setProfile({ ...profile });
                dispatch(fetchChats(me!.id));
            }

            Alert.alert(
                `${profile.isBlocked ? 'Block' : 'Unblock'} Profile`,
                `Are you sure you want to ${profile.isBlocked ? 'block' : 'unblock'} ${profile.name}'s profile?`,
                [
                    {
                        text: "Yes",
                        onPress: () => _toggleBlockStatus()
                    },
                    {
                        text: "No"
                    }
                ]
            );
        }
    }

    const reportProfile = () => {
        const options = reportReasons?.map(reason => reason.reportReasonDescription) ?? [];

        showActionSheetWithOptions({
            options,
            cancelButtonIndex: options.length,
            title: "Report",
            message: "Select a reason for reporting this profile",
            textStyle: {
                textAlign: "center",
                flex: 1
            },
            messageTextStyle: {
                textAlign: "center",
                width: "100%"
            },
            titleTextStyle: {
                textAlign: "center",
                width: "100%"
            }
        }, async (index) => {
            if (index != null && reportReasons && index < reportReasons.length) {
                const { reportReasonCode } = reportReasons[index]

                try {
                    await reportService.sendReport(me!.id, profile!.id, reportReasonCode);

                    Alert.alert("Profile Reported", "Profile has been successfully reported. Thank you.");
                } catch (error) {
                    console.log(error);
                    Alert.alert("Report Profile Failed", "Opps, failed to report profile. Please try again.");
                }
            }
        });
    }

    const viewPost = (post: PostDto) => {
        navigation.navigate("ViewPost", { post });
    }

    if (profile) {
        return (
            <>
                <View style={{ flex: 1 }}>
                    <View style={{
                        alignItems: "center",
                        padding: 15,
                        marginTop: 50
                    }}>
                        <Avatar.Image
                            source={{ uri: profile.avatar }}
                            size={96}
                            style={{ marginBottom: 20 }} />

                        <Text style={{
                            ...theme.fonts.titleLarge,
                            marginBottom: 10
                        }}>
                            {profile.name ?? profile.email}
                        </Text>

                        <View style={{
                            flexDirection: "row",
                            gap: 50,
                            marginBottom: 20
                        }}>
                            <ProfileStatItem label="Posts">
                                {profile.postCount ?? 0}
                            </ProfileStatItem>

                            <ProfileStatItem label="Followers">
                                {profile.followerCount ?? 0}
                            </ProfileStatItem>

                            <ProfileStatItem label="Likes">
                                {profile.totalLikeCount ?? 0}
                            </ProfileStatItem>
                        </View>

                        {route.params.isAI &&
                            <SubscribeButton
                                disabled={isPaymentUpdateInProgress}
                                isSubscribed={profile.isSubscribed ?? false}
                                price={getSubscriptionPrice(profile.priceTiers)}
                                onPress={() => !profile.isSubscribed ? openPaymentSheet() : cancelSubscription()}
                                features={getFeatures(profile.priceTiers)}
                                style={{
                                    marginBottom: 20
                                }} />}

                        <View style={{
                            flexDirection: "row",
                            gap: 10
                        }}>
                        </View>
                    </View>

                    <Tabs
                        dark={isDarkMode}
                        uppercase={false}
                        mode="fixed"
                        showLeadingSpace={false}
                        style={{
                            backgroundColor: "transparent"
                        }}>
                        <TabScreen label="" icon="image-outline">
                            <View style={{
                                flex: 1
                            }}>
                                <PostList style={{
                                    flex: 1,
                                    borderWidth: 1
                                }} posts={photos}
                                    onPostListItemPress={viewPost} />
                            </View>
                        </TabScreen>
                        <TabScreen label="" icon="video-outline">
                            <View style={{
                                flex: 1
                            }}>
                                <PostList style={{
                                    flex: 1,
                                }} posts={videos}
                                    onPostListItemPress={viewPost} />
                            </View>
                        </TabScreen>
                    </Tabs>
                </View>
            </>
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