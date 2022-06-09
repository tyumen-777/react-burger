import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { Dispatch, SetStateAction, useContext, useEffect, useReducer } from 'react';
import { BurgerIngredientsContext } from '../../contexts/BurgerIngredientsContext';
import { BASE_URL } from '../../utils/constants';
import styles from './BurgerConstructor.module.css';

//Types
interface BurgerConstructorProps {
  openModal: () => void;
  setOrderNumber: Dispatch<SetStateAction<number>>;
}

interface State {
  count: number;
}

interface Action {
  type: string;
  payload: number;
}

const BurgerConstructor = (props: BurgerConstructorProps): JSX.Element => {
  const { openModal, setOrderNumber } = props;
  const data = useContext(BurgerIngredientsContext);
  const bun = data.find(i => i.type === 'bun');
  const totalPriceInitialState = { totalPrice: 0 };

  // console.log(JSON.stringify(data.map(i => i._id)));

  // @ts-ignore
  const [totalPriceState, totalPriceDispatcher] = useReducer(reducer, totalPriceInitialState, undefined);

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case 'count':
        return { totalPrice: data.reduce((acc, curr) => acc + curr.price, 0) };
      default:
        throw new Error('Something goes wrong');
    }
  }

  const getBunPrice = () => {
    if (bun) {
      return bun.price * 2;
    } else {
      return 0;
    }
  };

  const handleCreateOrder = async () => {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ingredients: data.map(i => i._id) }),
    });
    if (res.ok) {
      const data = await res.json();
      setOrderNumber(data.order.number);
    } else {
      console.log(res.status);
    }
  };

  useEffect(() => {
    // @ts-ignore
    totalPriceDispatcher({ type: 'count' });
  }, [data]);

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
          <p className="text text_type_digits-medium mr-2">{totalPriceState.totalPrice + getBunPrice()}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            handleCreateOrder();
            openModal();
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
