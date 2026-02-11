import { useLocation, useNavigate, useRouteError } from "react-router-dom"
import style from './ErrorPage.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { fetchNavigation } from "@/store/features/navigationSlice"
import { fetchColors } from "@/store/features/colorSlice"

export const ErrorPage = () => {
    const routeError = useRouteError()
    const { status } = useSelector(state => state.statusServer)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const timerIdRef = useRef(null)

    useEffect(() => {
        if (status && location.pathname === '/404') {
            navigate('/')
        }
    }, [navigate, status, location])
    useEffect(() => {
        if (!status && location.pathname === '/404') {
            clearInterval(timerIdRef.current)
            timerIdRef.current = setInterval(() => {
                dispatch(fetchNavigation())
                dispatch(fetchColors())
            }, 3000)
        }
        return () => {
            clearInterval(timerIdRef.current)
        }
    }, [dispatch, status, location])

    return (
        <div className={style.error}>
            <h2 className={style.title}>Произошла ошибка, попробуйте зайти позже</h2>
            <p className={style.message}>{routeError?.message ?? "Неизвестная ошибка"}</p>
        </div>
    )
}