import { NavLink, useLocation, useParams } from 'react-router-dom'
import style from './Gender.module.scss'
import cn from 'classnames'
import { useSelector } from 'react-redux'

export const Gender = () => {
    const { activeGender, genderList, categories } = useSelector(state => state.navigation)
    const { pathname } = useLocation()
    const { product } = useSelector(state => state.product)
    const { id } = useParams()

    return (
        <ul className={style.gender}>
            {genderList.map(gender => {
                const targetPath = `/catalog/${gender}`
                const isDefaultPath = pathname === '/' && gender === activeGender
                const isProductGenderActive = id && product?.gender === gender
                const isExactPath = pathname === targetPath || isDefaultPath

                return ((
                    <li key={gender} className={style.item}>
                        <NavLink
                            className={({ isActive }) =>
                                cn(
                                    style.link,
                                    (isActive || isDefaultPath || isProductGenderActive) && style.linkActive,
                                    isExactPath && style.linkDisabled)}
                            to={targetPath}
                        >
                            {categories[gender]?.title}
                        </NavLink>
                    </li>
                ))
            })}
        </ul>
    )
}