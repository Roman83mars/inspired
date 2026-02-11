import { useDispatch, useSelector } from "react-redux"
import { Goods } from "@components"
import { useEffect } from "react"
import { fetchCategory } from "@/store/features/goodsSlice"
import { usePageFromSearchParams } from "@/hooks/usePageFromSearchParams"
import style from './FavoritePage.module.scss'

export const FavoritePage = () => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites)
    const pageURL = usePageFromSearchParams(dispatch)

    useEffect(() => {
        if (favorites) {
            const param = { list: favorites }
            if (pageURL) {
                param.page = pageURL
            }
            dispatch(fetchCategory(param))
        }
    }, [favorites, pageURL, dispatch])

    return (
        favorites.length ?
            <Goods title='Избранное' />
            :
            <h3 className={style.empty}>Вы ничего не добавили в Избранное</h3>
    )
}