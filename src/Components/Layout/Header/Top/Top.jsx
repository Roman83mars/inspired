import { Container } from '@components'
import style from './Top.module.scss'
import cn from 'classnames'
import logo from '@assets/svg/logo.svg'
import LikeSVG from '@assets/svg/heart.svg?react'
import SearchSVG from '@assets/svg/search.svg?react'
import CartSVG from '@assets/svg/cart.svg?react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSearch } from '@/store/features/searchSlice'

export const Top = () => {
    const { countItems } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const handleOpenSearch = () => {
        dispatch(toggleSearch())
    }

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
                            <button className={style.link} onClick={handleOpenSearch}>
                                <SearchSVG />
                            </button>
                        </li>
                        <li className={style.navItem}>
                            <NavLink className={style.link} to="/cart">
                                <CartSVG />
                                <span className={style.linkCount}>{countItems}</span>
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