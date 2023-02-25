import React from 'react'
import { useState } from 'react'

import Input from '../formitens/Input'
import ReadInput from '../formitens/ReadInput'
import SubmitButton from '../formitens/SubmitButton'

import styles from './LoginForm.module.css'

function RegEditForm ({ handleSubmit, btnText, dados }) {

    const [ dadosReg, setDadosFunc ] = useState(dados)
    
    const submit = (e) => {
        e.preventDefault()
        handleSubmit(dadosReg)
    }

    const handleChange = (e) => {
        setDadosFunc({ ...dadosReg, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <ReadInput
                type="text"
                text="ID do Registro"
                name="id"
                placeholder='Digite o número do id do registro'
                handleOnChange={handleChange}
                value={dadosReg.id}
            />
            <ReadInput
                type="text"
                text="Matrícula"
                name="registration"
                placeholder="Digite o número de matrícula do funcinário"
                handleOnChange={handleChange}
                value={dadosReg.registration}
            />
            <Input 
                type="number"
                text="Latitude"
                name="latitude"
                placeholder="Digite o valor da latitude"
                handleOnChange={handleChange}
                value={dadosReg.latitude}
                step=".0000001"
            />
            <Input 
                type="number"
                text="Longitude"
                name="longitude"
                placeholder="Digite o valor da longitude"
                handleOnChange={handleChange}
                value={dadosReg.longitude}
                step=".0000001"
            />
            <Input 
                type="text"
                text="Logradouro"
                name="local"
                placeholder="Digite o dia do registro (dd/mm/aaa)"
                handleOnChange={handleChange}
                value={dadosReg.local}
            />
            <Input 
                type="text"
                text="Dia no formato (dd/mm/aaaa)"
                name="date"
                placeholder="Digite o dia do registro (dd/mm/aaa)"
                handleOnChange={handleChange}
                value={dadosReg.date}
            />
            <Input 
                type="text"
                text="Hora no formato (hh:mm:ss)"
                name="time"
                placeholder="Digite a hora do registro"
                handleOnChange={handleChange}
                value={dadosReg.time}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default RegEditForm