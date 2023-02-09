import React, { useRef } from 'react'

import Input from '../formitens/Input'
import SubmitButton from '../formitens/SubmitButton'

import styles from './LoginForm.module.css'

function RsenhaForm2 ({ handleSubmit, btnText, codigo, email }) {

    const form = useRef()
    const recuperacao= {codigo:codigo, email:email}

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(form.current)
    }

    return (
        <form ref={form} onSubmit={submit} className={styles.form}>
            <Input 
                type="hidden"
                name="email"
                value={recuperacao.email}
            />
            <Input 
                type="hidden"
                name="codigo"
                value={codigo}
            />
            <SubmitButton text={btnText} />
        </form>

    )
}

export default RsenhaForm2