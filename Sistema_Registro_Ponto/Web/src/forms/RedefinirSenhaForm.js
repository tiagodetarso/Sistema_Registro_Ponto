import React from 'react'
import { useState } from 'react'

import Input from '../formitens/Input'
import ReadInput from '../formitens/ReadInput'
import SubmitButton from '../formitens/SubmitButton'

import styles from './LoginForm.module.css'

function RedefinirSenhaForm ({ handleSubmit, btnText, employee }) {

    const [ dadosSenha, setDadosSenha ] = useState({
        registration: employee.registration,
        newPassword: "",
        repeatPassword: ""
        })

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
            <ReadInput 
                type="text"
                text="Matrícula"
                name="registration"
                placeholder="Digite seu número de matrícula"
                handleOnChange={handleChange}
                value={dadosSenha.registration}
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

export default RedefinirSenhaForm