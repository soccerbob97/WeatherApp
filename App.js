import React from "react";
import {View, SafeAreaView, FlatList,Text, StyleSheet,TouchableOpacity} from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Home from "./screens/Home";
import {listSavedLocations } from "./src/graphql/queries";
import Amplify, {Auth} from 'aws-amplify';
import config from './src/aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';
import { COLORS, SIZES, SHADOWS, FONTS, assets } from "./constants/theme";
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf")
  });
  if(!loaded) return null;
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{headerShown: false,}} initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default withAuthenticator(App);