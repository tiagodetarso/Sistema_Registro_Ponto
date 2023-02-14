import React from 'react'
import { useState, useEffect } from 'react'

import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import styles from './Bponto.module.css'

function UlRegistros ({ employee }) {

    const [registros, setRegistros] = useState({})

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL
        fetch (`http://${apiUrl}/register/ultimos`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({registration: employee.registration})
            })
            .then(resp => resp.json())
            .then((data) => {
                console.log(data)
                setRegistros(data)
            })
            .catch((err) => console.log(err))
    },[])


    if (employee.id) {
        return (
            <Container customClass='column'>
                <h1 style={{color: "#4682b4"}}>Últimos Registros PonTTo</h1>
                <table>
                    <thead>
                        <tr>
                            <td>Dia e hora</td>
                            <td>Latitude</td>
                            <td>Longitude</td>
                        </tr>
                    </thead>
                    <tbody>
                    {registros.length > 0 &&
                        registros.map((registro) => (
                            <tr>
                                <td>{
                                    ("0"+new Date(registro.numberTime).getDate()).slice(-2)+"/"+
                                    ("0"+(new Date(registro.numberTime).getMonth()+1)).slice(-2)+"/"+
                                    new Date(registro.numberTime).getFullYear()+" - "+
                                    ("0"+new Date(registro.numberTime).getHours()).slice(-2)+":"+
                                    ("0"+new Date(registro.numberTime).getMinutes()).slice(-2)+":"+
                                    ("0"+new Date(registro.numberTime).getSeconds()).slice(-2)
                                    }
                                </td>
                                <td>{registro.geoLocal.latitude}</td>
                                <td>{registro.geoLocal.longitude}</td>
                            </tr>   
                        ))
                    }
                    </tbody>
                </table>
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

export default UlRegistros