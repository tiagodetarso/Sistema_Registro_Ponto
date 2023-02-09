import React from 'react'
import {Link} from 'react-router-dom'

import styles from './LinkButton.module.css'

function LinkButton ({ to, text, customClass }) {
    return (
        <Link className={styles.btn} to={to}>
            <p className={styles.txt}>{text}</p>
        </Link>
    )
}

export default LinkButton