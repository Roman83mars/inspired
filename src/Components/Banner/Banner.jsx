import { NavLink } from 'react-router-dom'
import { Container } from '@components'
import style from './Banner.module.scss'
import { API_URL } from '@/const'
import { useMedia } from 'react-use'

export const Banner = ({ data }) => {
    const isMobile = useMedia('(max-width: 540px)')
    const isTablet = useMedia('(max-width: 768px)')
    const isLaptop = useMedia('(max-width: 1024px)')
    const deviceBg = isMobile ? data?.bg.mobile
        : isTablet ? data?.bg.tablet
            : isLaptop ? data?.bg.laptop
                : data?.bg.desktop;
    const bgURL = `${API_URL}/${deviceBg}`

    return (
        data &&
        <section
            className={style.banner}
            style={{
                backgroundImage: `url(${bgURL})`
            }}
        >
            <Container>
                <div className={style.content}>
                    <h2 className={style.title}>{data.description}</h2>
                    <NavLink className={style.link} to={`/product/${data.id}`}>
                        Перейти
                    </NavLink>
                </div>
            </Container>
        </section>
    )
}