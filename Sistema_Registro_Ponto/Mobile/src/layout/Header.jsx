import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function Header() {

    return (
        <View style={styles.titulo}>
          <Image
              style={styles.image}
              source={require("../img/rp_logo.png")}
            />
            <Text style={styles.txtTitulo}>Registro Ponto</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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