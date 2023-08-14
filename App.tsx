import { PaperProvider } from "react-native-paper";
import Navigation from "./Navigation";
import { Provider } from "react-redux";
import { store } from "./store";
import { useFonts } from "expo-font";

export default function App() {

  const [fontsLoaded] = useFonts({
    "Handjet-Bold": require("./assets/fonts/Handjet-Bold.ttf"),
    "Handjet-Regular": require("./assets/fonts/Handjet-Regular.ttf"),
  });

  return (
    <Provider store={store}>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </Provider>
  );
}
