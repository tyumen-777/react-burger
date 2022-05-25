import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { PropsWithChildren, ReactElement, useState } from 'react';
import { IData } from '../../utils/types';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import styles from './BurgerIngredients.module.css';

//Types
interface IBurgerIngredients {
  data: IData[];
  openIngredientsModal: any;
}

const BurgerIngredients = (props: IBurgerIngredients): JSX.Element => {
  const { data, openIngredientsModal } = props;
  const [currentTab, setCurrentTab] = useState<string>('bread');

  //Render
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={`${styles.tabs} pt-5`}>
        <Tab active={currentTab === 'bread'} value="bread" onClick={setCurrentTab}>
          Булки
        </Tab>
        <Tab active={currentTab === 'sauces'} value="sauces" onClick={setCurrentTab}>
          Соусы
        </Tab>
        <Tab active={currentTab === 'toppings'} value="toppings" onClick={setCurrentTab}>
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients}>
        <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
        <ul className={styles.list_ingredients}>
          {data.map((ingredient: IData) => {
            return (
              ingredient.type === 'bun' && (
                <BurgerIngredient key={ingredient._id} data={ingredient} openIngredientModal={openIngredientsModal} />
              )
            );
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={styles.list_ingredients}>
          {data.map(ingredient => {
            return (
              ingredient.type === 'sauce' && (
                <BurgerIngredient key={ingredient._id} data={ingredient} openIngredientModal={openIngredientsModal} />
              )
            );
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={styles.list_ingredients}>
          {data.map(ingredient => {
            return (
              ingredient.type === 'main' && (
                <BurgerIngredient key={ingredient._id} data={ingredient} openIngredientModal={openIngredientsModal} />
              )
            );
          })}
        </ul>
      </div>
    </div>
  );
};

//Добавлено из-за ошибок с типизацией
declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

export default BurgerIngredients;
