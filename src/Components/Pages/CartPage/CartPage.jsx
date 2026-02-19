import { useDispatch, useSelector } from "react-redux"
import { Cart } from "./Cart/Cart"
import { Order } from "./Order/Order"
import { OrderModal } from "./OrderModal/OrderModal"
import { useEffect } from "react"
import { fetchAll } from "@/store/features/goodsSlice"
import { selectCartIds } from "@/store/features/cartSlice"
import { CartSkeleton } from "@components"

export const CartPage = () => {
    const { cartItems, orderStatus } = useSelector(state => state.cart)
    const { goodsList, status } = useSelector(state => state.goods)
    const dispatch = useDispatch()
    const cartIds = useSelector(selectCartIds)

    useEffect(() => {
        if (cartIds.length > 0) {
            dispatch(fetchAll({ list: cartIds }))
        }
    }, [cartIds, dispatch])

    return status === 'loading' && !goodsList.length ? (
        <ul>
            {[...Array(3)].map((_, i) => (
                <li key={i}>
                    <CartSkeleton />
                </li>
            ))}
        </ul>
    ) : (
        <>
            <Cart cartItems={cartItems} goodsList={goodsList} />
            {!!cartItems.length && <Order cartItems={cartItems} />}
            {orderStatus === 'succeeded' && <OrderModal />}
        </>
    )
}