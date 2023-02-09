import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import EditForm from '../forms/EditForm'
import styles from './Gestor.module.css'

function Editar ({ employee, EditarToApp }) {

    const navigate = useNavigate()
    const location = useLocation()

    const dadosFuncionario = location.state

    function Editar (dados) {
        fetch ('http://localhost:4000/employee/editar', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(dados),
        })
        .then(resp => resp.json())
        .then((data) => {
            EditarToApp(data.msg)
            if (data.msg === "Dados atualizados com sucesso") {
                navigate(-1)
            }

        })
        .catch((err) => console.log(err))
    }

    if (employee.id && employee.isManager) {
        return (
            <Container customClass="column">
                <h1 className={styles.text}>Editar Funcionário</h1>
                <EditForm handleSubmit={Editar} btnText='Confirmar Alterações' dados={dadosFuncionario}/>
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

export default Editar