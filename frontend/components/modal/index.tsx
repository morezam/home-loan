import ReactModal from 'react-modal';
import styles from './modal.module.css';
ReactModal.setAppElement('#__next');

interface ModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	children: React.ReactNode;
}

const Modal = ({ children, isOpen, onRequestClose }: ModalProps) => {
	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className={styles.modal}
			overlayClassName={styles.overlay}>
			{children}
		</ReactModal>
	);
};

export default Modal;
