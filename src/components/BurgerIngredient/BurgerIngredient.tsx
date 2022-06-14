import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getIngredientInfo, openModal } from '../../services/actions';
import { IData } from '../../utils/types';
import styles from './BurgerIngredient.module.css';
import { useDrag } from 'react-dnd';

//Types
interface IBurgerIngredientProps {
  ingredient: IData;
}

const BurgerIngredient = (props: IBurgerIngredientProps): JSX.Element => {
  const { ingredient } = props;
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(getIngredientInfo(ingredient));
    dispatch(openModal());
  };

  const [{ isDrag }, dragRef] = useDrag({
    type: 'dragIngredient',
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    }),
  });

  //Render

  return !isDrag ? (
    <li onClick={handleOpenModal} ref={dragRef}>
      <div className={styles.wrapper}>
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={styles.price}>
          <p className="text text_type_digits-default mt-2 mb-2 mr-2">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
        {/*// @ts-ignore*/}
        <Counter count={ingredient.count} size="default" />
      </div>
    </li>
  ) : (
    <></>
  );
};

export default BurgerIngredient;
