import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useGetGenresQuery } from "../api";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from 'react-native-paper';

type DetailsScreenRouteProp = RouteProp<ParamList, "Details">;

type ParamList = {
  Details: {
    movieData: {
      title: string;
      image: string;
      popularity: number;
      voteCount: number;
      overview: string;
      country: string;
      genre_ids: number[];
      id: number;
    };
  };
};

const DetailsScreen = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const movieData = route.params?.movieData;

  if (!movieData) {
    return <Text>Loading...</Text>;
  }

  const { title, image,  overview, country, genre_ids } =
    movieData;

  const {
    data: genreData,
    error: genreError,
    isLoading: genreLoading,
  } = useGetGenresQuery();

  if (genreLoading) {
    return <Text>Loading genres...</Text>;
  }

  if (genreError) {
    console.error("Error fetching genres:", genreError);
    return <Text>Error fetching genres</Text>;
  }

  const genreMap: Record<number, string> = {};
  genreData?.genres.forEach((genre: { id: number; name: string }) => {
    genreMap[genre.id] = genre.name;
  });

  const movieGenreNames = genre_ids.map((genreId) => genreMap[genreId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.text_head}>{title}</Text>
        <Text style={styles.text_content}>{overview}</Text>
        <Text>Country: {country}</Text>
        
        
          {movieGenreNames.map((genreName, index) => (
          <View style={styles.button_container}>
          <Button mode='outlined'>
            <Text key={index}>{genreName}</Text>
          </Button>
          </View>
          ))}
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  image: {
    height: 400,
    width: 400,
    resizeMode: "contain",
    alignSelf: "center",
  },
  text_head: {
    fontSize: 30,
    fontWeight: "500",
    marginVertical: 10,
    alignSelf: "center",
    fontFamily: "Handjet-Bold",
  },
  text_content: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "Handjet-Regular",
  },
  button_container:{
    margin:10,
    width:170,
    alignSelf:'center'
    
  }
});

export default DetailsScreen;
