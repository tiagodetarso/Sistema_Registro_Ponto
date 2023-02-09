import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native'
import { DataTable } from 'react-native-paper';

import Header from '../layout/Header'

export default function UltimosRegistros({ route }) {

    const [registros, setRegistros] = useState({})
    const url = process.env.URL_API

    useEffect(() => {
        fetch ('http://192.168.200.103:4000/register/ultimos', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({registration: route.params.paramKey})
            })
            .then(resp => resp.json())
            .then((data) => {
                setRegistros(data)
            })
            .catch((err) => console.log(err))
    },[])

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <Text style={styles.titulo}>ÚLTIMOS REGISTROS</Text>
            <ScrollView style={styles.scroll}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{flex: 2}}>Dia e Hora</DataTable.Title>
                    <DataTable.Title>Latitude</DataTable.Title>
                    <DataTable.Title>Longitude</DataTable.Title>
                </DataTable.Header>
                
                {registros.length > 0 &&
                        registros.map((registro) => (
                <DataTable.Row key={registro.id}>
                    <DataTable.Cell style={{flex: 2}} key={`${registro.id}DiaHora`}>
                        {
                            ("0"+new Date(registro.numberTime).getDate()).slice(-2)+"/"+
                            ("0"+new Date(registro.numberTime).getMonth()+1).slice(-2)+"/"+
                            new Date(registro.numberTime).getFullYear()+" - "+
                            ("0"+new Date(registro.numberTime).getHours()).slice(-2)+":"+
                            ("0"+new Date(registro.numberTime).getMinutes()).slice(-2)+":"+
                            ("0"+new Date(registro.numberTime).getSeconds()).slice(-2)
                        }
                    </DataTable.Cell>
                    <DataTable.Cell key={`${registro.id}Lat`}>{registro.geoLocal.latitude}</DataTable.Cell>
                    <DataTable.Cell key={`${registro.id}Long`}>{registro.geoLocal.longitude}</DataTable.Cell>
                </DataTable.Row>
                        ))
                }
            </DataTable>
            </ScrollView>
        </SafeAreaView>
    )
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
    registros: {
        backgroundColor: 'dodgerBlue',
        borderRadius: 10,
        marginTop: 50,
    },
    item: {
        padding: 10,
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
    scroll: {
        width: '100%'
    }
});