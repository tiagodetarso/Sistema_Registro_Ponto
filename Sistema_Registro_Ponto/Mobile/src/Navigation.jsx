import React from 'react'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from './telas/Login'
import Inicio from './telas/Inicio'
import BaterPonto from './telas/BaterPonto'
import UltimosRegistros from './telas/UltimosRegistros'
import MensagemRH from './telas/MensagemRH'
import RecupSenha from './telas/RecupSenha'

const Stack = createStackNavigator()

export default function Navigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator
                InitialRouteName='Login'
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Inicio" component={Inicio} />
                <Stack.Screen name="Bater Ponto" component={BaterPonto} />
                <Stack.Screen name="Ultimos Registros" component={UltimosRegistros} />
                <Stack.Screen name="Mensagem ao RH" component={MensagemRH} />
                <Stack.Screen name="Recuperar Senha" component={RecupSenha} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}