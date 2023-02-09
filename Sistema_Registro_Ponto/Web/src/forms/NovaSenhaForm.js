import React from 'react'
import { useState } from 'react'

import Input from '../formitens/Input'
import SubmitButton from '../formitens/SubmitButton'

import styles from './LoginForm.module.css'

function NovaSenhaForm ({ handleSubmit, btnText, sendData }) {

    const [ dadosSenha, setDadosSenha ] = useState(sendData || {})

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(dadosSenha)
    }

    const handleChange = (e) => {
        setDadosSenha({ ...dadosSenha, [e.target.name]: e.target.value})
    }

    console.log(dadosSenha)

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text"
                text="Matrícula"
                name="registration"
                placeholder="Digite seu número de matrícula"
                handleOnChange={handleChange}
                value={dadosSenha.registration}
            />
            <Input 
                type="text"
                text="Código de Recuperação"
                name="codigo"
                placeholder="Números do código de recuperação enviado por e-mail"
                handleOnChange={handleChange}
                value={dadosSenha.codigo}
            />
            <Input 
                type="password"
                text="Nova Senha"
                name="newPassword"
                placeholder="Digite sua nova senha"
                handleOnChange={handleChange}
                value={dadosSenha.newPassword}
            />
            <Input 
                type="password"
                text="Confirmação Nova Senha"
                name="repeatPassword"
                placeholder="Digite senha igual à digitada anteriormente"
                handleOnChange={handleChange}
                value={dadosSenha.repeatPassword}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default NovaSenhaForm