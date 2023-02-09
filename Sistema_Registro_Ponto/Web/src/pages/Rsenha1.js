import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'

import Container from '../layout/Container'
import RsenhaForm1 from '../forms/RsenhaForm1'
import RsenhaForm2 from '../forms/RsenhaForm2'

function Rsenha1({ RsenhaToApp }) {

    const navigate = useNavigate()

    const serviceID = process.env.REACT_APP_SERVICE_ID
    const templateID = process.env.REACT_APP_RS_TEMPLATE_ID
    const apiKEY = process.env.REACT_APP_EMAILJS_API_KEY

    const [codigo, setCodigo] = useState("")
    const [endereco, setEndereco] = useState("")

    function pegarCodigoRecuperacao(dadosForm) {
        
        fetch ('http://192.168.200.103:4000/employee/rsenha', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(dadosForm)
        })
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)
            if (data.msg === "Codigo criado com sucesso") {
                setCodigo(data.content.codigo)
                setEndereco(data.content.email)
            }
        })
        .catch((err) => console.log(err))
    }

    function sendEmail (form) {
        emailjs.sendForm(serviceID, templateID, form , apiKEY)
        .then((result) => {
            console.log(result.text)
            navigate("/novasenha")
            RsenhaToApp("E-mail enviado com sucesso!")
          }, (error) => {
        console.log(error.text)
        RsenhaToApp("Algum erro ocorreu no envio do e-mail")
        })
    }

    if (codigo === "") {
        return (
            <Container customClass='column'>
                <h1 style={{color: "#4682b4"}}>Recuperação de Senha PonTTo</h1>
                <RsenhaForm1 handleSubmit={pegarCodigoRecuperacao} btnText="Próximo"/>
            </Container>
        )
    } else {
        return (
            <Container customClass='column'>
                <h1 style={{color: "#4682b4"}}>Recuperação de Senha PonTTo</h1>
                <RsenhaForm2 handleSubmit={sendEmail} btnText="Enviar e-mail" codigo={codigo} email={endereco}/>
            </Container>
        )
    }
}

export default Rsenha1