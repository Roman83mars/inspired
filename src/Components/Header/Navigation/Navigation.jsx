import { Container } from "@/Components/Layout/Container/Container"
import { Category } from "./Category/Category"
import { Gender } from "./Gender/Gender"

export const Navigation = ({ list }) => {
    return (
        <nav className="navigation">
            <Container className="container">
                <Gender list={list} />
                <Category list={list} />
            </Container>
        </nav>
    )
}