import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  Platform
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import uploadFilesAsync from 'anonymous-files';
import diamondImg from "./assets/diamond.png"; // imagen local.

const App = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera is required");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    if(Platform.OS === "web"){
      const remoteUri = await uploadFilesAsync(pickerResult.uri);
      setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    } else {
      setSelectedImage({ localUri: pickerResult.uri });
    }
  };

  const openShareDialog = async () => {
    let isMobileDevice = await Sharing.isAvailableAsync();
    console.log(isMobileDevice);
    if (!isMobileDevice) {
      alert(`The image is available for share at ${selectedImage.remoteUri}`);
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick an Image.</Text>
      <TouchableOpacity onPress={openImagePickerAsync}>
        <Image
          source={{
            uri:
              selectedImage !== null
                ? selectedImage.localUri
                : "https://picsum.photos/200/200",
          }}
          // source={diamondImg} // imagen local
          style={styles.imageSize}
        />
      </TouchableOpacity>
      {/* <Button
        title='Press me'
        color= '#000'
        onPress={() => Alert.alert('Hello!!!')}
      /> */}
      {selectedImage ? (
        <TouchableOpacity
          style={styles.button}
          // onPress={() => Alert.alert('Hello!!!')}
          // onPress={openImagePickerAsync}
          onPress={openShareDialog}
        >
          <Text style={styles.buttonText}>Share this image</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#292929",
  },
  title: {
    fontSize: 30,
    color: "#fff",
  },
  imageSize: {
    height: 200,
    width: 200,
    borderRadius: 100, // para imagen en circulo no va el 50%, va la mitad del la altura y el ancho
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "blue",
    padding: 7,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default App;
