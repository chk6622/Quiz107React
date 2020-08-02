import React,{createContext,useReducer} from 'react';
import { reducer, initState } from './ProductPageStateReducer';
import { AddButton } from './AddButton';
import { AddForm } from './AddForm';



export const AddProductContext=createContext({});

export const AddProductProvider = (props:any) => {
    const [productPage,dispatch]:any = useReducer(reducer,initState);
    return (
        <AddProductContext.Provider value={{productPage,dispatch}}>
            {props.children}
        </AddProductContext.Provider>
    )
}

export default function AddProduct(props:any){

    return (
        <>
                <AddProductProvider>
                    <AddButton/>
                    <AddForm addData={props.addData}/>
                </AddProductProvider>
                
        </>
    );

}

