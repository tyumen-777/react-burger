import React from 'react';
import { useSelector } from 'react-redux';
import styles from './IngredientDetails.module.css';

const IngredientDetails = (): JSX.Element => {
  const { currentIngredient } = useSelector((store: any) => store.burgerIngredient);
  const { image_large, name, calories, proteins, fat, carbohydrates } = currentIngredient;

  return (
    <div className={styles.wrapper}>
      <img src={image_large} alt="" />
      <p className="text text_type_main-medium mt-6 mb-10">{name}</p>
      <ul className={styles.description_wrapper}>
        <li>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{calories}</p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{proteins}</p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{fat}</p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
