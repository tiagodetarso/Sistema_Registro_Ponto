import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native'
import * as Location from 'expo-location';

export default function Localizacao ({LocalizacaoToBponto}) {

    const positionApiAcessKey = process.env.POSITION_API_ACCESS_KEY

    const [local, setLocal] = useState({coords: {latitude:"", longitude:"", altitude:""}})
    const [adress, setAdress] = useState("")

    const obterLocal = async ()=>{

        let {status} = await Location.requestForegroundPermissionsAsync()
        if (status != 'granted') {
            Alert.alert('Permission to acess location was denied')
            return;
            }
        
        setLocal(await Location.getCurrentPositionAsync({}))
        LocalizacaoToBponto(await Location.getCurrentPositionAsync({}))
        }

    useEffect (() => {
        obterLocal()
    }, [])

    useEffect(() => {
        fetch (`http://api.positionstack.com/v1/reverse?access_key=015a462a521ee9628c8d5f738adc7db5&query=${local.coords.latitude},${local.coords.longitude}`)
            .then(resp => resp.json())
            .then((data) => {
                setAdress(data.data[0].label)
            })
            .catch((err) => console.log(err))      
    },[local])

    return (
        <View>
        <View style={styles.view}>
            <Text style={styles.titulo}> Latitude: </Text>
            <Text style={styles.geo}>{local.coords.latitude}</Text>
        </View>
        <View style={styles.view}>
            <Text style={styles.titulo}> Longitude: </Text>
            <Text style={styles.geo}>{local.coords.longitude}</Text>
        </View>
        <View style={styles.view}>
            <Text style={styles.titulo}> Altitude: </Text>
            <Text style={styles.geo}>{local.coords.altitude}</Text>
        </View>
        <View style={styles.view}>
            <Text style={styles.titulo}> Logradouro: </Text>
            <Text style={styles.geo}>{adress}</Text>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'azure',
        borderRadius: 10,
        marginTop: 10,
        width: 325,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    titulo:{
        color: 'black',
        fontWeight: 'bold',
    },
    geo: {
        color: '#4682b4',
        fontWeight: 'bold',
        maxWidth: 200
    }
})