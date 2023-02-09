import React from 'react'
import { useState } from 'react'

import Input from '../formitens/Input'
import SubmitButton from '../formitens/SubmitButton'
import LinkButton from '../layout/LinkButton'

import styles from './LoginForm.module.css'

function LoginForm ({ handleSubmit, btnText, LoginData }) {

    const [ employee, setEmployee ] = useState( LoginData || {})

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(employee)
    }

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text"
                text="Número de Matrícula"
                name="registration"
                placeholder="Digite seu número de matrícula"
                handleOnChange={handleChange}
                value={employee.registration}
            />
            <Input 
                type="password"
                text="Senha"
                name="password"
                placeholder="Digite sua senha"
                handleOnChange={handleChange}
                value={employee.password}
            />
            <SubmitButton text={btnText} />
            <LinkButton to="/rsenha" text="Esqueceu a senha?" />
        </form>

    )
}

export default LoginForm