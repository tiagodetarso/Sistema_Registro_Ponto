import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableHighlight, Alert } from 'react-native'; 

import { EnviarEmail } from '../acoes/EnviarEmail';
import Header from '../layout/Header'

export default function MensagemRH ({ navigation, route }) {

    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")

    const funcionario = route.params.paramKey
    const RHmail1 = process.env.RH_EMAIL1

    function handleEmail () {
        EnviarEmail(
            'ttrgoncalves@gmail.com',
            `Sistema Registro Ponto - ${subject}`,
            `
            Funcionário: ${funcionario.name};
            Matrícula: ${funcionario.registration};

            Conteúdo: 
            ${body}
            
            Atenciosamente,
            Equipe Sistema Registro Ponto`, 
            {cc: funcionario.email}
        ).then(() => {
            setSubject('')
            setBody('')
        })
    }

    return(
        <SafeAreaView style={styles.container}>
            <Header />
            <Text>ENVIAR E-MAIL PARA O SETOR DE RH</Text>
            <View style = {styles.subject}>
              <Text style = {styles.txtCampos}>Assunto:</Text>
              <TextInput
                style={styles.txtbx}
                textContentType='text'
                keyboardAppearance='dark'
                multiline={true}
                onChangeText={setSubject}
                value={subject}
                placeholder="Insira o assundo do e-mail!"
                textAlign='left'
                textAlignVertical='top'
              />
          </View>
          <View style = {styles.subject}>
              <Text style = {styles.txtCampos}>Corpo do e-mail:</Text>
              <TextInput
                style={styles.txtbx2}
                textContentType='text'
                keyboardAppearance='dark'
                multiline={true}
                onChangeText={setBody}
                value={body}
                placeholder="Escreva aqui seu e-mail!"
                textAlign='left'
                textAlignVertical='top'
              />
          </View>
          <View style={styles.entrar}>
            <TouchableHighlight
              style={styles.botaoEntra}
              onPress={()=>handleEmail()}
            >
                <Text style = {styles.txtEntra}>Enviar</Text>
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
        width: '100%',
        padding: 20,
    },
    txtCampos: {
        fontSize:20,
        fontWeith: 'bold',
        padding:5
    },
    txtbx: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding:10,
        width: 325,
        height: 75,
    },
    txtbx2: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding:10,
        width: 325,
        height: 300,
    },
    botaoEntra: {
        backgroundColor: "dodgerblue",
        borderRadius: 10,
        padding: 10,
        width: 250,
        alignItems: 'center',
    },
    txtEntra: {
        backgroundColor: "dodgerblue",
        fontSize: 20,
        fontWeigth: 'bold'
    },
    subject: {
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
    },
    entrar: {
        padding:10,
        alignSelf:'center'
    },
})