import { StyleSheet, View } from "react-native";
import React from "react";
import { Card, Button, Text } from "react-native-paper";

type Props = {
  title: string;
  image: string;
  popularity: number;
  voteCount: number;
  navigation: any;
  overview: string;
  country: string;
  genre_ids: number[];
  genreNames: string[];
};

const CardComp = (props: Props) => {
  return (
    <Card style={styles.card}>
      <View>
        <Card.Cover
          source={{ uri: props.image }}
          resizeMode="cover"
          style={styles.coverImage}
        />
      </View>
      <View>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.title} variant="titleMedium">
            {props.title}
          </Text>
          <Text style={styles.popularity}>Popularity: {props.popularity}</Text>
          <Text style={styles.voteCount}>Votes: {props.voteCount}</Text>
        </Card.Content>
        <Card.Actions style={styles.center}>
          <Button
            onPress={() =>
              props.navigation.navigate("Details", {
                movieData: {
                  title: props.title,
                  image: props.image,
                  popularity: props.popularity,
                  voteCount: props.voteCount,
                  overview: props.overview,
                  country: props.country,
                  genre_ids: props.genre_ids, 
                  genreNames: props.genreNames, 
                },
              })
            }
          >
            See more
          </Button>
        </Card.Actions>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  cardContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  coverImage: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 5,
  },
  description: {
    marginBottom: 5,
  },
  center: {
    alignSelf: "center",
  },
  popularity: {
    textAlign: "center",
    marginVertical: 2,
  },
  voteCount: {
    textAlign: "center",
    marginVertical: 2,
  },
});

export default CardComp;
