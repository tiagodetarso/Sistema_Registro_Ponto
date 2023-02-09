import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableHighlight, Alert } from 'react-native';

import Header from '../layout/Header'

export default function Login({navigation}) {

    const [matricula, setMatricula] = useState("")
    const [senha, setSenha] = useState("")
    const [funcionario, setFuncionario] = useState({})
    
    function Logar () {
      fetch ('http://192.168.200.103:4000/employee/login', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({registration: matricula, password: senha}),
        })
        .then(resp => resp.json())
        .then((data) => {
            var receivedData = data ? data : {msg:"", content:""}
            setFuncionario(receivedData.content)
            if (receivedData.msg === "Login realizado com sucesso") {
              navigation.navigate("Inicio", {paramKey: receivedData.content})
            }
          Alert.alert(receivedData.msg)
          setMatricula('')
          setSenha('')
        })
        .catch((err) => console.log(err))
    }

    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <Text>Faça seu login!</Text>
        <View style={styles.corpo}>
          <View style ={styles.matricula}>
              <Text style = {styles.txtCampos}>Matrícula:</Text>
              <TextInput
                style={styles.txtbx}
                keyboardType='numeric'
                keyboardAppearance='dark'
                onChangeText={setMatricula}
                value={matricula}
              />
          </View>
          <View style = {styles.senha}>
              <Text style = {styles.txtCampos}>Senha:</Text>
              <TextInput
                style={styles.txtbx}
                textContentType='password'
                keyboardAppearance='dark'
                secureTextEntry={true}
                onChangeText={setSenha}
                value={senha}
              />
          </View>
          <View style={styles.reSenha}>
            <TouchableHighlight
              style={styles.botaoRecup}
              onPress={()=>navigation.navigate("Recuperar Senha")}
            >
                <Text style = {styles.txtRecup}>Esqueceu a senha?</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.entrar}>
            <TouchableHighlight
              style={styles.botaoEntra}
              onPress={()=>Logar()}
            >
                <Text style = {styles.txtEntra}>Entrar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
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
    reSenha: {
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
    botaoRecup: {
      marginLeft: 100
    },
  });