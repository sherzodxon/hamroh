import React from 'react';
 import './index.scss'
import { useSelector } from 'react-redux';
const DraggableItem = ({time,name}) => {
   const browserClassname =useSelector((state)=>state.browserThemes.containerClassName)
    return (
       <li className={`draggable-item draggable-item__${browserClassname}`}>
          <p className="draggable-item__name">{name}</p>
          <p className="draggable-item__time">{time}</p>
       </li>
    );
}
  
export default DraggableItem;