import React from 'react'
import { useState } from 'react'

import Input from '../formitens/Input'
import SubmitButton from '../formitens/SubmitButton'

import styles from './LoginForm.module.css'

function PesqRegForm ({ handleSubmit, btnText }) {

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
                type="date"
                text="Dia"
                name="date"
                placeholder="Digite o nome ou parte do nome"
                handleOnChange={handleChange}
                value={dadosFunc.date}
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

export default PesqRegForm