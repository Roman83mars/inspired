import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { MainPage, ErrorPage, ProductPage, FavoritePage, CartPage, SearchPage } from "@components"
import { Root } from "@/routes/Root"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchNavigation } from "@/store/features/navigationSlice"
import { fetchColors } from "@/store/features/colorSlice"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Root />}>
            <Route index element={<MainPage />} />
            <Route path='/favorite' element={<FavoritePage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/catalog/:gender/:category?' element={<MainPage />} />

            <Route path='*' element={<ErrorPage />} />
        </Route>
    )
)

export const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchNavigation())
        dispatch(fetchColors())
    }, [dispatch])

    return (
        <RouterProvider router={router} />
    )
}