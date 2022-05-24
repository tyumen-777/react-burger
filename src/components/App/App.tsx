import React from 'react';
import { data } from '../../utils/data';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import styles from './App.module.css';

function App() {
  //Render
  return (
    <>
      <AppHeader />
      <div className={`${styles.wrapper} pt-10 pl-5 pr-5 pb-10`}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </div>
    </>
  );
}

export default App;
