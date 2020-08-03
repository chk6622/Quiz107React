import React, { useContext,useEffect } from 'react';
import { Form, Input, InputNumber, Select, Modal } from 'antd';
import { ProductType, IAddOrUpdateProductPageState } from './Product';
import { UPDATE_OPEN_STATE, UPDATE_PRODUCT_STATE } from './ProductPageStateReducer';
import { AddProductContext } from './ProductAdd';
import AppAlert from '../AppAlert';
import { useForm } from "react-hook-form";


const {Option}=Select;
const {TextArea}=Input;

export function AddForm(props: any) {
    const { productPage, dispatch }: any = useContext(AddProductContext);
    const { register, handleSubmit, errors, setValue } = useForm<IAddOrUpdateProductPageState>();

    const handleOk = (e:any) => {
        console.log(e)
        let product = {
            name: productPage.name,
            price: productPage.price,
            type: productPage.type,
            description: productPage.description
        };
        props.addData(product);
    };

    const handleCancel = () => {
        let newState:any = {}
        newState.open = false;
        dispatch({ type: UPDATE_OPEN_STATE, value: newState });
    };

    useEffect(
        ()=>{
            register({name:"name"},{required: true});
            register({name:"price"},{required: true});
            register({name:"type"},{required: true});
            register({name:"description"},{minLength: 10,maxLength: 100});
        },
        [register]
    )

    return (
        
        <Modal
            title="Add Product"
            visible={productPage.open}
            onOk={handleSubmit(handleOk)}
            onCancel={handleCancel}
            maskClosable={false}
        >
            <Form>
            <p>
                <AppAlert target='add product'/>
            </p>

            <p>
                
            <Input id='name' placeholder="Name" name='name' value={productPage.name}
                    onChange={(e) => {
                        let newState:any = {}
                        newState.name = e.target.value;
                        dispatch({
                            type: UPDATE_PRODUCT_STATE,
                            value: newState
                        });
                        setValue("name",e.target.value);
                    }}
                />
            
                {errors.name&&errors.name.type==='required'&&<li className='Error'>Name is required</li>}
            </p>
            
            <p>
                <InputNumber  id='price' placeholder="Price" name='price' value={productPage.price} min={0} max={10000}
                    onChange={(val) => {
                        let newState:any = {}
                        newState.price = val;
                        dispatch({
                            type: UPDATE_PRODUCT_STATE,
                            value: newState
                        });
                        let validVal=val===(undefined||null)?'':val+'';
                        // console.log(val+'-----'+typeof(val));
                        setValue("price",validVal);
                    }} />
                {errors.price&&errors.price.type==='required'&&<li className='Error'>Price is required</li>}
            </p>
            <p>
                <Select placeholder="Product Type" allowClear
                    onChange={(val) => {
                        let newState:any = {}
                        newState.type = val;
                        dispatch({
                            type: UPDATE_PRODUCT_STATE,
                            value: newState
                        });
                        let validVal=val===undefined?'':val+'';
                        // console.log(val+'-----'+typeof(val));
                        setValue("type",validVal);
                    }}
                >
                    <Option value={ProductType.Hardware}>Hardware</Option>
                    <Option value={ProductType.Software}>Software</Option>
                </Select>
                {errors.type&&errors.type.type==='required'&&<li className='Error'>Type is required</li>}
            </p>
            <p>
                <TextArea rows={4}
                    id='description'
                    placeholder="Description"
                    name='description'
                    value={productPage.description}
                    onChange={(e) => {
                        let newState:any = {}
                        newState.description = e.target.value;
                        dispatch({
                            type: UPDATE_PRODUCT_STATE,
                            value: newState
                        });
                        setValue("description",e.target.value);
                    }} />
                {errors.description&&(errors.description.type==='minLength'||errors.description.type==='maxLength')
                                    &&<li className='Error'>The length of description must be more than 10 characters and less than 100 characters</li>}
            </p>
            </Form>
        </Modal>
    );
}
