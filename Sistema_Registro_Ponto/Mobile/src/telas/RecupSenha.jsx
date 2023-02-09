import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

export default function RecupSenha () {

    return(
        <SafeAreaView style={styles.container}>
            <WebView 
                source={{uri: 'http://192.168.200.103:3000/rsenha'}}
                style={styles.web}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    web: {
        marginTop:20,
    },
})