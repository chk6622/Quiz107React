import React,{createContext,useReducer} from 'react';
import { reducer, initState } from './ProductPageStateReducer';
import { EditButton } from './EditButton';
import { EditForm } from './EditForm';



export const EditProductContext=createContext({});

export const EditProductProvider = (props:any) => {
    const [productPage,dispatch]:any = useReducer(reducer,initState);

  

    return (
        <EditProductContext.Provider value={{productPage,dispatch}}>
            {props.children}
        </EditProductContext.Provider>
    )
}

export default function EditProduct(props:any){

    
    
    return (
        <>
                <EditProductProvider>
                    <EditButton/>
                    <EditForm updateData={props.updateData}  product={props.product}/>
                </EditProductProvider>
                
        </>
    );

}

