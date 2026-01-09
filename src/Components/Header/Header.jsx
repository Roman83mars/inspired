import { Top } from "./Top/Top"
import { Navigation } from "./Navigation/Navigation"

export const Header = ({ list }) => {
    return (
        <header>
            <Top />
            <Navigation list={list} />
        </header>
    )
}