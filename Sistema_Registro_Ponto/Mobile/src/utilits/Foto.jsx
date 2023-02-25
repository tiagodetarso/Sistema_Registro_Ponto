import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { Camera } from 'expo-camera'
import * as ImageManipulator from 'expo-image-manipulator'
import * as FileSystem from 'expo-file-system'

export default function Foto ({FotoToBponto}) {

    const [foto, setFoto] = useState()
    const [cameraPermission, setCameraPermission] = useState()

    const cameraRef = useRef()

    const obterPermissaoAsync = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    };

    useEffect(() => {
      obterPermissaoAsync()
    }, []);

    const tiraFoto = async (camera) => {
      
      if (camera && cameraPermission) {
        let fotografia = await camera.takePictureAsync({quality: 0.2, width:225, height:300, exif: false, base64: true})
        
        const resizedPhoto = await ImageManipulator.manipulateAsync(
          fotografia.uri,
          [{ resize: { width: 262 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        )

          const fileInfo = await FileSystem.getInfoAsync(resizedPhoto.uri)
          console.log(fileInfo.size)
          console.log(resizedPhoto.uri)

          fetch(resizedPhoto.uri)
            .then(response => response.blob())
            .then(blob => {
              const reader = new FileReader()
              reader.onload = () => {
                const base64String = reader.result.split(',')[1]
                FotoToBponto(base64String)
            };
            reader.readAsDataURL(blob);
            })
            .catch(error => console.log(error));
          
          setFoto(fotografia.uri)
      }
    }

    if (cameraPermission === null) {
      return <View />;
    }
    if (cameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={styles.container}>
      {foto ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: foto }} style={styles.image} />
        </View>
      ) : (
        <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={cameraRef}>
          <TouchableOpacity style={styles.button} onPress={() => tiraFoto(cameraRef.current)}>
            <Text style={styles.buttonText}>Tira Foto</Text>
          </TouchableOpacity>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    height: 250,
    width: 250,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: 'dodgerblue',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250
  },
  buttonText: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
})

