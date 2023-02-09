import React from 'react'
import { useState } from 'react'

import Input from '../formitens/Input'
import SubmitButton from '../formitens/SubmitButton'

import styles from './LoginForm.module.css'

function InserirForm ({ handleSubmit, btnText }) {

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
                text="Matrícula"
                name="registration"
                placeholder="Digite o nº de matrícula do funcionário"
                handleOnChange={handleChange}
                value={dadosFunc.registration}
            />
            <Input 
                type="number"
                text="Latitude"
                name="latitude"
                placeholder="Digite a latitude (decimal)"
                handleOnChange={handleChange}
                value={dadosFunc.latitude}
                step=".0001"
            />
            <Input 
                type="number"
                text="Longitude"
                name="longitude"
                placeholder="Digite a longitude (decimal)"
                handleOnChange={handleChange}
                value={dadosFunc.longitude}
                step=".0001"
            />
            <Input 
                type="date"
                text="Dia"
                name="date"
                placeholder="Digite o dia do registro (dd/mm/aaaa)"
                handleOnChange={handleChange}
                value={dadosFunc.date}
            />
            <Input 
                type="time"
                text="Hora"
                name="time"
                placeholder="Digite a hora do registro"
                handleOnChange={handleChange}
                value={dadosFunc.time}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default InserirForm