import style from './SearchPage.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { Goods } from "@components"
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchAll } from '@/store/features/goodsSlice'

export const SearchPage = () => {
    const dispatch = useDispatch()
    const { goodsList } = useSelector(state => state.goods)
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const search = searchParams.get('q')
        const params = { search }

        dispatch(fetchAll(params))
    }, [dispatch, searchParams])

    return (
        goodsList.length ?
            <Goods title='Результаты поиска' />
            :
            <h3 className={style.empty}>
                Ничего не найдено по Вашему запросу {searchParams.get('q')}
            </h3>
    )
}