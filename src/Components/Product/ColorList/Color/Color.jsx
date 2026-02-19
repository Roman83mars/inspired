import { useEffect, useRef } from 'react'
import style from './Color.module.scss'

export const Color = ({ color }) => {
    const colorRef = useRef(null)
    useEffect(() => {
        colorRef.current.style.setProperty('--data-color', color)
    }, [color])

    return (
        <li
            className={style.color}
            ref={colorRef}
        />
    )
}