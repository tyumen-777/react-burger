import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './AppHeader.module.css';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={`${styles.list_item} pr-5 pl-5 pt-4 pb-4`}>
            <BurgerIcon type="primary" />
            <a href="/">
              <p className="text text_type_main-default p-2">Конструктор</p>
            </a>
          </li>
          <li className={`${styles.list_item} pr-5 pl-5 pt-4 pb-4`}>
            <ListIcon type="secondary" />
            <a href="/">
              <p className="text text_type_main-default p-2">Лента заказов</p>
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <Logo />
      </div>
      <nav>
        <ul className={styles.list}>
          <li className={styles.list_item}>
            <ProfileIcon type="primary" />
            <a href="/">
              <p className="text text_type_main-default p-2">Личный кабинет</p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
