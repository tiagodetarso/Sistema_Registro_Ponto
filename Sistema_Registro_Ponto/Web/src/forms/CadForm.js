import React from 'react'
import { useState } from 'react'

import Input from '../formitens/Input'
import SubmitButton from '../formitens/SubmitButton'

import styles from './LoginForm.module.css'

function CadForm ({ handleSubmit, btnText }) {

    const [ manager, setManager] = useState(false)
    const [ dadosFunc, setDadosFunc ] = useState({})
    
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
            <Input 
                type="text"
                text="Nome"
                name="name"
                placeholder="Digite o nome completo do funcionário"
                handleOnChange={handleChange}
                value={dadosFunc.name}
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
                placeholder="Digite o e-mail do funcionário. Obs: este e-mail será usado em casos de recuperação de senha"
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
            />
            <Input 
                type="password"
                text="Senha para acesso"
                name="password"
                placeholder="Digite uma senha para acesso"
                handleOnChange={handleChange}
                value={dadosFunc.password}
            />
            <Input 
                type="password"
                text="Confirmação de Senha"
                name="confirmpassword"
                placeholder="Digite senha igual à digitada no campo anterior"
                handleOnChange={handleChange}
                value={dadosFunc.confirmpassword}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default CadForm