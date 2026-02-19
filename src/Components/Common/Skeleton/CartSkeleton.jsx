import cn from 'classnames';
import style from './CartSkeleton.module.scss';

export const CartSkeleton = () => {
    return (
        <article className={style.item}>
            <div className={cn(style.image, style.skeleton)} />

            <div className={style.content}>
                <div className={cn(style.title, style.skeleton)} />
                <div className={cn(style.price, style.skeleton)} />
                <div className={cn(style.vendorCode, style.skeleton)} />
            </div>

            <div className={style.prop}>
                <div className={style.color}>
                    <div className={cn(style.subtitle, style.skeleton)} />
                    <div className={cn(style.colorItem, style.skeleton)} />
                </div>
                <div className={style.size}>
                    <div className={cn(style.subtitle, style.skeleton)} />
                    <div className={cn(style.sizeItem, style.skeleton)} />
                </div>
            </div>

            <div className={cn(style.count, style.skeleton)} />
        </article>
    );
}