import React from 'react'
import { useState } from 'react'

import Input from '../formitens/Input'
import SubmitButton from '../formitens/SubmitButton'

import styles from './LoginForm.module.css'

function PesqFuncForm ({ handleSubmit, btnText }) {

    const [ dadosFunc, setDadosFunc ] = useState({})
    
    const submit = (e) => {
        e.preventDefault()
        handleSubmit(dadosFunc)
    }

    const handleChange = (e) => {
        setDadosFunc({ ...dadosFunc, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text"
                text="Nome"
                name="name"
                placeholder="Digite o nome ou parte do nome"
                handleOnChange={handleChange}
                value={dadosFunc.name}
            />
            <Input 
                type="text"
                text="Matrícula"
                name="registration"
                placeholder="Digite o número de matrícula ou parte do número"
                handleOnChange={handleChange}
                value={dadosFunc.registration}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default PesqFuncForm