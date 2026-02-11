import { useDispatch, useSelector } from 'react-redux'
import style from './Search.module.scss'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Container } from '@components'
import { toggleSearch } from '@/store/features/searchSlice'

export const Search = () => {
    const { openSearch } = useSelector(state => state.search)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const initialValues = {
        search: ''
    }
    const validationSchema = Yup.object({
        search: Yup.string().required('Введите параметры поиска')
    })

    const handleSubmit = ({ search }, { resetForm }) => {
        if (search.trim()) {
            navigate(`/search?q=${search}`);
            resetForm();
            dispatch(toggleSearch(false));
        }
    };

    return (
        openSearch && (
            <div className={style.search}>
                <Container>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className={style.form}>
                            <Field
                                className={style.input}
                                type="search"
                                name="search"
                                placeholder="Найти..."
                            />
                            <ErrorMessage
                                name='search'
                                component={'p'}
                                className={style.error}
                            />
                            <button className={style.btn} type='submit'>Искать</button>
                        </Form>
                    </Formik>
                </Container>
            </div>
        )
    )
}