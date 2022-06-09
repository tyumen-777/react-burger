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
import { BurgerIngredientsContext } from '../../contexts/BurgerIngredientsContext';

function App() {
  const [ingredients, setIngredients] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOrderModalOpened, setIsOrderModalOpened] = useState<boolean>(false);
  const [isIngredientModalOpened, setIsIngredientModalOpened] = useState<boolean>(false);
  const [ingredientDetails, setIngredientDetails] = useState<IData>();
  const [orderNumber, setOrderNumber] = useState<number>(0);

  const getIngredients = async (): Promise<void> => {
    const res = await fetch(`${BASE_URL}/ingredients`);
    if (res.ok) {
      const data = await res.json();
      setIngredients(data.data);
      setIsLoading(true);
    } else {
      console.log(res.status);
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
  const openIngredientModal = (ingredientDetails: IData): void => {
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
      <BurgerIngredientsContext.Provider value={ingredients}>
        <div className={`${styles.wrapper} pt-10 pl-5 pr-5 pb-10`}>
          {isLoading ? (
            <>
              <BurgerIngredients openIngredientsModal={openIngredientModal} />
              <BurgerConstructor openModal={openOrderModal} setOrderNumber={setOrderNumber} />
            </>
          ) : (
            <div>Loading.....</div>
          )}
        </div>
      </BurgerIngredientsContext.Provider>
      {ingredientDetails && (
        <Modal openModal={isIngredientModalOpened} closeModal={closeIngredientModal} title="Детали ингредиента">
          <IngredientDetails ingredientDetails={ingredientDetails} />
        </Modal>
      )}
      <Modal openModal={isOrderModalOpened} closeModal={closeOrderModal}>
        <OrderDetails orderNumber={orderNumber} />
      </Modal>
    </>
  );
}

export default App;
