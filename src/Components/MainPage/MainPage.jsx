import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchGender, fetchCategory } from "@/features/goodsSlice"
import { setActiveGender } from '@/features/navigationSlice'
import { Goods } from "../Goods/Goods"

export const MainPage = () => {
    const { gender, category } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setActiveGender(gender))
    }, [gender, dispatch])
    useEffect(() => {
        if (gender && category) {
            dispatch(fetchCategory({ gender, category }))
            return
        }
        if (gender) {
            dispatch(fetchGender(gender))
            return
        }
    }, [gender, category, dispatch])

    return (
        <>
            <div></div>
            <Goods category={category} />
        </>
    )
}