import React from 'react'
import { useEffect, useState } from 'react'

import styles from './Relogio.module.css'

function Local ({ LocalToBponto }) {

    const [currentLat, setCurrentLat] = useState("")
    const [currentLong, setCurrentLong] = useState("")
    
    useEffect(() => {
                
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(GetPosition)
            } else {
                alert("O seu navegador não suporta Geolocalização")
            }        
  },[30000])

    let GetPosition = (position) => {
        setCurrentLat(position.coords.latitude)
        setCurrentLong(position.coords.longitude)
        let localidade = {latitude: position.coords.latitude, longitude: position.coords.longitude}
        LocalToBponto(localidade)
    }



    return(
            <div className={styles.div}>
                <p className={styles.p}>LATITUDE: <span className={styles.span}>{currentLat}</span> LONGITUDE: <span className={styles.span}>{currentLong}</span></p>
            </div>
    )
}

export default Local