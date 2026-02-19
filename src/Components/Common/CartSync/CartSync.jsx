import { useFormikContext } from 'formik';
import { useEffect, useRef } from 'react';

export const CartSync = ({ cartItems, productId }) => {
    const { values, setFieldValue } = useFormikContext();
    const countRef = useRef(values.count);

    useEffect(() => {
        countRef.current = values.count;
    }, [values.count]);
    useEffect(() => {
        if (!values.color || !values.size) return;
        const itemInCart = cartItems.find(item =>
            item.id === productId &&
            item.color === values.color &&
            item.size === values.size
        );
        if (itemInCart && itemInCart.count !== countRef.current) {
            setFieldValue('count', itemInCart.count);
        }
        if (!itemInCart && countRef.current !== 1) {
            setFieldValue('count', 1);
        }
    }, [values.color, values.size, cartItems, productId, setFieldValue]);

    return null;
};