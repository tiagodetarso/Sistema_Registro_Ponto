import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Gestor.module.css'

import LinkButton from '../layout/LinkButton'
import Container from '../layout/Container'
import RelatGesForm from '../forms/RelatGesForm'

function GerarRelat ({ employee, RelatorioGestorToApp }) {

    const navigate = useNavigate()

    function Relatorio (dados) {
        const apiUrl = process.env.REACT_APP_API_URL
        fetch (`http://${apiUrl}/register/relatorio`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(dados),
            })
            .then(resp => resp.json())
            .then((data) => {
                console.log(data)
    
                RelatorioGestorToApp(data.msg, data.content)
                navigate("/relatorios/report")
            })
            
            .catch((err) => console.log(err))
    }

    if (employee.id && employee.isManager) {
        return (
            <Container customClass='column'>
                <h1 className={styles.text}>Gerar Relatório PonTTo</h1>
                <p className={styles.text}>Preencha todos os campos e clique em "Gerar Relatório"</p>
                <RelatGesForm btnText="Gerar Relatório" handleSubmit={Relatorio}/>
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

export default GerarRelat