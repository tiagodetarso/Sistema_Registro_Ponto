import React from 'react'
import { useState } from 'react'

import Input from '../formitens/Input'
import ReadInput from '../formitens/ReadInput'
import SubmitButton from '../formitens/SubmitButton'

import styles from './LoginForm.module.css'

function EditForm ({ handleSubmit, btnText, dados }) {

    const [ manager, setManager] = useState(dados.isManager)
    const [ dadosFunc, setDadosFunc ] = useState(dados)
    
    const submit = (e) => {
        e.preventDefault()
        handleSubmit(dadosFunc)
    }

    const handleChange = (e) => {
        setDadosFunc({ ...dadosFunc, [e.target.name]: e.target.value})
    }

    const handleChangeCk = (e) => {
        setManager(!manager)
        setDadosFunc({ ...dadosFunc, [e.target.name] : !manager})
    }
    
    return (
        <form onSubmit={submit} className={styles.form}>
            <ReadInput 
                type="text"
                text="ID do registro"
                name="id"
                handleOnChange={handleChange}
                value={dadosFunc.id}
            />
            <Input
                type="text"
                text="Nome"
                name="name"
                placeholder="Digite o nome completo do funcionário"
                handleOnChange={handleChange}
            />
            <Input 
                type="text"
                text="Matrícula"
                name="registration"
                placeholder="Digite o número de matrícula do funcionário"
                handleOnChange={handleChange}
                value={dadosFunc.registration}
            />
            <Input 
                type="email"
                text="E-mail"
                name="email"
                placeholder="Digite o e-mail do funcionário"
                handleOnChange={handleChange}
                value={dadosFunc.email}
            />
            <Input 
                type="text"
                text="Setor"
                name="sector"
                placeholder="Digite o setor no qual o funcionário trabalha"
                handleOnChange={handleChange}
                value={dadosFunc.sector}
            />
            <Input 
                type="text"
                text="Cargo/Função"
                name="position"
                placeholder="Digite o nome do cargo ou da função do funcionário"
                handleOnChange={handleChange}
                value={dadosFunc.position}
            />
            <Input 
                type="number"
                text="Carga Horária Semanal"
                name="workload"
                placeholder="Digite a carga horária semanal do funcionário"
                handleOnChange={handleChange}
                value={dadosFunc.workload}
            />
            <Input 
                type="checkbox"
                text="Terá acesso como gestor, ao sistema?"
                name="isManager"
                handleOnChange={handleChangeCk}
                value={dadosFunc.isManager}
                checked={dadosFunc.isManager}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default EditForm