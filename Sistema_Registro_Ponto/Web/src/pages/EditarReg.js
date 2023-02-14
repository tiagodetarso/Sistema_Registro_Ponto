import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import RegEditForm from '../forms/RegEditForm'
import styles from './Gestor.module.css'

function EditarReg ({ employee, EditarRegToApp }) {

    const navigate = useNavigate()
    const location = useLocation()

    const dadosRegistro = location.state

    function Editar (dados) {
        const apiUrl = process.env.REACT_APP_API_URL
        const enviaDados = {
            id: dados.id,
            registration: dados.registration,
            geoLocal: {
                latitude: dados.latitude,
                longitude: dados.longitude
            },
            dia: dados.date,
            hora: dados.time
        }

        fetch (`http://${apiUrl}/register/editar`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(enviaDados),
        })
        .then(resp => resp.json())
        .then((data) => {
            EditarRegToApp(data.msg)
            if (data.msg === "Dados atualizados com sucesso") {
                navigate(-1)
            }
        })
        .catch((err) => console.log(err))
    }

    if (employee.id && employee.isManager) {
        return (
            <Container customClass="column">
                <h1 className={styles.text}>Editar Registro</h1>
                <RegEditForm handleSubmit={Editar} btnText='Confirmar Alterações' dados={dadosRegistro}/>
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

export default EditarReg