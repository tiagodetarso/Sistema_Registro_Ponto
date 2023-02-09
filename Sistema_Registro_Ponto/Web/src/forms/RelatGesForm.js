import React from 'react'
import { useState } from 'react'

import Input from '../formitens/Input'
import SubmitButton from '../formitens/SubmitButton'

import styles from './LoginForm.module.css'

function RelatGesForm ({ handleSubmit, btnText }) {

    const [ formData, setFormData ] = useState({})

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(formData)
    }

    const handleChange = (e) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    console.log(formData)

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text"
                text="Matrícula"
                name="registration"
                handleOnChange={handleChange}
                value={formData.registration}
            />
            <Input 
                type="date"
                text="Data de Início"
                name="initialDate"
                handleOnChange={handleChange}
                value={formData.initialDate}
            />
            <Input 
                type="date"
                text="Data Final"
                name="finalDate"
                handleOnChange={handleChange}
                value={formData.finalDate}
            />
            <SubmitButton text={btnText} />
        </form>

    )
}

export default RelatGesForm