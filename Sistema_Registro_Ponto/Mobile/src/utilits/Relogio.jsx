import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native'

export default function Relogio ({RelogioToBponto}) {

    const [currentDate, setCurrentDate] = useState("")
  
    useEffect(() => {
        setTimeout(() => {
            let fullDate = new Date()
            let day = fullDate.getDate()
            day = ('0'+day).slice(-2)
            let month = fullDate.getMonth() + 1; //Current Month
            month = ('0'+month).slice(-2)
            let year = fullDate.getFullYear(); //Current Year
            let hours = fullDate.getHours(); //Current Hours
            hours = ('0'+hours).slice(-2)
            let min = fullDate.getMinutes(); //Current Minutes
            min = ('0'+min).slice(-2)
            let sec = fullDate.getSeconds(2); //Current Seconds
            sec = ('0'+sec).slice(-2)

            let dataHorario = fullDate.valueOf()

            setCurrentDate(()=> day + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec)

            RelogioToBponto(dataHorario)

        }, 1000)
    })

    return (
        <View style={styles.view}>
            <Text style={styles.titulo}> DIA E HORA: </Text>
            <Text style={styles.data}>{currentDate}</Text>
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
        data: {
            color: '#4682b4',
            fontWeight: 'bold',
        }
    })