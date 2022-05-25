import React from 'react';
import styles from './ModalOverlay.module.css';

interface IModalOverlay {
  openModal: boolean;
  closeModal: () => void;
}

const ModalOverlay = ({ openModal, closeModal }: IModalOverlay): JSX.Element => {
  return <div onClick={closeModal} className={`${styles.modal_overlay} ${openModal ? styles.opened : ''}`}></div>;
};

export default ModalOverlay;
