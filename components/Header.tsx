// Header.tsx

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";

type HeaderProps = {
  onSearchBarToggle: (isVisible: boolean) => void;
  onSearchQueryChange: (query: string) => void; 
};

const Header: React.FC<HeaderProps> = ({ onSearchBarToggle, onSearchQueryChange }) => {
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearchBar = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchBarVisible(!isSearchBarVisible);
    onSearchBarToggle(!isSearchBarVisible);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    onSearchQueryChange(query);
  };

  const closeSearchBar = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchBarVisible(false);
    onSearchBarToggle(false);
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      {isSearchBarVisible ? (
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            autoFocus
            rippleColor="#8527f5d6"
            style={styles.searchBar}
            iconColor="#8527f5d6"
            cursorColor="#8527f5d6"
            inputStyle={{ color: "#8527f5d6", fontFamily: "Handjet-Regular", fontSize: 20 }}
            placeholderTextColor="white"
          />
          <TouchableOpacity onPress={closeSearchBar}>
            <Entypo name="cross" size={30} color="#8527f5d6" style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>urMovie.com</Text>
          </View>
          <TouchableOpacity style={styles.iconView}>
            <Entypo name="magnifying-glass" size={30} color="#8527f5d6" onPress={toggleSearchBar} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 10,
    position: "absolute",
    marginVertical: 20,
  },
  headerContainer: {
    backgroundColor: "transparent",
    marginVertical: -10,
  },
  titleText: {
    fontSize: 40,
    fontFamily: "Handjet-Bold",
    color: "white",
    shadowRadius: 2,
    shadowColor: "black",
    marginLeft: 80,
  },
  iconView: {
    marginLeft: "auto",
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    backgroundColor: "black",
  },
  closeIcon: {
    marginLeft: "auto",
  },
});

export default Header;
