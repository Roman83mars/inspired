import style from './Main.module.scss'

export const Main = ({ children }) => {
    return (
        <div className={style.main}>
            {children}
        </div>
    )
}