import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { PropsWithChildren, ReactElement, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { IData } from '../../utils/types';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import styles from './BurgerIngredients.module.css';

const BurgerIngredients = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<string>('buns');
  const ingredients = useSelector((store: any) => store.burgerIngredients.ingredients);
  const constructorIngredients: [] = useSelector((store: any) => store.constructorOfOrder.constructorIngredients);
  const isBun = useSelector((store: any) => store.constructorOfOrder.isBuns);
  const buns = document.getElementById('buns')!;
  const sauces = document.getElementById('sauces')!;
  const toppings = document.getElementById('toppings')!;
  const ingredientsHeader = document.getElementById('ingredients')!;

  //Handlers
  const handleChangeTab = (e: string) => {
    setCurrentTab(e);
    document.getElementById(e)?.scrollIntoView({ behavior: 'smooth' });
  };
  const onScrollIngredient = () => {
    const bunsPos = Math.abs(buns.getBoundingClientRect().top - ingredientsHeader.getBoundingClientRect().top);
    const saucePos = Math.abs(sauces.getBoundingClientRect().top - ingredientsHeader.getBoundingClientRect().top);
    const fillingPos = Math.abs(toppings.getBoundingClientRect().top - ingredientsHeader.getBoundingClientRect().top);

    if (bunsPos < saucePos && bunsPos < fillingPos) {
      setCurrentTab('buns');
    }
    if (saucePos < bunsPos && saucePos < fillingPos) {
      setCurrentTab('sauces');
    }
    if (fillingPos < bunsPos && fillingPos < saucePos) {
      setCurrentTab('toppings');
    }
  };

  const ingredientCount = useMemo(() => {
    return ingredients.map((ingredient: any) => {
      ingredient.count = constructorIngredients.filter((item: any) => item._id === ingredient._id).length;
      if (isBun && isBun._id === ingredient._id) ingredient.count += 2;
      return ingredient;
    });
  }, [ingredients, constructorIngredients, isBun]);

  //Render
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={`${styles.tabs} pt-5`}>
        <Tab active={currentTab === 'buns'} value="buns" onClick={e => handleChangeTab(e)}>
          Булки
        </Tab>
        <Tab active={currentTab === 'sauces'} value="sauces" onClick={e => handleChangeTab(e)}>
          Соусы
        </Tab>
        <Tab active={currentTab === 'toppings'} value="toppings" onClick={e => handleChangeTab(e)}>
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients} id="ingredients" onScroll={onScrollIngredient}>
        <h2 className="text text_type_main-medium mt-10 mb-6" id="buns">
          Булки
        </h2>
        <ul className={styles.list_ingredients}>
          {ingredientCount.map((ingredient: IData) => {
            return ingredient.type === 'bun' && <BurgerIngredient key={ingredient._id} ingredient={ingredient} />;
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" id="sauces">
          Соусы
        </h2>
        <ul className={styles.list_ingredients}>
          {ingredientCount.map((ingredient: IData) => {
            return ingredient.type === 'sauce' && <BurgerIngredient key={ingredient._id} ingredient={ingredient} />;
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" id="toppings">
          Начинки
        </h2>
        <ul className={styles.list_ingredients}>
          {ingredientCount.map((ingredient: IData) => {
            return ingredient.type === 'main' && <BurgerIngredient key={ingredient._id} ingredient={ingredient} />;
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
