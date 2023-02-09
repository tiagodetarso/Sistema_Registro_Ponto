import React from 'react'
import { useEffect, useState } from 'react'

import styles from './Relogio.module.css'

function Relogio ({ RelogioToBponto }) {

    const [currentDate, setCurrentDate] = useState("")
    
    useEffect(() => {
        setTimeout(() => {
            let fullDate = new Date()
            let day = fullDate.getDate(); //Current Date
            day<10 ? day = "0"+day.toString() : day = day.toString()
            let month = fullDate.getMonth() + 1; //Current Month
            month<10 ? month = "0"+month : month = month.toString()
            let year = fullDate.getFullYear(); //Current Year
            year = year.toString()
            let hours = fullDate.getHours(); //Current Hours
            hours<10 ? hours = "0"+hours : hours = hours.toString()
            let min = fullDate.getMinutes(); //Current Minutes
            min<10 ? min = "0"+min : min = min.toString()
            let sec = fullDate.getSeconds(2); //Current Seconds
            sec<10 ? sec = "0"+sec.toString()  : sec = sec.toString()

            let dataHorario = fullDate.valueOf()

            RelogioToBponto(dataHorario)
            setCurrentDate(()=> 
                day + '/' + month + '/' + year + ' - ' + hours + ':' + min + ':' + sec
                )}, 1000)
  })

    return(
            <div className={styles.div}>
                <p className={styles.p}>DIA E HORA: <span className={styles.span}>{currentDate}</span></p>
            </div>
    )
}

export default Relogio