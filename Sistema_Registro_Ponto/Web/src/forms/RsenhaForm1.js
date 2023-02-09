import React from 'react'
import { useState } from 'react'

import Input from '../formitens/Input'
import SubmitButton from '../formitens/SubmitButton'

import styles from './LoginForm.module.css'

function RsenhaForm1 ({ handleSubmit, btnText, RsenhaData }) {

    const [ recuperacao, setRecuperacao ] = useState( RsenhaData || {})

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(recuperacao)
    }

    const handleChange = (e) => {
        e.preventDefault()
        setRecuperacao({ ...recuperacao, [e.target.name]: e.target.value})
    }

    console.log(recuperacao)

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text"
                text="Número de Matrícula"
                name="registration"
                placeholder="Digite seu número de matrícula"
                handleOnChange={handleChange}
                value={recuperacao.registration}
            />
            <SubmitButton text={btnText} />
        </form>

    )
}

export default RsenhaForm1