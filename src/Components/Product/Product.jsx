import { NavLink } from 'react-router-dom'
import style from './Product.module.scss'
import { API_URL } from '@/const'
import Like from '@/assets/heart.svg?react'
import { ColorList } from '../ColorList/ColorList'

export const Product = ({ id, pic, title, price, colors, description }) => {
    return (
        <article className={style.product}>
            <NavLink className={style.link} to={`/product/${id}`}>
                <img
                    className={style.image}
                    src={`${API_URL}/${pic}`}
                    alt={`${title} - ${description}`}
                />
                <h3 className={style.title}>
                    {title}
                </h3>
            </NavLink>
            <div className={style.row}>
                <p className={style.price}>руб {price}</p>
                <button>
                    <Like />
                </button>
            </div>
            <ColorList colors={colors} />
        </article>
    )
}