import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.titleText}>urMovie.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  titleText: {
    fontSize: 40,
    alignSelf: "center",
    fontFamily: "Handjet-Bold",
    color: "#8527f5d6",
  },
  darkModeToggle: {
    padding: 5,
  },
});

export default Header;
