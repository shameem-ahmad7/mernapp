import React, { createContext, useContext, useReducer } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
switch(action.type){
    case "ADD":
        return[...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}]
    default:
        console.log("Error in Reducer")
}
}

export const CardProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CardProvider>
            <Router>
                <CartDispatchContext.Provider value={dispatch}>
                    <CartStateContext.Provider value={state}>
                        {children}
                    </CartStateContext.Provider>
                </CartDispatchContext.Provider>
            </Router>
        </CardProvider>
    )
}

export const  useCart=()=> useContext(CartStateContext);
export const useDispatchCart=()=>useContext(CartDispatchContext);