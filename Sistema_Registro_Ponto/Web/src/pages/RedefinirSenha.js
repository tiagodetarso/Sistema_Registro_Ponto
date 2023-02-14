import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Bponto.module.css'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import RedefinirSenhaForm from '../forms/RedefinirSenhaForm'

function RedefinirSenha({ employee, RedefinirSenhaToApp }) {

    const navigate = useNavigate()

    function Redefinir (dadosForm) {
        const apiUrl = process.env.REACT_APP_API_URL
        fetch (`http://${apiUrl}/employee/redefinirsenha`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(dadosForm)
            })
            .then(resp => resp.json())
            .then((data) => {
                RedefinirSenhaToApp(data.msg)
                navigate('/ulregistros')

            })
            .catch((err) => console.log(err))
    }

    if (employee.id) {
        return (
            <Container customClass='column'>
                    <h1 className={styles.text}>Redefinir Senha PonTTo</h1>
                    <RedefinirSenhaForm employee={employee} btnText="Redefinir Senha" handleSubmit={Redefinir} />
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

export default RedefinirSenha