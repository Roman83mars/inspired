import { Container } from "@/Components/Layout/Container/Container"
import { Category } from "./Category/Category"
import { Gender } from "./Gender/Gender"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { setActiveGender } from '@/features/navigationSlice'

export const Navigation = ({ list }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const gender = location.pathname.split('/')[1] || 'women';

    useEffect(() => {
        dispatch(setActiveGender(gender))
    }, [gender, dispatch])

    return (
        <nav className="navigation">
            <Container className="container">
                <Gender list={list} />
                <Category list={list} />
            </Container>
        </nav>
    )
}