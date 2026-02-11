import { Header, Main, Footer } from "@components"
import { Outlet, ScrollRestoration } from "react-router-dom"

export const Root = () => {
    return (
        <>
            <Header />
            <Main>
                <Outlet />
            </Main>
            <Footer />
            <ScrollRestoration />
        </>
    )
}