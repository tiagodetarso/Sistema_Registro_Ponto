import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, Alert } from 'react-native'
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

    function SepararString (str) {
        const index = str.indexOf(",");
        const parte1 = str.substring(0, index);
        const parte2 = str.substring(index + 1);
        return (parte1+"\n"+parte2)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <Text>ÚLTIMOS REGISTROS</Text>
            <ScrollView style={styles.scroll}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Dia e Hora</DataTable.Title>
                    <DataTable.Title>Logradouro</DataTable.Title>
                </DataTable.Header>
                
                {registros.length > 0 &&
                        registros.map((registro) => (
                <DataTable.Row style={styles.row} key={registro.id}>
                    <DataTable.Cell style={styles.diaHora} key={`${registro.id}DiaHora`}>
                        {
                            ("0"+new Date(registro.numberTime).getDate()).slice(-2)+"/"+
                            ("0"+new Date(registro.numberTime).getMonth()+1).slice(-2)+"-"+
                            ("0"+new Date(registro.numberTime).getHours()).slice(-2)+":"+
                            ("0"+new Date(registro.numberTime).getMinutes()).slice(-2)
                        }
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.local} key={`${registro.id}Loc`}>
                        <Text numberOfLines={2} style={styles.text}>
                            {registro.geoLocal.stringLocal}
                        </Text>
                    </DataTable.Cell>
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
    scroll: {
        width: '100%',
    },
    row: {
        flex: 1,
        textAlign: 'auto',
    },
    diaHora: {
        flex: 1,
        textAlign: 'auto',
    },
    local: {
        flex: 3,
        textAlign: 'center',
        width: 200
    },
    hRow: {
        flex: 1,
        textAlignVertical: 'center'
    },
    hDiaHora: {
        flex: 1,
    },
    hLocal: {
        flex: 3,
    },
    text: {
        fontSize: 9
    }
})