import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsPencilFill } from "react-icons/bs"
import { TiDelete } from "react-icons/ti"
import { MdOutlinePhotoCamera } from "react-icons/md"

import styles from './Gestor.module.css'

import LinkButton from '../layout/LinkButton'
import Container from '../layout/Container'
import PesqRegForm from '../forms/PesqRegForm'
import Modal from '../components/Modal'

function PesquisarReg ({ employee, PesquisarRegToApp }) {

    const navigate = useNavigate()
    const [receivedData, setReceivedData] = useState([])
    const [dadosPesquisa, setDadosPesquisa] = useState()
    const [modalAberto, setModalAberto] = useState(false)
    const [imagem, setImagem] = useState(null)

    function pesquisar (filtros) {
        const apiUrl = process.env.REACT_APP_API_URL
        fetch (`http://${apiUrl}/register/filtro`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(filtros),
        })
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)
            setReceivedData(data)
        })
        .catch((err) => console.log(err))

        setDadosPesquisa(filtros)
    }

    function stringTime (numberTime) {
        let stringTime = new Date(numberTime)
        stringTime = stringTime.toString()
        return stringTime.slice(4,24)
    }

    function TableEditar (registro) {

        let novaData = new Date(registro.numberTime)
        
        let diaNovaData = ('0'+novaData.getDate()).slice(-2)
        let mesNovaData = ('0'+(novaData.getMonth()+1)).slice(-2)
        let anoNovaData = novaData.getFullYear()
        
        let date = diaNovaData+'/'+mesNovaData+'/'+anoNovaData
        console.log(date)
        
        let time = novaData.toString()
        time = time.slice(16,24)
    
        navigate('/gestor/pesqr/editar', {state: {
                                                    id: registro._id,
                                                    registration: registro.registration,
                                                    latitude: registro.geoLocal.latitude,
                                                    longitude: registro.geoLocal.longitude,
                                                    local: registro.geoLocal.stringLocal,
                                                    date: date,
                                                    time: time
                                                }})
    }

    function TableDel (id) {
        const apiUrl = process.env.REACT_APP_API_URL
        fetch (`http://${apiUrl}/register/delete`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(id),
        })
        .then(resp => resp.json())
        .then((data) => {
            PesquisarRegToApp(data.msg)
        })
        .catch((err) => console.log(err))

        pesquisar(dadosPesquisa)
    }

    function fecharModal () {
        setModalAberto(false)
    }

    function exibirFoto (foto) {
        const buffer = foto
        const base64String = Buffer.from(buffer).toString('base64')
        setImagem(base64String)
        console.log(base64String)
        setModalAberto(true)
    }

    if (employee.id && employee.isManager) {
        return (
            <Container customClass='cont'>
                <Container customClass='columnNav'>
                    <h1 className={styles.text}>Pesquisar Registros</h1>
                    <h5 className={styles.text}>Preencha todos os campos e clique em Pesquisar</h5>
                    <PesqRegForm btnText="Pesquisar" handleSubmit={pesquisar}/>
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
                                        <td className={styles.celtabhead}>Dia e Hora</td>
                                        <td className={styles.celtabhead}>Local</td>
                                        <td className={styles.celtabhead}></td>
                                        <td className={styles.celtabhead}>Editar</td>
                                        <td className={styles.celtabhead}>Del</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {receivedData.length > 0  &&
                                    receivedData.map((registro) => (
                                        <tr>
                                            <td className={styles.celtabbody}>{registro.registration}</td>
                                            <td className={styles.celtabnome}>{stringTime(registro.numberTime)}</td>
                                            <td className={styles.celtabnome}>{registro.geoLocal.stringLocal}</td>
                                            <td className={styles.celtabnome}>
                                                <button
                                                    type='button'
                                                    onClick={() => exibirFoto(registro.image)}>
                                                    <MdOutlinePhotoCamera className={styles.icon} />
                                                </button>
                                            </td>
                                            <td className={styles.celtabbody}>
                                                <button
                                                    type='button' 
                                                    onClick={()=>TableEditar(registro)}>
                                                    <BsPencilFill className={styles.icon}/>
                                                </button>
                                            </td>
                                            <td className={styles.celtabbody}>
                                                <button
                                                    type='button'
                                                    onClick={()=>TableDel({id: registro._id})}>
                                                    <TiDelete className={styles.icon}/>
                                                </button>
                                            </td>
                                        </tr>))
                                    }
                                </tbody>
                            </table>
                            {modalAberto ? <Modal foto={imagem} fecharModal={fecharModal} /> : null}
                        </div>
                    </div>
                </Container>
            </Container>
            )  
    } else {
        return (
            <Container customClass='column'>
                <h1 className={styles.text}>Voc?? n??o esta conectado ou n??o tem acesso a esta ??rea</h1>
                <LinkButton to='/' text="Se n??o estiver conectado, clique aqui e v?? para a tela de Login" />
            </Container>
        )
    }
}

export default PesquisarReg