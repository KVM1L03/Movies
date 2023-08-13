import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Searchbar } from "react-native-paper";
import CardComp from "../components/CardComp";
import { useFonts } from "expo-font";

const DATA = [
  {
    id: 1,
    title: "Title 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident",
  },
  {
    id: 2,
    title: "Title 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident",
  },
  {
    id: 3,
    title: "Title 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident",
  },
];

type Props = {};

const HomeScreen = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [fontsLoaded] = useFonts({
    "Handjet-Bold": require("../assets/fonts/Handjet-Regular.ttf"),
  });

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <SafeAreaView>
      <Header />
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        value={searchQuery}
        onChangeText={onChangeSearch}
      />

      {searchQuery === "" ? (
        <View>
          <Text style={styles.text}> TOP 5 MOVIES TODAY </Text>
          <Divider />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={DATA}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CardComp title={item.title} description={item.description} />
            )}
          />
        </View>
      ) : (
        <>{/*Search results*/}</>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 35,
    fontWeight: "500",
    marginVertical: 10,
    alignSelf: "center",
    fontFamily:'Handjet-Bold'
  },
});

export default HomeScreen;
