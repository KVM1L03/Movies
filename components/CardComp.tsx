import { StyleSheet, View} from "react-native";
import React from "react";
import { Card, Button, Text } from "react-native-paper";

type Props = {
  title: string;
  image: string;
  popularity: number;
  voteCount: number;
  navigation: any;
  overview: string;
  production_countries: { iso_3166_1: string; name: string }[];
  genre_ids: number[];
  genreNames: string[];
  id: number;
};

const CardComp = (props: Props) => {
  return (
    <Card style={styles.card}>
      <Card.Cover
        source={{ uri: props.image }}
        resizeMode="cover"
        style={styles.coverImage}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title} variant="titleMedium" numberOfLines={2}>
          {props.title}
        </Text>
      </View>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.popularity}>Popularity: {props.popularity}</Text>
        <Text style={styles.voteCount}>Votes: {props.voteCount}</Text>
      </Card.Content>
      <Card.Actions style={styles.center}>
        <Button
          labelStyle={{ fontFamily: "Handjet-Regular", fontSize: 20 }}
          buttonColor="#8527f5d6"
          mode="contained"
          onPress={() =>
              /*Przekazanie danych do DetailsScreen po kliknięciu*/
              props.navigation.navigate("Details", {
              movieData: {
                title: props.title,
                image: props.image,
                popularity: props.popularity,
                voteCount: props.voteCount,
                overview: props.overview,
                genre_ids: props.genre_ids,
                genreNames: props.genreNames,
                production_countries: props.production_countries,
                id: props.id,
                
              },
            })
          }
        >
          See more
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor:'black'
  },
  titleContainer: {
    height: 80,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  title: {
    textAlign: "center",
    fontFamily: "Handjet-Bold",
    fontSize: 20,
    color: "white",
  },
  cardContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    
  },
  coverImage: {
    width: "80%",
    alignSelf: "center",
    marginTop: 15,
  },
  center: {
    alignSelf: "center",
  },
  popularity: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 2,
    fontFamily: "Handjet-Regular",
    color: "white",
  },
  voteCount: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 2,
    fontFamily: "Handjet-Regular",
    color: "white",
  },
});

export default CardComp;