import { ReactNode } from 'react';
import styles from "./Modal.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    {children}
                    <button className={styles.closeButton} onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};


