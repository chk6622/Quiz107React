import React, { useContext } from 'react';
import { Input, Select, Modal } from 'antd';
import { ProductType } from './Product';
import { UPDATE_OPEN_STATE, UPDATE_PRODUCT_STATE } from './ProductPageStateReducer';
import { AddProductContext } from './ProductAdd';
import AppAlert from '../AppAlert';

const {Option}=Select;
const {TextArea}=Input;

export function AddForm(props: any) {
    const { productPage, dispatch }: any = useContext(AddProductContext);
    const handleOk = () => {
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

    return (
        <Modal
            title="Add Product"
            visible={productPage.open}
            onOk={handleOk}
            onCancel={handleCancel}
            maskClosable={false}
        >
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
                    }} />
            </p>
            <p>
                <Input id='price' placeholder="Price" name='price' value={productPage.price}
                    onChange={(e) => {
                        let newState:any = {}
                        newState.price = e.target.value;
                        dispatch({
                            type: UPDATE_PRODUCT_STATE,
                            value: newState
                        });
                    }} />
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
                    }}
                >
                    <Option value={ProductType.Hardware}>Hardware</Option>
                    <Option value={ProductType.Software}>Software</Option>
                </Select>
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
                    }} />
            </p>
        </Modal>
    );
}
