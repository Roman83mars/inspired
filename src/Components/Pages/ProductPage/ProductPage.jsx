import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '@/store/features/productSlice'
import { fetchCategory } from '@/store/features/goodsSlice'
import { addToCart } from '@/store/features/cartSlice'
import { API_URL } from '@/const'
import style from './ProductPage.module.scss'
import cn from 'classnames'
import { Container, Count, Goods, BtnLike, Preloader } from '@components'
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
    const [isAdded, setIsAdded] = useState(false)
    const { product, status } = useSelector(state => state.product)
    const { colorList } = useSelector(state => state.color)

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
        if (!isAdded) return;
        const timeout = setTimeout(() => setIsAdded(false), 2000);
        return () => clearTimeout(timeout);
    }, [isAdded])

    const handleSubmit = (values) => {
        dispatch(addToCart({ id, ...values }));
        setIsAdded(true);
    }

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
                        initialValues={{ color: '', size: '', count: 1 }}
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
                                            handleInc={() => setFieldValue('count', values.count + 1)}
                                            handleDec={() => setFieldValue('count', values.count - 1)}
                                        />
                                        <button
                                            className={cn(style.addCart, isAdded && style.addCartSuccess)}
                                            type='submit'
                                            disabled={isAdded}
                                        >
                                            {isAdded ? 'Добавлено!' : 'В корзину'}
                                        </button>
                                        <BtnLike id={id} />
                                    </div>
                                    {isAdded && <p className={style.successText}>Товар успешно добавлен в корзину</p>}
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