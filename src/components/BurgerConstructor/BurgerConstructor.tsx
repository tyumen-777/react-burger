import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { IData } from '../../utils/types';
import styles from './BurgerConstructor.module.css';

//Types
interface IBurgerConstructor {
  data: IData[];
  openModal: () => void;
}

const BurgerConstructor = (props: IBurgerConstructor): JSX.Element => {
  const { data, openModal } = props;
  const bun = data.find(i => i.type === 'bun');

  //Render
  return (
    <div className={styles.wrapper}>
      <div className="ml-4 mt-4">
        <ConstructorElement
          text={`${bun!.name} (верх)`}
          thumbnail={data[0].image}
          price={bun!.price}
          type="top"
          isLocked
        />
      </div>
      <ul className={styles.ingredients_list}>
        {data.map((i, index) => {
          return i.type === 'bun' ? (
            ''
          ) : (
            <div className={styles.ingredients} key={index}>
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
          text={`${bun!.name} (низ)`}
          thumbnail={data[0].image}
          price={bun!.price}
          type="bottom"
          isLocked
        />
      </div>
      <div className={`${styles.order_wrapper} mt-10`}>
        <div className={styles.price_wrapper}>
          <p className="text text_type_digits-medium mr-2">{bun && bun.price}</p>
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
