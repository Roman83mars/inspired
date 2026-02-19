import cn from 'classnames';
import style from './ProductSkeleton.module.scss';

export const ProductSkeleton = () => (
    <div className={style.card}>
        <div className={cn(style.image, style.shimmer)} />
        <div className={cn(style.title, style.shimmer)} />
        <div className={cn(style.price, style.shimmer)} />
    </div>
)