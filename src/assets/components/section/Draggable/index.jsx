import React, { useCallback } from "react";
import {useState, useEffect, useRef} from "react";
import "./index.scss";
import DraggableItem from "../../DraggableItem";
import btnDown from "../../../img/chevron-down.svg";
import btnUp from "../../../img/chevron.svg"
import { useSelector } from "react-redux";

function Draggable({data}) {
    const menuRef = useRef(null);
    const [isResizing,setIsResizing] = useState(false);
    const [menuHeight,setMenuHeight] = useState(250);
    const [isOpen,setOpen]=useState(true);
    const browserClassname =useSelector((state)=>state.browserThemes.containerClassName)
    const startResizing = useCallback(() => {
        setIsResizing(true)
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false)
    }, []);

    const resize = useCallback((mouseMoveEvent) => {
        if (isResizing) {
            setMenuHeight(Math.abs(mouseMoveEvent.clientY - menuRef.current.getBoundingClientRect().bottom));
             //console.log(mouseMoveEvent.changedTouches[0].clientY);
             //console.log();
             setMenuHeight(Math.abs(mouseMoveEvent.changedTouches[0].clientY-menuRef.current.getBoundingClientRect().top)  )
        }
    }, [isResizing]);

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        window.addEventListener("touchmove",resize);
        window.addEventListener("touchstart",stopResizing );
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
            window.addEventListener("touchmove",resize);
            window.addEventListener("touchstart",stopResizing );
        };
    }, [resize, stopResizing]);

    useEffect(() => {
        if (menuHeight<=100) {
            setOpen(true);
          }
          else if(menuHeight>=100){
            setOpen(false)
          }
    }, [menuHeight]);

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        window.addEventListener("touchmove",resize);
        window.addEventListener("touchstart",stopResizing );
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
            window.addEventListener("touchmove",resize);
            window.addEventListener("touchstart",stopResizing )
        };
    }, [resize, stopResizing]);

    function handleClickMenu() {
      if (menuHeight<=100) {
        setMenuHeight(300);
        setOpen(true);
      }
      else if(menuHeight>=100){
        setMenuHeight(50);
        setOpen(false)
      }
    }
    
    
    return (
        <div onMouseDownCapture={startResizing} onTouchStart={()=>startResizing} ref={menuRef} style={{height: menuHeight}} className={`draggable draggable__${browserClassname}`}>
          <button className="draggable__button" onClick={handleClickMenu}><img src={isOpen?btnUp:btnDown} alt="btn" /></button>
            <ul  className="draggable__list">        
              {data?.timings.map((el) =><DraggableItem key={el.id} name={el.name} time={el.time}/>)
              }
            </ul>
        </div>
    );
}

export default Draggable;
