import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Divider, Searchbar } from "react-native-paper";
import CardComp from "../components/CardComp";
import { useSearchMoviesQuery, useGetPopularMoviesQuery } from "../api";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useGetPopularMoviesQuery();
  const { data: searchData } = useSearchMoviesQuery(searchQuery);
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const navigation = useNavigation();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error :( </Text>;
  }

  return (
    <SafeAreaView>
      <Header />
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        inputStyle={{ fontFamily: "Handjet-Regular", fontSize: 20 }}
        value={searchQuery}
        onChangeText={onChangeSearch}
      />
      {searchQuery === "" ? (
        <View>
          <Text style={styles.text}>
            TRENDING WORLDWIDE <Ionicons name="earth" size={30} color="black" />
          </Text>
          <Divider />
          <Carousel
            firstItem={1}
            inactiveSlideOpacity={0.6}
            sliderWidth={400}
            itemWidth={200}
            slideStyle={{ display: "flex", alignItems: "center" }}
            data={data.results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }: { item: any }) => (
              <CardComp
                title={item.title}
                image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                popularity={item.popularity}
                voteCount={item.vote_count}
                navigation={navigation}
                overview={item.overview}
                genre_ids={item.genre_ids}
                genreNames={item.genreNames}
                production_countries={item.production_countries}
                id={item.id}
              />
            )}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.text}>
            Search Results <Ionicons name="search" size={24} color="#212121" />
          </Text>
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
                genre_ids={item.genre_ids}
                genreNames={item.genreNames}
                production_countries={item.production_countries}
                id={item.id}
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
    marginVertical: 10,
    alignSelf: "center",
    fontFamily: "Handjet-Bold",
    color: "#212121",
  },
});

export default HomeScreen;
