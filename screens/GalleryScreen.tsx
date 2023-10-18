import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Button,
} from "react-native";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { UserState } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GalleryScreen() {
  const { styles } = useStyle();
  const user = useSelector((state: { user: UserState }) => state.user.value);

  const photos = user.pictures.map((photo: string, i: number) => {
    return (
      <View style={styles.eachPhotoContainer} key={i}>
        <Image source={{ uri: photo }} style={styles.photo} />
        <FontAwesome
          name="trash-o"
          size={24}
          color="black"
          style={styles.trashIcon}
        />
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gallery</Text>
      <Text>Logged as : {user.email}</Text>
      <ScrollView contentContainerStyle={styles.photosContainer}>
        {photos}
      </ScrollView>
      {/* <Button
        title="Empty storage"
        onPress={() => {
          AsyncStorage.clear();
        }}
      /> */}
    </SafeAreaView>
  );
}

const useStyle = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    },
    title: {
      fontSize: 30,
      fontWeight: "600",
      marginTop: "5%",
      justifyContent: "center",
    },
    photosContainer: {
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20,
    },
    eachPhotoContainer: {
      alignItems: "flex-end",
    },
    photo: {
      margin: 10,
      width: 150,
      height: 150,
    },
    trashIcon: {
      marginRight: 10,
    },
  });
  return { styles };
};
