import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteConstructorIngredient, moveConstructorIngredient } from '../../services/actions';
import styles from './ConstructorItem.module.css';
import { useDrag, useDrop } from 'react-dnd';

interface ConstructorItemProps {
  index: number;
  ingredient: any;
}

const ConstructorItem: FC<ConstructorItemProps> = ({ index, ingredient }) => {
  const dispatch = useDispatch();
  const id = ingredient._id;
  const ref = useRef<any>(null);

  const [, drop] = useDrop({
    accept: 'constructor',
    hover(item: any, monitor) {
      const [dragIndex, hoverIndex] = [item.index, index];
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: any = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      dispatch(moveConstructorIngredient({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'constructor',
    item: { id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  const opacity = isDragging ? 0 : 1;

  return (
    <div className={styles.ingredients} style={{ opacity }}>
      <li className={styles.ingredient} ref={ref}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={ingredient.name}
          thumbnail={ingredient.image}
          price={ingredient.price}
          handleClose={() => dispatch(deleteConstructorIngredient(ingredient.ingredientId))}
        />
      </li>
    </div>
  );
};

export default ConstructorItem;
