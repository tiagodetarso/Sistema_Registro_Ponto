import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableHighlight, Alert } from 'react-native';

import Header from '../layout/Header'

export default function RedefinirSenha({navigation, route}) {

  const registration = route.params.paramKey

  const [matricula, setMatricula] = useState(registration)
  const [senha, setSenha] = useState("")
  const [repetirSenha, setRepetirSenha] = useState("")

  function Redefinir () {

    fetch ('http://192.168.200.103:4000/employee/redefinirsenha', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(
              {
                registration: matricula,
                newPassword: senha,
                repeatPassword: repetirSenha
              }
            )
        })
        .then(resp => resp.json())
        .then((data) => {
          Alert.alert(data.msg)
          setSenha("")
          setRepetirSenha("")
        })
        .catch((err) => console.log(err))
}

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text>REDEFINIR SENHA</Text>
      <View style={styles.corpo}>
          <View style ={styles.matricula}>
              <Text style = {styles.txtCampos}>Matrícula:</Text>
              <TextInput
                style={styles.txtbx}
                keyboardType='numeric'
                keyboardAppearance='dark'
                value={matricula}
                readOnly={true}
              />
          </View>
          <View style = {styles.senha}>
              <Text style = {styles.txtCampos}>Nova Senha:</Text>
              <TextInput
                style={styles.txtbx}
                textContentType='password'
                keyboardAppearance='dark'
                secureTextEntry={true}
                onChangeText={setSenha}
                value={senha}
              />
          </View>
          <View style = {styles.senha}>
              <Text style = {styles.txtCampos}>Repetir Senha:</Text>
              <TextInput
                style={styles.txtbx}
                textContentType='password'
                keyboardAppearance='dark'
                secureTextEntry={true}
                onChangeText={setRepetirSenha}
                value={repetirSenha}
              />
          </View>
          <View style={styles.entrar}>
            <TouchableHighlight
              style={styles.botaoEntra}
              onPress={()=>Redefinir()}
            >
                <Text style = {styles.txtEntra}>Redefinir Senha</Text>
            </TouchableHighlight>
          </View>
        </View>  
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#87CEFA',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: 20,
    },
    corpo: {
      flex:1,
      paddingTop:75,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    txtCampos: {
      flex:1,
    },
    txtRecup: {
      fontSize: 15,
    },
    txtEntra: {
      backgroundColor: "dodgerblue",
      fontSize: 20,
      fontWeigth: 'bold'
    },
    txtbx: {
      flex:2,
      backgroundColor: 'white',
      borderRadius: 10,
      padding:10,
    },
    matricula: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    senha: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding:10,
    },
    entrar: {
      padding:10,
      alignSelf:'flex-end'
    },
    botaoEntra: {
      backgroundColor: "dodgerblue",
      borderRadius: 10,
      padding: 10,
      width: 250,
      alignItems: 'center',
    },
  });