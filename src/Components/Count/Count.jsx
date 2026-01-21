import cn from 'classnames'
import style from './Count.module.scss'

export const Count = ({ count, handleInc, handleDec, className }) => {
    return (
        <div className={cn(style.count, className)}>
            <button className={style.item} type="button" onClick={handleDec}>-</button>
            <span className={cn(style.item, style.number)}>{count}</span>
            <button className={style.item} type="button" onClick={handleInc}>+</button>
        </div>
    )
}