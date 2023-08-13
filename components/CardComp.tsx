import { StyleSheet } from "react-native";
import React from "react";
import { Card, Button, Text } from "react-native-paper";

type Props = {
  title: string;
  description: string;
};

const CardComp = (props: Props) => {
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      <Card.Content style={styles.cardContent}>
        <Text style={styles.title} variant="titleLarge">
          {props.title}
        </Text>
        <Text style={styles.description} variant="bodyMedium">
          {props.description}
        </Text>
      </Card.Content>
      <Card.Actions style={styles.center}>
        <Button>See more</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  cardContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
});

export default CardComp;
