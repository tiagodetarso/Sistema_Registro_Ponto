import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Gestor.module.css'

import LinkButton from '../layout/LinkButton'
import Container from '../layout/Container'
import CadForm from '../forms/CadForm'

function CadastrarFunc ({ employee, CadastrarFuncToApp }) {

    const navigate = useNavigate()

    function Cadastrar (newEmployee) {
        const apiUrl = process.env.REACT_APP_API_URL
        fetch (`http://${apiUrl}/employee/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newEmployee),
        })
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)
            const receivedData = data ? data : {msg:""}
            if (receivedData.msg === "Funcionário cadastrado com sucesso") {
                navigate("/gestor")
            }
            CadastrarFuncToApp(receivedData.msg)
        })
        .catch((err) => console.log(err))
    }

    if (employee.id && employee.isManager) {
        return (
            <Container customClass='column'>
                <h1 className={styles.text}>Cadastrar Funcionário</h1>
                <CadForm handleSubmit={Cadastrar} btnText="Cadastrar"/>
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

export default CadastrarFunc