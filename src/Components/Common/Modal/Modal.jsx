import style from './Modal.module.scss';

export const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className={style.overlay} onClick={onClose}>
            <div className={style.content} onClick={(e) => e.stopPropagation()}>
                <h3 className={style.title}>{title}</h3>
                <div className={style.body}>{children}</div>
                <div className={style.actions}>
                    <button className={style.cancel} onClick={onClose}>Отмена</button>
                    <button className={style.confirm} onClick={onConfirm}>Удалить</button>
                </div>
            </div>
        </div>
    );
}