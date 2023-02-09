import React from 'react'

import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import styles from './Gestor.module.css'
import NavBarGestor from '../layout/NavBarGestor'

function Gestor({ employee }) {
    if (employee.id && employee.isManager) {
        return (
            <NavBarGestor />     
        )  
    }  
    
    if (employee.id) {
        return (
            <Container customClass='column'>
                    <h1 className={styles.text}>Você não tem acesso a essa aba!</h1>
            </Container>
        )
    }

    if (!employee.id) {
        return (
            <Container customClass='column'>
                <h1 className={styles.text}>Não há nenhum funcionário conectado ao sistema!</h1>
                <LinkButton to='/' text="Ir para a tela de login" />
            </Container>
        )
    }
}

export default Gestor