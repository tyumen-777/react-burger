import React from 'react';
import { IData } from '../../utils/types';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';

//Types
interface IBurgerConstructor {
  data: IData[];
  openModal: () => void;
}

const BurgerConstructor = (props: IBurgerConstructor): JSX.Element => {
  const { data, openModal } = props;
  return (
    <div className={styles.wrapper}>
      <div className="ml-4 mt-4">
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          thumbnail={data[0].image}
          price={20}
          type="top"
          isLocked
        />
      </div>
      <ul className={styles.ingredients_list}>
        {data.map(i => {
          return i.type === 'bun' ? (
            ''
          ) : (
            <div className={styles.ingredients} key={i._id}>
              <DragIcon type="primary" />
              <li className={styles.ingredient}>
                <ConstructorElement text={i.name} thumbnail={i.image} price={i.price} />
              </li>
            </div>
          );
        })}
      </ul>
      <div className="ml-4">
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          thumbnail={data[0].image}
          price={20}
          type="bottom"
          isLocked
        />
      </div>
      <div className={`${styles.order_wrapper} mt-10`}>
        <div className={styles.price_wrapper}>
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
