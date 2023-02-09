import React, {useRef} from 'react'
import { useState } from 'react'

import Input from '../formitens/Input'
import SubmitButton from '../formitens/SubmitButton'
import TextArea from '../formitens/TextArea'

import styles from './LoginForm.module.css'

function SolicitacaoForm ({ handleSubmit, btnText, employee }) {

    const form = useRef()
    const [ solicitacaoData, setSolicitacaoData ] = useState({})

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(form.current)
    }

    const handleChange = (e) => {
        e.preventDefault()
        setSolicitacaoData({ ...solicitacaoData, [e.target.name]: e.target.value})
    }

    console.log(solicitacaoData)

    return (
        <form ref={form} onSubmit={submit} className={styles.form}>
            <Input 
                type="text"
                text="Assunto"
                name="subject"
                placeholder="Digite aqui o assunto"
                handleOnChange={handleChange}
                value={solicitacaoData.subject}
            />
            <TextArea
                text="Mensagem" 
                name="emailContent"
                cols={1}
                rows={15}
                placeholder="Digite a mensagem aqui. Obs: Não há necessidade de informar seu nome e matrícula. Tais informações constarão automaticamente no corpo do e-mail que será enviado."
                handleOnChange={handleChange}
                value={solicitacaoData.text}

            />
            <SubmitButton text={btnText} />
            <Input 
                type="hidden"
                name="registration"
                value={employee.registration}
            />
            <Input 
                type="hidden"
                name="name"
                value={employee.name}
            />
        </form>
    )
}

export default SolicitacaoForm