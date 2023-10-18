import React from "react";

import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateEmail, UserState } from "../reducers/user";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

type HomeScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { styles } = useStyle();
  const dispatch = useDispatch();
  const user = useSelector((state: { user: UserState }) => state.user.value);
  // console.log(user.email);

  const [email, setEmail] = useState(user.email || "");
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (emailPattern.test(email)) {
      dispatch(updateEmail(email));
      navigation.navigate("TabNavigator", { screen: "Gallery" });
    } else {
      setEmailError(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground
        source={require("../assets/background.jpg")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.imageView}>
            <Image
              source={require("../assets/camera.png")}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <Text style={styles.title}>FaceUp</Text>
          <View style={styles.actionBlock}>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              onChangeText={(value) => setEmail(value)}
              value={email}
            />
            {emailError && (
              <Text style={styles.alertText}>Invalid email address</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text>Go to Gallery</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const useStyle = () => {
  const dimensions = useWindowDimensions();
  const styles = StyleSheet.create({
    safeAreaView: {
      marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      flex: 1,
    },
    backgroundImage: {
      flex: 1,
      justifyContent: "center",
    },
    container: {
      backgroundColor: "rgba(255, 190, 11, 0.4)",
      flex: 1,
      alignItems: "center",
      paddingTop: "20%",
    },
    imageView: {
      width: "100%",
      height: "50%",
      alignItems: "center",
      marginBottom: "10%",
    },
    image: {
      width: "110%",
      height: "100%",
    },
    title: {
      fontSize: 40,
      fontWeight: "600",
      marginBottom: "5%",
    },
    actionBlock: {
      width: "80%",
      backgroundColor: "white",
      padding: 20,
    },
    input: {
      height: 40,
      margin: 12,
      borderBottomWidth: 1,
    },
    alertText: {
      color: "rgb(200, 0, 0)",
      paddingLeft: 10,
    },
    button: {
      height: 40,
      margin: 12,
      backgroundColor: "#fbe29c",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return { styles };
};
