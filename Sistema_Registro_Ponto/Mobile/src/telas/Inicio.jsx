import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableHighlight } from 'react-native';

import Header from '../layout/Header'

export default function Inicio({navigation, route}) {

    const funcionario = route.params.paramKey

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.id}>
                <Text style={styles.txtIdTitulo}>Funcionário: </Text>
                <Text style={styles.txtId}>{route.params.paramKey.name}</Text>
            </View>
            <View style={styles.id}>
                <Text style={styles.txtIdTitulo}>Matrícula: </Text>
                <Text style={styles.txtId}>{route.params.paramKey.registration}</Text>
            </View>
            <View style={styles.corpo}>
                <TouchableHighlight
                    style={styles.botao}
                    onPress={()=>navigation.navigate("Bater Ponto", {paramKey:funcionario})}
                >
                    <Text style={styles.txtBotao}>Bater Ponto</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.botao}
                    onPress={()=>navigation.navigate("Ultimos Registros", {paramKey:funcionario.registration})}
                >
                    <Text style={styles.txtBotao}>Ultimos Registros</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.botao}
                    onPress={()=>navigation.navigate("Mensagem ao RH", {paramKey: funcionario})}
                >
                    <Text style={styles.txtBotao}>Mensagem ao RH</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.botao}
                    onPress={()=>navigation.navigate("Redefinir Senha", {paramKey: funcionario.registration})}
                >
                    <Text style={styles.txtBotao}>Redefinir Senha</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.botao}
                    onPress={()=>navigation.navigate('Login')}
                >
                    <Text style={styles.txtBotao}>Sair</Text>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#87CEFA',
      alignItems: 'center',
      padding: 20,
    },
    id: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'flex-start'
    },
    txtIdTitulo: {
        color: 'black',
        fontWeight: 'bold',
    },
    txtId: {
        color: '#339933',
        fontWeight: 'bold',
    },
    corpo: {
        flex: 1,
        paddingTop:75,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    botao: {
        marginTop:10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding:10,
        width:300
    },
    txtBotao: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3333ff',
        textAlign: 'center',
    },
})