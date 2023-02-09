import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import Relogio from '../components/Relogio'
import Local from '../components/Local'
import LinkButton from '../layout/LinkButton'
import Container from '../layout/Container'
import Button from '../formitens/Button'

import styles from './Bponto.module.css'

function Bponto ({ employee, BpontoToApp }) {

    const navigate = useNavigate()

    const accessKEY = process.env.REACT_APP_ACCESS_KEY

    const[adress, setAdress] = useState("")
    const[local, setLocal] = useState({})
    const[date, setDate] = useState({})

    function LocalToBponto ( data ) {
        setLocal(data)
    }

    function RelogioToBponto ( data ) {
        setDate(data)
    }

    function Registrar () {

        let registro = 
            {
                registration: employee.registration,
                geoLocal:
                    {
                        latitude:local.latitude,
                        longitude:local.longitude
                    },
                numberTime: date
            }

            console.log(registro)
            console.log(JSON.stringify(registro))

        fetch ('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(registro)
        })
        .then(resp => resp.json())
        .then((data) => {
            if (data.msg === "Ponto registrado com sucesso") {
                navigate("/ulregistros")
            }
            BpontoToApp(data.msg)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetch (`http://api.positionstack.com/v1/reverse?access_key=3205c5b13ce6fde754d0973dc22cb041&query=${local.latitude},${local.longitude}`)
            .then(resp => resp.json())
            .then((data) => {
                console.log(data)
                setAdress(data.data[0].label)
            })
            .catch((err) => console.log(err))      
    },[local])

    if (employee.id) {
        return (
            <Container customClass='column'>
                <h1 style={{color: "#4682b4"}}>Bater PonTTo</h1>
                <Relogio RelogioToBponto={RelogioToBponto} />
                <Local LocalToBponto={LocalToBponto}/>
                <span className={styles.id}>{adress}</span>
                <p className={styles.id}><span>Nome: </span>{employee.name}</p>
                <p className={styles.id}><span>Matrícula: </span>{employee.registration}</p>
                <Button text='Bater PonTTo' handleOnClick={Registrar} />
            </Container>
        )
    } else {
        return (
            <Container customClass='column'>
                <h1 className={styles.text}>Não há nenhum funcionário conectado ao sistema!</h1>
                <LinkButton to='/' text="Ir para a tela de login" />
            </Container>
    )
    }
}

export default Bponto