import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Logika przełączania trybu jasnego/ciemnego
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.titleText}>Your Netflix Clone</Text>
      <TouchableOpacity style={styles.darkModeToggle} onPress={toggleDarkMode}>
        <Ionicons
          name={darkMode ? "md-sunny" : "md-moon"}
          size={24}
          color={darkMode ? "white" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  darkModeToggle: {
    padding: 5,
  },
});

export default Header;
