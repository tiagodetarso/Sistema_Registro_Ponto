import React from 'react'
import styles from './Modal.module.css'

function Modal ({ foto, fecharModal }) {
    return (
        <div className={styles.modal}>
            <button className={styles.btn} onClick={fecharModal}>Fechar Foto Pontto</button>
            <img className={styles.img} src={`data:image/jpeg;base64,${foto}`} alt="Foto Ponto" />
        </div>
    )
}

export default Modal