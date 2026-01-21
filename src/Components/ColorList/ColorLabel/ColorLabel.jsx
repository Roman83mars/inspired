import { useEffect, useRef } from 'react'
import style from './ColorLabel.module.scss'

export const ColorLabel = ({ color, check, selectedColor, handleColorChange }) => {
    const colorRef = useRef(null)
    useEffect(() => {
        colorRef.current.style.setProperty('--data-color', color?.code)
    }, [color])

    return (
        <label className={style.color} ref={colorRef}>
            <input
                className={style.input}
                type="radio"
                name='color'
                value={color?.title}
                checked={selectedColor ? selectedColor === color?.title : check}
                onChange={handleColorChange}
            />
            <span className={style.colorCheck}></span>
        </label>
    )
}