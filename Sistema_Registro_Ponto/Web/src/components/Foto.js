import React, { useEffect } from 'react'
import Webcam from 'react-webcam'

function Foto ( { FotoToBponto }) {

    const webcamRef = React.useRef()
    
    const capture = React.useCallback (() => {
        const src = webcamRef.current ? webcamRef.current.getScreenshot() : null
        console.log(src)
        if (src) {
            FotoToBponto(src)
        }
    },[webcamRef])

    useEffect(() => {
        const timer = setTimeout(() => {
            capture();
        }, 3000);
        return () => clearTimeout(timer);
    }, [])

    return (
        <div>
            <Webcam
            audio={false}
            height={300}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            width={225}
            justifyContent="center"
            />
        </div>
    )    
}

export default Foto