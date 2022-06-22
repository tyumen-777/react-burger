import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, closeOrderModal, getIngredients, openOrderModal } from '../../services/actions';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const { ingredients, ingredientsRequest } = useSelector((store: any) => store.burgerIngredients);
  const { isOrderModalOpened, isModalOpened } = useSelector((store: any) => store.modal);
  const { order } = useSelector((store: any) => store.order);
  const { currentIngredient } = useSelector((store: any) => store.burgerIngredient);

  useEffect(() => {
    // @ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

  //Handlers
  const openModalOrder = (): void => {
    dispatch(openOrderModal());
  };
  const closeModalOrder = (): void => {
    dispatch(closeOrderModal());
  };
  const closeIngredientModal = (): void => {
    dispatch(closeModal());
  };

  if (!ingredients.length) return null;

  //Render
  return (
    <>
      <AppHeader />
      <div className={`${styles.wrapper} pt-10 pl-5 pr-5 pb-10`}>
        <DndProvider backend={HTML5Backend}>
          {ingredientsRequest ? (
            <div>Loading...</div>
          ) : (
            <>
              <BurgerIngredients />
              <BurgerConstructor openModal={openModalOrder} />
            </>
          )}
        </DndProvider>
      </div>
      {currentIngredient && (
        <Modal openModal={isModalOpened} closeModal={closeIngredientModal} title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      )}
      <Modal openModal={isOrderModalOpened} closeModal={closeModalOrder}>
        <OrderDetails orderNumber={order?.order.number} />
      </Modal>
    </>
  );
}

export default App;
