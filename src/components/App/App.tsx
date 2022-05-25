import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../utils/constants';
import { IData } from '../../utils/types';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from './App.module.css';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderModalOpened, setIsOrderModalOpened] = useState<boolean>(false);
  const [isIngredientModalOpened, setIsIngredientModalOpened] = useState<boolean>(false);
  const [ingredientDetails, setIngredientDetails] = useState<IData>();

  const getIngredients = async () => {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setIngredients(data.data);
      setIsLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getIngredients();
  }, []);

  //Handlers
  const openOrderModal = (): void => {
    setIsOrderModalOpened(true);
  };
  const closeOrderModal = (): void => {
    setIsOrderModalOpened(false);
  };
  const openIngredientModal = (ingredientDetails: any): void => {
    setIngredientDetails(ingredientDetails);
    setIsIngredientModalOpened(true);
  };
  const closeIngredientModal = (): void => {
    setIsIngredientModalOpened(false);
  };

  //Render
  return (
    <>
      <AppHeader />
      <div className={`${styles.wrapper} pt-10 pl-5 pr-5 pb-10`}>
        {isLoading ? (
          <>
            <BurgerIngredients data={ingredients} openIngredientsModal={openIngredientModal} />
            <BurgerConstructor data={ingredients} openModal={openOrderModal} />
          </>
        ) : (
          <div>Loading.....</div>
        )}
      </div>
      {ingredientDetails && (
        <Modal openModal={isIngredientModalOpened} closeModal={closeIngredientModal} title="Детали ингредиента">
          <IngredientDetails ingredientDetails={ingredientDetails} />
        </Modal>
      )}
      <Modal openModal={isOrderModalOpened} closeModal={closeOrderModal}>
        <OrderDetails />
      </Modal>
    </>
  );
}

export default App;
