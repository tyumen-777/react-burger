import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useReducer } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { addConstructorIngredient, createOrder } from '../../services/actions';
import ConstructorItem from '../ConstructorItem/ConstructorItem';
import styles from './BurgerConstructor.module.css';

//Types
interface BurgerConstructorProps {
  openModal: () => void;
}

interface State {
  count: number;
}

interface Action {
  type: string;
  payload: number;
}

const BurgerConstructor = (props: BurgerConstructorProps): JSX.Element => {
  const { openModal } = props;
  const { isBuns, constructorIngredients, bunId } = useSelector((store: any) => store.constructorOfOrder);
  const totalPriceInitialState = { totalPrice: 0 };
  const dispatch = useDispatch();

  const ingredients = constructorIngredients.map((i: any) => i._id).concat(bunId);

  // @ts-ignore
  const [totalPriceState, totalPriceDispatcher] = useReducer(reducer, totalPriceInitialState, undefined);

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case 'count':
        return { totalPrice: constructorIngredients.reduce((acc: any, curr: any) => acc + curr.price, 0) };
      default:
        throw new Error('Something goes wrong');
    }
  }

  const getBunPrice = () => {
    if (isBuns) {
      return isBuns.price * 2;
    } else {
      return 0;
    }
  };

  const [, dropTarget] = useDrop({
    accept: 'dragIngredient',
    drop(ingredient) {
      dispatch(addConstructorIngredient(ingredient));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  });

  const handleCreateOrder = () => {
    // @ts-ignore
    dispatch(createOrder(ingredients));
  };

  useEffect(() => {
    // @ts-ignore
    totalPriceDispatcher({ type: 'count' });
  }, [constructorIngredients]);

  //Render
  return (
    <div className={styles.wrapper} id="dropTarget" ref={dropTarget}>
      <div className="ml-4 mt-4">
        {isBuns && (
          <ConstructorElement
            text={`${isBuns.name} (верх)`}
            thumbnail={isBuns.image}
            price={isBuns.price}
            type="top"
            isLocked
          />
        )}
      </div>
      <ul className={styles.ingredients_list}>
        {constructorIngredients &&
          constructorIngredients.map((i: any, index: number) => {
            return i.type === 'bun' ? '' : <ConstructorItem index={index} ingredient={i} key={i.ingredientId} />;
          })}
      </ul>
      <div className="ml-4">
        {isBuns && (
          <ConstructorElement
            text={`${isBuns.name} (низ)`}
            thumbnail={isBuns.image}
            price={isBuns.price}
            type="bottom"
            isLocked
          />
        )}
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
          disabled={!isBuns}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
