import style from './Goods.module.scss'
import { Product, Container, Pagination, Preloader } from '@components'
import { useSelector } from 'react-redux'

export const Goods = ({ title }) => {
    const { goodsList, totalCount, status } = useSelector(state => state.goods)

    return (
        <section className={style.goods}>
            <Container>
                <h2 className={style.title}>
                    {title ?? 'Новинки'}
                    {totalCount && totalCount > 0 ? <sup>&nbsp;({totalCount})</sup> : ''}
                </h2>
                {status === 'loading' ? (
                    <Preloader />
                ) : (
                    <>
                        <ul className={style.list}>
                            {goodsList.map(item => (
                                <li key={item.id}>
                                    <Product {...item} />
                                </li>
                            ))}
                        </ul>
                        <Pagination />
                    </>
                )}
            </Container>
        </section>
    )
}