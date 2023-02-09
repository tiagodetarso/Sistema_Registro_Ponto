import React from 'react'
import { useNavigate } from 'react-router-dom'

import Container from '../layout/Container'
import Button from '../formitens/Button'
import LinkButton from '../layout/LinkButton'
import styles from './Bponto.module.css'

function AteLogo({ employee, AteLogoToApp }) {

    const navigate = useNavigate()

    function Deslogar () {
        AteLogoToApp({})
        navigate('/')
    }

    if (employee.id) {
        return (
            <Container customClass='column'>
                <h1 className={styles.text}>Tem certeza que deseja sair (deslogar) do sistema?</h1>
                <Button handleOnClick={Deslogar} text="Clique aqui para sair" />
            </Container>
        )
    } else {
        return (
            <Container customClass='column'>
                <h1 className={styles.text}>Não há nenhum funcionário conectado ao sistema!</h1>
                <LinkButton to='/' text="Ir para a tela de login" />
            </Container>
        )     
    }
}

export default AteLogo