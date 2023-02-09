import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsPencilFill } from "react-icons/bs"
import { TiDelete } from "react-icons/ti"

import styles from './Gestor.module.css'

import LinkButton from '../layout/LinkButton'
import Container from '../layout/Container'
import PesqFuncForm from '../forms/PesqFuncForm'

function PesquisarFunc ({ employee, PesquisarFuncToApp }) {

    const navigate = useNavigate()

    const [receivedData, setReceivedData] = useState([])
    const [dadosPesquisa, setDadosPesquisa] = useState()

        function pesquisar (filtros) {
            fetch ('http://localhost:4000/employee/filtro', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(filtros),
            })
            .then(resp => resp.json())
            .then((data) => {
                setReceivedData(data)
                console.log(data)
            })
            .catch((err) => console.log(err))

            setDadosPesquisa(filtros)
        }

    function TableEditar (funcionario) {
        navigate('/gestor/pesqf/editar', {state:{
                                                    id: funcionario._id,
                                                    name: funcionario.name,
                                                    registration: funcionario.registration,
                                                    email: funcionario.email,
                                                    sector: funcionario.sector,
                                                    position: funcionario.position,
                                                    workload: funcionario.workload,
                                                    isManager: funcionario.isManager
                                                }})
    }

    function TableDel (id) {
        fetch ('http://localhost:4000/employee/delete', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(id),
        })
        .then(resp => resp.json())
        .then((data) => {
            PesquisarFuncToApp(data.msg)
            console.log(id)
        })
        .catch((err) => console.log(err))

        pesquisar(dadosPesquisa)
    }

    if (employee.id && employee.isManager) {
        return (
            <Container customClass='cont'>
                <Container customClass='columnNav'>
                    <h1 className={styles.text}>Pesquisar Funcionário</h1>
                    <h5 className={styles.text}>Preencha todos, um ou nenhum dos campos e clique</h5>
                    <h5 className={styles.text}>em "Pesquisar"</h5>
                    <PesqFuncForm btnText="Pesquisar" handleSubmit={pesquisar}/>
                    <LinkButton to='/gestor' text="Voltar ao Menu" />
                </Container>
                <Container customClass='columnWidth'>
                    <div>
                        <div>
                            <h1 className={styles.text}>Resultado da Pesquisa</h1>
                        </div>
                        <div>
                            <table className={styles.tabela}>
                                <thead>
                                    <tr>
                                        <td className={styles.celtabhead}>Matr.</td>
                                        <td className={styles.celtabhead}>Nome Completo</td>
                                        <td className={styles.celtabhead}>Editar</td>
                                        <td className={styles.celtabhead}>Del</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {receivedData.length > 0  &&
                                    receivedData.map((funcionario) => (
                                        <tr>
                                            <td className={styles.celtabbody}>{funcionario.registration}</td>
                                            <td className={styles.celtabnome}>{funcionario.name}</td>
                                            <td className={styles.celtabbody}>
                                                <button 
                                                    type='button' 
                                                    onClick={()=>TableEditar(funcionario)}>
                                                    <BsPencilFill className={styles.icon}/>
                                                </button>
                                            </td>
                                            <td className={styles.celtabbody}>
                                                <button 
                                                    type='button'
                                                    onClick={()=>TableDel({id: funcionario._id})}>
                                                    <TiDelete className={styles.icon}/>
                                                </button>
                                            </td>
                                        </tr>))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Container>
            </Container>
        )  
    } else {
        return (
            <Container customClass='column'>
                <h1 className={styles.text}>Você não esta conectado ou não tem acesso a esta área</h1>
                <LinkButton to='/' text="Se não estiver conectado, clique aqui e vá para a tela de Login" />
            </Container>
        )
    }
}

export default PesquisarFunc