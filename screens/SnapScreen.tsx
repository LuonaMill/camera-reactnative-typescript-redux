import React, { useEffect, useState, useRef } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { addPicture } from "../reducers/user";
import { useDispatch } from "react-redux";

export default function SnapScreen() {
  const { styles } = useStyle();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  // const [pictureToStore, setPictureToStore] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  let cameraRef: any = useRef(null);

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.5 });
    // photo.uri && setPictureToStore(photo.uri);
    dispatch(addPicture(photo.uri));
  };

  if (!hasPermission || !isFocused) {
    return <View></View>;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Camera
        ref={(ref) => (cameraRef = ref)}
        type={type}
        flashMode={flashMode}
        style={styles.camera}
      >
        <View style={styles.flipAndFlash}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              );
            }}
          >
            <FontAwesome name="rotate-right" color="black" size={36} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setFlashMode(flashMode === "off" ? FlashMode.on : FlashMode.off);
            }}
          >
            <FontAwesome
              name="flash"
              color={flashMode === "off" ? "black" : "gold"}
              size={36}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              cameraRef && takePicture();
            }}
          >
            <FontAwesome name="circle-thin" color="black" size={100} />
          </TouchableOpacity>
        </View>
      </Camera>
    </SafeAreaView>
  );
}

const useStyle = () => {
  const styles = StyleSheet.create({
    safeAreaView: {
      marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      justifyContent: "center",
      flex: 1,
    },
    camera: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
    },
    flipAndFlash: {
      width: "100%",
      padding: 15,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
  return { styles };
};
