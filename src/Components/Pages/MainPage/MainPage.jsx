import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchGender, fetchCategory } from "@/store/features/goodsSlice"
import { setActiveGender } from '@/store/features/navigationSlice'
import { Goods, Banner } from "@components"
import { usePageFromSearchParams } from "@/hooks/usePageFromSearchParams"

export const MainPage = () => {
    const { gender, category } = useParams()
    const dispatch = useDispatch()
    const pageURL = usePageFromSearchParams(dispatch)
    const { activeGender, categories, genderList } = useSelector(state => state.navigation)
    const genderData = categories[activeGender]
    const categoryData = genderData?.list.find(item => item.slug === category)

    useEffect(() => {
        if (gender) {
            dispatch(setActiveGender(gender))
        } else if (genderList[0]) {
            dispatch(setActiveGender(genderList[0]))
            dispatch(fetchGender(genderList[0]))
        }
    }, [gender, genderList, dispatch])
    useEffect(() => {
        if (gender && category) {
            const params = { gender, category }
            if (pageURL) {
                params.page = pageURL
            }
            dispatch(fetchCategory(params))
            return
        }
        if (gender) {
            dispatch(fetchGender(gender))
            return
        }
    }, [gender, category, pageURL, dispatch])

    return (
        <>
            {!category && <Banner data={genderData?.banner} />}
            <Goods title={categoryData?.title} />
        </>
    )
}