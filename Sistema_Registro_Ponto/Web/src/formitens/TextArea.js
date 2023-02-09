import React from 'react'
import styles from './TextArea.module.css'

function TextArea ({ text, name, cols, rows, placeholder, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label for={name}>{text}</label>
            <textarea
                id={name} 
                name={name} 
                cols={cols} 
                rows={rows}
                placeholder={placeholder} 
                onChange={handleOnChange}
                value={value}
                required
            ></textarea>
        </div>
    )
}

export default TextArea