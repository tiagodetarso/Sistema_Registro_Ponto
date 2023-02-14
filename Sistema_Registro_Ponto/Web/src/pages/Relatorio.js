import React from 'react'
import { useNavigate } from 'react-router-dom'

import RelatorioForm from '../forms/RelatorioForm'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import styles from './Bponto.module.css'

function Relatorios({ employee, RelatorioToApp }) {

    const navigate = useNavigate()

    function GerarRelatorio (datas) {
        const apiUrl = process.env.REACT_APP_API_URL
        const fetchBody = {
            registration: employee.registration,
            initialDate: datas.initialDate,
            finalDate: datas.finalDate
        }

        fetch (`http://${apiUrl}/register/relatorio`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(fetchBody),
        })
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)

            RelatorioToApp(data.msg, data.content)
            navigate("/relatorios/report")

        })
        .catch((err) => console.log(err))
    }

    if (employee.id) {
        return (
            <Container customClass='column'>
                <h1 style={{color: "#4682b4"}}>Relatório PonTTo</h1>
                <RelatorioForm btnText="Gerar Relatório" handleSubmit={GerarRelatorio} />
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

export default Relatorios