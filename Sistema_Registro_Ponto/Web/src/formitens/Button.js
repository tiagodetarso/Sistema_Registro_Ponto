import React from 'react'
import styles from './SubmitButton.module.css'

function Button ({ text, handleOnClick }) {
    return (
        <div>
            <button 
                className={styles.btn}
                onClick={handleOnClick}
                >
                {text}
            </button>
        </div>
    )
}

export default Button