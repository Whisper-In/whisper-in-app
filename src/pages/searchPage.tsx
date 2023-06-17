import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { HomePageNavigationProp } from "../navigation/types";
import { useEffect, useState } from "react";
import SearchNavigationBar from "../components/organisms/searchNavigationBar";
import { searchProfiles } from "../store/services/profileService";
import { IProfileSearchDto } from "../store/dtos/profile.dtos";
import SearchProfileListItem from "../components/molecules/searchProfileListItem";

export default function SearchPage({ navigation }: { navigation: HomePageNavigationProp }) {
    const [query, setQuery] = useState<string>();
    const [profiles, setProfiles] = useState<IProfileSearchDto[]>([]);

    useEffect(() => {
        navigation.setOptions({
            header: (props) => <SearchNavigationBar {...props} onSearchChange={(event) => setQuery(event.nativeEvent.text)} />
        });
    }, []);

    useEffect(() => {
        const _searchProfiles = async () => {
            try {
                if (query) {
                    const result = await searchProfiles(query);

                    if (result)
                        setProfiles(result);
                    else
                        setProfiles([]);
                } else {
                    setProfiles([]);
                }
            } catch (error) {
                console.log(error);
            }
        }

        _searchProfiles();
    }, [query]);

    if (profiles.length) {
        return (
            <FlatList
                data={profiles}
                renderItem={({ item, index }) => {
                    return <SearchProfileListItem
                        profile={item}
                        onPress={() => {
                            navigation.navigate("Profile", {
                                profileId: item.id,
                                isAI: true
                            })
                        }} />
                }} />
                
        );
    } else {
        return <Text style={{ margin: 10, textAlign: "center" }}>No results found.</Text>
    }
}