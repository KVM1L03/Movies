import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Divider, Searchbar } from "react-native-paper";
import CardComp from "../components/CardComp";
import { useFonts } from "expo-font";
import { useSearchMoviesQuery, useGetPopularMoviesQuery } from "../api";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useGetPopularMoviesQuery();
  const { data: searchData } = useSearchMoviesQuery(searchQuery);
  const [fontsLoaded] = useFonts({
    "Handjet-Bold": require("../assets/fonts/Handjet-Bold.ttf"),
    "Handjet-Regular": require("../assets/fonts/Handjet-Regular.ttf"),
  });
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const navigation = useNavigation();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error </Text>;
  }

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
          <Text style={styles.text}> TRENDING </Text>
          <Divider />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data.results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CardComp
                title={item.title}
                image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                popularity={item.popularity}
                voteCount={item.vote_count}
                navigation={navigation}
                overview={item.overview}
                country={item.production_countries}
                genre_ids={item.genre_ids}
                genreNames={item.genreNames} // Make sure you pass the actual genreNames array
              />
            )}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.text}>Search Results</Text>
          <Divider />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={searchData?.results ?? []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CardComp
                title={item.title}
                image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                popularity={item.popularity}
                voteCount={item.vote_count}
                navigation={navigation}
                overview={item.overview}
                country={item.production_countries}
                genre_ids={item.genre_ids}
                genreNames={item.genreNames} 
              />
            )}
          />
        </View>
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
    fontFamily: "Handjet-Bold",
  },
});

export default HomeScreen;
