import React, {useState} from "react";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationProp } from "@react-navigation/native";
import { useGetPopularMoviesQuery, useSearchMoviesQuery } from "../api";
import { ActivityIndicator, Button, Divider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import CardComp from "../components/CardComp";

const { width, height } = Dimensions.get("window");

const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

type MovieData = {
  title: string;
  image: string;
  popularity: number;
  voteCount: number;
  overview: string;
  genre_ids: number[];
  genreNames: string[];
  production_countries: { iso_3166_1: string; name: string }[];
  id: number;
};

type HomeScreenProps = {
  navigation: NavigationProp<any>;
  
};

const HomeScreen: React.FC<HomeScreenProps> = ({
  navigation,

}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const { data, error, isLoading } = useGetPopularMoviesQuery();
  const { data: searchData } = useSearchMoviesQuery(searchQuery);
  const onChangeSearch = (query: string) => setSearchQuery(query);

  const handleSearchBarToggle = (isVisible: boolean) => {
    setSearchBarVisible(isVisible);
  };
  
  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error :( </Text>;
  }

  const Backdrop = () => {
    return (
      <View style={{ height: BACKDROP_HEIGHT, width, position: "absolute" }}>
        <FlatList
          data={data.results}
          keyExtractor={(item) => item.id + "-backdrop"}
          removeClippedSubviews={false}
          bounces={false}
          contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
          renderItem={({ item, index }) => {
            if (!item.poster_path) {
              return null;
            }
            const translateX = scrollX.interpolate({
              inputRange: [(index - 1) * ITEM_SIZE, index * ITEM_SIZE],
              outputRange: [0, width],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                removeClippedSubviews={false}
                style={{
                  position: "absolute",
                  width: translateX,
                  height,
                  overflow: "hidden",
                }}
              >
                <Animated.Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  blurRadius={2}
                  style={{
                    width,
                    height: BACKDROP_HEIGHT,
                    resizeMode: "cover",
                  }}
                />
              </Animated.View>
            );
          }}
        />
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.3)", "#121212"]}
          style={{
            height: BACKDROP_HEIGHT,
            width,
            position: "absolute",
            bottom: 0,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header onSearchBarToggle={handleSearchBarToggle} onSearchQueryChange={handleSearchQueryChange}/>
      {searchBarVisible ? (
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={searchData?.results ?? []}
            keyExtractor={(item) => item.id.toString()}
            style={{marginTop:100}}
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
      ) : (
        <>
          <Backdrop />
          <StatusBar hidden />
          <Animated.FlatList
            showsHorizontalScrollIndicator={false}
            data={data.results}
            keyExtractor={(item) => item.id}
            horizontal
            bounces={false}
            decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
            renderToHardwareTextureAndroid
            contentContainerStyle={{
              alignItems: "center",
              paddingLeft: EMPTY_ITEM_SIZE,
              paddingRight: EMPTY_ITEM_SIZE,
            }}
            snapToInterval={ITEM_SIZE}
            snapToAlignment="start"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              if (!item.poster_path) {
                return <View style={{ width: EMPTY_ITEM_SIZE }} />;
              }

              const inputRange = [
                (index - 1) * ITEM_SIZE,
                index * ITEM_SIZE,
                (index + 1) * ITEM_SIZE,
              ];

              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [40, 10, 40],
                extrapolate: "clamp",
              });

              return (
                <View style={{ width: ITEM_SIZE }}>
                  <Animated.View
                    style={{
                      marginHorizontal: SPACING,
                      padding: SPACING * 2,
                      alignItems: "center",
                      transform: [{ translateY }],
                      backgroundColor: "white",
                      borderRadius: 34,
                    }}
                  >
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                      }}
                      style={styles.posterImage}
                    />
                    <Text
                      style={{ fontSize: 30, fontFamily: "Handjet-Bold" }}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Handjet-Regular",
                        marginVertical: 10,
                      }}
                      numberOfLines={3}
                    >
                      {item.overview}
                    </Text>
                    <Button
                      labelStyle={{
                        fontFamily: "Handjet-Regular",
                        fontSize: 20,
                      }}
                      buttonColor="#8527f5d6"
                      mode="contained"
                      onPress={() =>
                        navigation.navigate("Details", {
                          movieData: {
                            title: item.title,
                            image: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                            popularity: item.popularity,
                            voteCount: item.vote_count,
                            overview: item.overview,
                            genre_ids: item.genre_ids,
                            genreNames: [], // You may want to change this if needed
                            production_countries: [], // You may want to change this if needed
                            id: item.id,
                          },
                        })
                      }
                    >
                      See more
                    </Button>
                  </Animated.View>
                  
                </View>
              );
              
            }}
          />
          
          
        </>
        
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});

export default HomeScreen;
