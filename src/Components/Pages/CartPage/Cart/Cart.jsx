import { Container, Modal } from '@components'
import style from './Cart.module.scss'
import { CartItem } from './CartItem/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, selectTotalPrice } from '@/store/features/cartSlice'
import cn from 'classnames'
import { useState } from 'react'

export const Cart = ({ cartItems, goodsList }) => {
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const totalPrice = useSelector(selectTotalPrice)

    const handleClearCart = () => {
        dispatch(clearCart())
        setIsModalOpen(false)
    }

    return (
        <section className={style.cart}>
            <Container>
                <h2 className={style.title}>Корзина</h2>
                {cartItems.length ?
                    <>
                        <ul className={style.list}>
                            {cartItems.map(item => (
                                <li
                                    key={`${item.id}-${item.color}-${item.size}`}
                                    className={style.item}
                                >
                                    <CartItem {...item} goodsList={goodsList} />
                                </li>
                            ))}
                        </ul>
                        <div className={style.cartFooter}>
                            <div className={style.actions}>
                                <button
                                    className={cn(style.clearBtn, style.button)}
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Очистить корзину
                                </button>
                            </div>
                            <div className={style.total}>
                                <p>Итого:</p>
                                <p>руб {totalPrice}</p>
                            </div>
                        </div>
                    </>
                    : <h3 className={style.empty}>В корзине пусто</h3>
                }
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleClearCart}
                    title="Очистка корзины"
                >
                    <p>Вы уверены, что хотите удалить все товары из корзины? Это действие нельзя отменить.</p>
                </Modal>
            </Container>
        </section>
    )
}