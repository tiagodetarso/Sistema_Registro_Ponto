import React from 'react'
import { useNavigate } from 'react-router-dom'

import Container from '../layout/Container'
import LoginForm from '../forms/LoginForm'

function Login ({ LoginToApp }) {

    const navigate = useNavigate()

    function Logar (employee) {

        fetch ('http://localhost:4000/employee/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(employee),
        })
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)
            const receivedData = data ? data : {msg:"", content:""}
            if (receivedData.msg === "Login realizado com sucesso") {
                navigate("/ponto")
            }
            LoginToApp(receivedData.msg, receivedData.content)
        })
        .catch((err) => console.log(err))
    }

    return (
        <Container customClass='column'>
            <h1 style={{color: "#4682b4"}}>Login PonTTo</h1>
            <LoginForm handleSubmit={Logar} btnText="Entrar"/>
        </Container>
    )
}

export default Login