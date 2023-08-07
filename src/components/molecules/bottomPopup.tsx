import { ReactNode } from "react";
import { Modal, ScrollView, View, useWindowDimensions } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useAppSelector } from "../../store/store";

export default function BottomPopup({
    isShowModal,
    header,
    showOk,
    okText,
    onOk,
    showCancel,
    cancelText,
    onCancel,
    children }
    : {
        isShowModal?: boolean,
        header: string,
        showOk?: boolean,
        okText?: string,
        onOk?: () => void,
        showCancel?: boolean,
        cancelText?: string,
        onCancel?: () => void,
        children?: ReactNode
    }) {
    const isDarkMode = useAppSelector((state) => state.app.darkMode);
    const theme = useTheme();
    const { height } = useWindowDimensions();

    if (isShowModal) {
        return (
            <View style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: "#00000055",
                position: "absolute",
                zIndex: 100,
                height: "100%",
                width: "100%",
            }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isShowModal}
                >
                    <View style={{
                        width: "100%",
                        maxHeight: height * 0.9,
                        padding: 15,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        backgroundColor: isDarkMode ? theme.colors.inverseSurface : theme.colors.background,
                        position: "absolute",
                        bottom: 0,
                        paddingBottom: 30
                    }}>
                        <Text style={{
                            color: isDarkMode ? theme.colors.inverseOnSurface : theme.colors.onBackground,
                            marginBottom: 15,
                            ...theme.fonts.titleLarge
                        }}>{header}</Text>

                        <ScrollView
                            contentContainerStyle={{ paddingBottom: 50 }}
                            style={{ marginBottom: 20 }}>
                            {children}
                        </ScrollView>

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: 10
                        }}>
                            {showOk &&
                                <Button
                                    style={{ flexGrow: 1 }}
                                    mode="contained"
                                    labelStyle={{ color: theme.colors.onSecondary }}
                                    contentStyle={{ backgroundColor: theme.colors.secondary }}
                                    onPress={onCancel}>
                                    {cancelText ?? 'Cancel'}
                                </Button>
                            }
                            {showCancel &&
                                <Button
                                    style={{ flexGrow: 1 }}
                                    mode="contained"
                                    onPress={onOk}>
                                    {okText ?? 'OK'}
                                </Button>
                            }
                        </View>
                    </View>
                </Modal>
            </View>
        );
    } else {
        return <></>
    }
}