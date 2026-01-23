import { Container } from '@/Components/Layout/Container/Container'
import style from './Top.module.scss'
import cn from 'classnames'
import logo from '@/assets/logo.svg'
import { NavLink } from 'react-router-dom'
import LikeSVG from '@/assets/heart.svg?react'
import SearchSVG from '@/assets/search.svg?react'
import CartSVG from '@/assets/cart.svg?react'

export const Top = () => {
    return (
        <div className={style.top}>
            <Container className={style.container}>
                <a className={cn(style.link, style.phone)} href='tel:89304902620'>8 930 490 26 20</a>
                <NavLink className={style.logo} to="/">
                    <img src={logo} alt="Логотип Inspired" />
                </NavLink>
                <div className={style.navigation}>
                    <ul className={style.navList}>
                        <li className={style.navItem}>
                            <button className={style.link}>
                                <SearchSVG />
                            </button>
                        </li>
                        <li className={style.navItem}>
                            <NavLink className={style.link} to="/cart">
                                <CartSVG />
                            </NavLink>
                        </li>
                        <li className={style.navItem}>
                            <NavLink className={cn(style.link, style.like)} to="/favorite">
                                <LikeSVG />
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </Container>
        </div>
    )
}