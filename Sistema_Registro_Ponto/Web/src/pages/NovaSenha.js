import React from 'react'
import { useNavigate } from 'react-router-dom'

import Container from '../layout/Container'
import NovaSenhaForm from '../forms/NovaSenhaForm'

function NovaSenha({ NovaSenhaToApp }) {

    const navigate = useNavigate()

    function RedefinirSenha(dadosForm) {
        const apiUrl = process.env.REACT_APP_API_URL
        fetch (`http://${apiUrl}/employee/novasenha`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(dadosForm)
            })
            .then(resp => resp.json())
            .then((data) => {
                console.log(data)
                NovaSenhaToApp(data.msg)
                if (data.msg === "Senha alterada com sucesso") {
                    navigate('/')
                }

            })
            .catch((err) => console.log(err))
    }

    return (
        <Container customClass='column'>
                <h1 style={{color: "#4682b4"}}>Definir Nova Senha PonTTo</h1>
                <NovaSenhaForm btnText="Redefinir senha" handleSubmit={RedefinirSenha} />
        </Container>
    )
}

export default NovaSenha