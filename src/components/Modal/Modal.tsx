import React, { ReactElement, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
const modalRoot = document.getElementById('modal')!;

interface IModal {
  openModal: boolean;
  closeModal: () => void;
  title?: string;
  children: ReactElement;
}

const Modal = (props: IModal): JSX.Element => {
  const { openModal, closeModal, title, children } = props;

  //Handlers
  const onEscapeClose = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        closeModal();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onEscapeClose);
    return () => document.removeEventListener('keydown', onEscapeClose);
  }, [onEscapeClose]);

  //Render
  return ReactDOM.createPortal(
    <>
      <div className={`${styles.popup} ${openModal ? styles.popup_opened : ''}`}>
        <div className={`${styles.title_wrapper} mt-10 ml-10 mr-10`}>
          <h2 className="text text_type_main-large">{title}</h2>
          <CloseIcon type="primary" onClick={closeModal} />
        </div>
        {children}
      </div>
      <ModalOverlay openModal={openModal} closeModal={closeModal} />
    </>,
    modalRoot,
  );
};

export default Modal;
