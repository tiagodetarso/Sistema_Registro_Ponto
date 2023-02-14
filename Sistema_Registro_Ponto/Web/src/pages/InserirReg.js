import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Gestor.module.css'

import LinkButton from '../layout/LinkButton'
import Container from '../layout/Container'
import InserirForm from '../forms/InserirForm'

function InserirReg ({ employee, InserirRegToApp }) {

    const navigate = useNavigate()

    function Inserir (dados) {

        const apiUrl = process.env.REACT_APP_API_URL
        const tempo = new Date(`${dados.date}T${dados.time}`)
        const time = tempo.getTime()

        const enviaDados = {
            registration: dados.registration,
            geoLocal: {
                latitude: dados.latitude,
                longitude: dados.longitude
            },
            numberTime: time
        }
        
        fetch (`http://${apiUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(enviaDados),
        })
        .then(resp => resp.json())
        .then((data) => {
            const receivedData = data ? data : {msg:""}
            if (receivedData.msg === "Ponto registrado com sucesso") {
                navigate("/gestor")
            }
            InserirRegToApp(receivedData.msg)
        })
        .catch((err) => console.log(err))
    }

    if (employee.id && employee.isManager) {
        return (
            <Container customClass='column'>
                <h1 className={styles.text}>Inserir Registro</h1>
                <InserirForm btnText='Inserir Registro' handleSubmit={Inserir} />
                <LinkButton to='/gestor' text="Voltar ao Menu" />
            </Container>
        )  
    } else {
        return (
            <Container customClass='column'>
                <h1 className={styles.text}>Você não esta conectado ou não tem acesso a esta área</h1>
                <LinkButton to='/' text="Se não estiver conectado, clique aqui e vá para a tela de Login" />
            </Container>
        )
    }
}

export default InserirReg