import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { useGetGenresQuery, useGetMovieDetailsQuery } from "../api";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

var { width, height } = Dimensions.get("window");

type DetailsScreenProps = {
  route: RouteProp<ParamList, "Details">;
};

type ParamList = {
  Details: {
    movieData: {
      title: string;
      image: string;
      overview: string;
      genre_ids: number[];
      id: number;
    };
  };
};

const DetailsScreen = () => {
  // Route hook do pobierania danych z ekranu do ekranu
  const route = useRoute<RouteProp<ParamList, "Details">>();
  const movieData = route.params?.movieData;
  const navigation = useNavigation();
  const { title, image, overview, genre_ids, id } = movieData;

  // Dane filmów po id
  const { data: movieDetailsData, error: movieDetailsError } =
    useGetMovieDetailsQuery(id);

  // useEffect hook do automatycznego 'załadowania' i zmapowania danych o kraju produkcji
  useEffect(() => {
    if (movieDetailsData) {
      const { production_countries } = movieDetailsData;

      if (production_countries && production_countries.length > 0) {
        const countryNames = production_countries
          .map((country) => country.name)
          .join(", ");
      }
    }

    if (movieDetailsError) {
      console.error("Error fetching movie details:", movieDetailsError);
    }
  }, [movieDetailsData, movieDetailsError]);

  if (!movieData) {
    return <Text>Loading...</Text>;
  }

  // Pobranie danych dotyczących gatunków filmów za pomocą hooka useGetGenresQuery 
  // oraz przetworzenie ich w celu stworzenia mapowania identyfikatorów gatunków na ich nazwy.
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
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
          style={styles.backIcon}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={{ uri: image }} style={styles.image} />
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0)"]}
          style={styles.gradient}
        />
        <Text style={styles.text_head}>{title}</Text>
        <Text style={styles.text_content}>{overview}</Text>
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              alignSelf: "center",
              fontFamily: "Handjet-Regular",
              fontSize: 20,
            }}
          >
            Producted in:
          </Text>
          {movieDetailsData?.production_countries.map((country, index) => (
            <Text
              style={{
                alignSelf: "center",
                fontFamily: "Handjet-Bold",
                fontSize: 20,
              }}
              key={index}
            >
              <Ionicons name="earth" size={16} color="black" /> {country.name}
            </Text>
          ))}
        </View>
        {movieGenreNames.map((genreName, index) => (
          <View style={styles.button_container} key={index}>
            <Button mode="contained" buttonColor="#8527f5d6">
              <Text style={styles.text_content}>{genreName}</Text>
            </Button>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 10,
  },
  image: {
    width,
    height: height * 0.75,
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: 0,
  },
  gradient: {
    position: "absolute",
    width,
    height,
  },
  text_head: {
    fontSize: 30,
    fontWeight: "500",
    marginVertical: 10,
    alignSelf: "center",
    fontFamily: "Handjet-Bold",
    color: "#212121",
  },
  text_content: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "Handjet-Regular",
  },
  button_container: {
    margin: 10,
    width: 170,
    alignSelf: "center",
  },
  backButtonContainer: {
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 1,
  },
  backIcon: {
    marginRight: 8,
  },
});

export default DetailsScreen;
