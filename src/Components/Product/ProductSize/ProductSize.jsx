import style from './ProductSize.module.scss'

export const ProductSize = ({ size, selectedSize, handleSizeChange }) => {
    return (
        <div className={style.size}>
            <p className={style.title}>Размер</p>
            <div className={style.list}>
                {size?.map(item => (
                    <label key={item} className={style.item}>
                        <input
                            type="radio"
                            name="size"
                            className={style.input}
                            value={item}
                            checked={selectedSize === item}
                            onChange={handleSizeChange}
                        />
                        <span className={style.check}>{item}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}