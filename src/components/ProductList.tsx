import React,{Component} from 'react';
import {connect} from 'react-redux';
import { queryProductAction,updateProductAction,addProductAction,updateProductParameterAction,deleteProductAction } from '../redux/ProductAction';
import { IProductProps } from '../redux/IProps';
import { IProduct } from './Product';

class ProductList extends Component<IProductProps>{
    constructor(props:IProductProps){
        super(props);
    }

    componentDidMount(){
        this.props.queryData();
    }

    render(){
        const {nameQry,priceQry,typeQry,products} = this.props;
        console.log(products)
        return (
            <>
                <div>
                    Product List
                    <div>
                        {products?.map(
                            (product:IProduct)=>
                            <div>
                                <li>{product.id}</li>
                                <li>{product.name}</li>
                                <li>{product.price}</li>
                                <li>{product.description}</li>
                            </div>
                            
                        )}
                    </div>
                </div>
            </>
        );
    }
}

const stateToProps=(state:any)=>{
    return{
            nameQry:state.ProductReducer.nameQry,
            priceQry:state.ProductReducer.priceQry,
            typeQry:state.ProductReducer.typeQry,
            products:state.ProductReducer.products
        }
}

const dispatchToAction=(dispatch:any)=>{
    return {
        queryData(){
            
            let action = queryProductAction();
            dispatch(action);
        },
        updateQryParameters(){

        },
        addData(){

        },
        updateData(){

        },
        deleteData(){

        }
    }
}

export default connect(stateToProps,dispatchToAction)(ProductList);