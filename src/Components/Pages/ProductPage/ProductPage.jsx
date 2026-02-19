import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { fetchProduct } from '@/store/features/productSlice'
import { fetchCategory } from '@/store/features/goodsSlice'
import { addToCart } from '@/store/features/cartSlice'
import { API_URL } from '@/const'
import style from './ProductPage.module.scss'
import cn from 'classnames'
import { Container, Count, Goods, BtnLike, Preloader, CartSync } from '@components'
import { ColorList } from '@components/Product/ColorList/ColorList'
import { ProductSize } from '@components/Product/ProductSize/ProductSize'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    color: Yup.string().required('Выберите цвет'),
    size: Yup.string().required('Выберите размер'),
    count: Yup.number().required(),
})

export const ProductPage = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [infoMessage, setInfoMessage] = useState('')
    const [messageType, setMessageType] = useState('success')
    const { product, status } = useSelector(state => state.product)
    const { cartItems } = useSelector(state => state.cart)
    const { colorList } = useSelector(state => state.color)
    const [searchParams] = useSearchParams()
    const colorFromUrl = searchParams.get('color');
    const sizeFromUrl = searchParams.get('size')

    useEffect(() => {
        dispatch(fetchProduct(id)).unwrap().then((res) => {
            dispatch(fetchCategory({
                gender: res.gender,
                category: res.category,
                count: 4,
                top: true,
                exclude: id
            }));
        })
    }, [id, dispatch])
    useEffect(() => {
        if (!infoMessage) return;
        const timeout = setTimeout(() => setInfoMessage(''), 2000);
        return () => clearTimeout(timeout);
    }, [infoMessage])

    const handleSubmit = (values) => {
        const isAlreadyInCart = cartItems.find(item =>
            item.id === id &&
            item.color === values.color &&
            item.size === values.size
        )
        if (isAlreadyInCart) {
            setMessageType('info');
            setInfoMessage('Товар уже добавлен в корзину');
            return;
        }
        dispatch(addToCart({ id, ...values }));
        setMessageType('success');
        setInfoMessage('Товар добавлен в корзину!')
    }
    const syncWithRedux = (values, newCount) => {
        const isAlreadyInCart = cartItems.find(item =>
            item.id === id && item.color === values.color && item.size === values.size
        );
        if (isAlreadyInCart) {
            dispatch(addToCart({ id, ...values, count: newCount }));
        }
    }

    const isBtnDisabled = status === 'loading' || !!infoMessage

    return status === 'loading' ? (
        <Preloader />
    ) : !product.id ? null : (
        <>
            <section className={style.card}>
                <Container className={style.container}>
                    <img
                        className={style.image}
                        src={`${API_URL}/${product.pic}`}
                        alt={`${product.title} - ${product.description}`}
                    />
                    <Formik
                        initialValues={{ color: colorFromUrl || '', size: sizeFromUrl || '', count: 1 }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ values, errors, touched, setFieldValue }) => {
                            if (!values.color && product.colors?.length > 0 && colorList.length > 0) {
                                const firstColorId = product.colors[0];
                                const colorObj = colorList.find(c => c.id === firstColorId);
                                if (colorObj) {
                                    setFieldValue('color', colorObj.title);
                                }
                            }
                            return (
                                <Form className={style.content} >
                                    <CartSync cartItems={cartItems} productId={id} />
                                    <h2 className={style.title}>{product.title}</h2>
                                    <p className={style.price}>руб {product.price}</p>

                                    <div className={style.vendorCode}>
                                        <span className={style.subtitle}>Артикул</span>
                                        <span className={style.id}>{product.id}</span>
                                    </div>
                                    <div className={style.color}>
                                        <p className={cn(style.subtitle, style.colorTitle)}>Цвет</p>
                                        <ColorList
                                            colors={product.colors}
                                            selectedColor={values.color}
                                            handleColorChange={(e) => setFieldValue('color', e.target.value)}
                                        />
                                        {errors.color && touched.color && <p className={style.errorMessage}>{errors.color}</p>}
                                    </div>
                                    <ProductSize
                                        size={product.size}
                                        selectedSize={values.size}
                                        handleSizeChange={(e) => setFieldValue('size', e.target.value)}
                                    />
                                    {errors.size && touched.size && <p className={style.errorMessage}>{errors.size}</p>}
                                    <div className={style.description}>
                                        <p className={cn(style.subtitle, style.descriptionTitle)}>Описание</p>
                                        <p className={style.descriptionText}>{product.description}</p>
                                    </div>
                                    <div className={style.control}>
                                        <Count
                                            className={style.count}
                                            count={values.count}
                                            handleInc={() => {
                                                const newCount = values.count + 1;
                                                setFieldValue('count', newCount);
                                                syncWithRedux(values, newCount);
                                            }}
                                            handleDec={() => {
                                                const newCount = values.count - 1;
                                                setFieldValue('count', newCount);
                                                syncWithRedux(values, newCount);
                                            }}
                                        />
                                        <button
                                            className={cn(
                                                style.addCart,
                                                infoMessage && messageType === 'success' && style.addCartSuccess,
                                                infoMessage && messageType === 'info' && style.addCartInfo
                                            )}
                                            type='submit'
                                            disabled={isBtnDisabled}
                                        >
                                            {infoMessage ? 'Готово' : 'В корзину'}
                                        </button>
                                        {infoMessage && (
                                            <p className={cn(style.message, style[messageType])}>
                                                {infoMessage}
                                            </p>
                                        )}
                                        <BtnLike id={id} />
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </Container>
            </section >
            <Goods title='Вам также может понравиться' />
        </>
    )
}