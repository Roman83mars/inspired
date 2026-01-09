import { NavLink, useLocation } from 'react-router-dom'
import style from './Category.module.scss'
import cn from 'classnames'

export const Category = ({ list }) => {
    const location = useLocation()
    let i
    if (location.pathname.startsWith('/men')) {
        i = 1
    } else {
        i = 0
    }

    return (
        <ul className={style.category}>
            {list[i].categories.map(item => (
                <li key={item.link} className={style.item}>
                    <NavLink className={({ isActive }) => cn(style.link, isActive && style.linkActive)} to={`${list[i].link}/${item.link}`}>
                        {item.title}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}