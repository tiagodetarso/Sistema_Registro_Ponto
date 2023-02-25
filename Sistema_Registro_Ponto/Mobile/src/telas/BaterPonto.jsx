import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, SafeAreaView } from 'react-native'
//import RNFetchBlob from 'rn-fetch-blob'
import { Buffer } from 'buffer'

import Header from '../layout/Header'
import Relogio from '../utilits/Relogio'
import Localizacao from '../utilits/Localizacao'
import Foto from '../utilits/Foto'

export default function Bponto({navigation, route}) {

  const [relogio, setRelogio] = useState("")
  const [local, setLocal] = useState({coords: {latitude:"", longitude:""}})
  const [adress, setAdress] = useState("")
  const [foto, setFoto] = useState("file://")

  function RelogioToBponto (diaHora) {
    setRelogio(diaHora)
  }

  function LocalizacaoToBponto (currentPosition) {
    setLocal(currentPosition)
  }

  function AdressToBponto (adress) {
    setAdress(adress)
  }

  function FotoToBponto (fotoCapturada) {
    setFoto(fotoCapturada)
  }

  function Registrar () {
   
    const fotoBuffer = Buffer.from(foto, 'base64')

   let registro = 
      {
        registration: route.params.paramKey.registration,
        geoLocal : 
          {
            latitude:local.coords.latitude,
            longitude:local.coords.longitude,
            stringLocal: adress
          },
        numberTime: relogio,
        image: fotoBuffer
      }

    fetch ('http://192.168.200.103:4000/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(registro)
        })
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)
            if (data.msg === "Ponto registrado com sucesso") {
                navigation.navigate("Inicio", {paramKey:route.params.paramKey})
            }
            Alert.alert(data.msg)
        })
        .catch((err) => console.log(err))
  }

  return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.vInfo}>
          <Text style={styles.txtInfo}> Nome: {route.params.paramKey.name}</Text>
          <Text style={styles.txtInfo}> Matrícula: {route.params.paramKey.registration}</Text>
        </View>
        <Relogio RelogioToBponto={RelogioToBponto}/>
        <Localizacao LocalizacaoToBponto={LocalizacaoToBponto} AdressToBponto={AdressToBponto}/>
        <View style={styles.vBotao}>
          <TouchableHighlight
            style={styles.botaoRegistra}
            onPress={() => Registrar()}
          >
            <Text style={styles.txtbotao}>Bater Ponto</Text>
          </TouchableHighlight>
        </View>
            <Foto FotoToBponto={FotoToBponto}/>
      </SafeAreaView>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#87CEFA',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 20,
      paddingBotton: 20
    },
    vInfo:{
      padding: 10,
      backgroundColor: 'azure',
      borderRadius: 10,
      marginTop: 10,
      width: 325,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    txtInfo: {
      color: '#4682b4',
      fontWeight: 'bold',
    },
    vRelogio: {
      padding: 10,
    },
    relogio: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    botaoRegistra: {
      backgroundColor: "dodgerblue",
      borderRadius: 10,
      padding: 10,
      width: 325,
      alignItems: 'center',
    },
    vBotao: {
      padding: 10,
    },
    txtbotao: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    vLocal: {
      marginTop:30,
      padding: 10,
    },
    txtBtnLocal: {
      color: 'blue',
      fontWeight: 'bold'
    },
    vList: {
      marginTop: 50,
      height: 350,
    },
    item: {
      padding: 10,
      fontSize: 12,
      color: 'white'
    },
    Flist: {
      backgroundColor: 'black',
      borderRadius: 10
    },
    titulo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    txtTitulo: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    image: {
      resizeMode: 'contain',
  }
  })