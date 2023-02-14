import styles from './TextButton.module.css'

function TextButton ({ text, handleOnClick }) {
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

export default TextButton