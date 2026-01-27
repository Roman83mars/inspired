import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import style from './Pagintaion.module.scss'
import { useSelector } from 'react-redux'
import cn from 'classnames'

export const Pagination = () => {
    const { pathname, search } = useLocation()
    const navigate = useNavigate()
    const { pages } = useSelector(state => state.goods)
    const query = new URLSearchParams(search)
    const currentPage = Number(query.get('page')) || 1

    const handlePageChange = (newPage => `${pathname}?page=${newPage}`)
    const handlePrevPage = () => {
        if (currentPage > 1) {
            navigate(handlePageChange(currentPage - 1))
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages) {
            navigate(handlePageChange(currentPage + 1))
        }
    }
    const renderPaginationItems = () => {
        const items = []
        let startPage = Math.max(1, Math.min(currentPage - 1, pages - 2))
        let endPage = Math.min(pages, startPage + 2)
        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <li key={i} className={style.item}>
                    <NavLink
                        to={handlePageChange(i)}
                        className={cn(style.link, { [style.linkActive]: i === currentPage })}
                    >
                        {i}
                    </NavLink>
                </li>
            )
        }
        return items
    }

    return (
        pages > 1 &&
        <div className={style.pagination}>
            <button
                className={style.arrow}
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
            >
                &lt;
            </button>
            <ul className={style.list}>{renderPaginationItems()}</ul>
            <button
                className={style.arrow}
                onClick={handleNextPage}
                disabled={currentPage >= pages}
            >
                &gt;
            </button>
        </div>
    )
}