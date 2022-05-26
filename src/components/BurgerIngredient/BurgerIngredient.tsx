import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { IData } from '../../utils/types';
import styles from './BurgerIngredient.module.css';

//Types
interface IBurgerIngredientProps {
  data: IData;
  openIngredientModal: (data: IData) => void;
}

const BurgerIngredient = (props: IBurgerIngredientProps): JSX.Element => {
  const { data, openIngredientModal } = props;
  const handleOpenModal = () => {
    openIngredientModal(data);
  };

  //Render
  return (
    <li onClick={handleOpenModal}>
      <div className={styles.wrapper}>
        <img src={data.image} alt={data.name} />
        <div className={styles.price}>
          <p className="text text_type_digits-default mt-2 mb-2 mr-2">{data.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>{data.name}</p>
        <Counter count={1} size="default" />
      </div>
    </li>
  );
};

export default BurgerIngredient;
