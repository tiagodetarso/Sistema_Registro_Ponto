import React from 'react'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'

import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import SolicitacaoForm from '../forms/SolicitacaoForm'
import styles from './Bponto.module.css'

function Solicitacoes({ employee, SolicitacoesToApp }) {

    const navigate = useNavigate()

    const serviceID = process.env.REACT_APP_SERVICE_ID
    const templateID = process.env.REACT_APP_SG_TEMPLATE_ID
    const apiKEY = process.env.REACT_APP_EMAILJS_API_KEY

    function sendEmail (form) {
        console.log(form)
        emailjs.sendForm(serviceID, templateID, form , apiKEY)
        .then((result) => {
            console.log(result.text)
            navigate("/atelogo")
            SolicitacoesToApp("E-mail enviado com sucesso!")
          }, (error) => {
        console.log(error.text)
        SolicitacoesToApp("Algum erro ocorreu no envio do e-mail")
        })
    }

    if (employee.id) {
        return (
            <Container customClass='column'>
                <h1 style={{color: "#4682b4"}}>Solicitação ao RH</h1>
                <SolicitacaoForm handleSubmit={sendEmail} employee={employee} btnText="Enviar e-mail"/>
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

export default Solicitacoes