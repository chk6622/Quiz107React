import React,{Component} from 'react';
import {connect} from 'react-redux';
import { queryProductAction,updateProductAction,addProductAction,updateProductParameterAction,deleteProductAction } from '../../redux/ProductAction';
import { IProductProps } from '../../redux/IProps';
import { ProductType } from './Product';
import { Button,Input,Row,Col,Space,Popconfirm,Divider,Select,Table } from 'antd';
import AddProduct from './ProductAdd';
import EditProduct from './ProductEdit';
import AppAlert from '../AppAlert';

const {Option}=Select
const {Column}=Table;

class ProductList extends Component<IProductProps>{
    constructor(props:IProductProps){
        super(props);
        this.changeHandler=this.changeHandler.bind(this);
    }

    componentDidMount(){
        this.props.queryData();
    }

    changeHandler(event:any){
        let name = event.target.name;
        let value= event.target.value;
        this.props.updateQryParameters(name,value);
    }

    selectChangeHandler(name:string,value:string){

        this.props.updateQryParameters(name,value);
    }

    render(){
        const {nameQry,priceQry,products,addData,deleteData,updateData,queryData} = this.props;
        // console.log(products)
        return (
            <>
                    <div>
                        <Row>
                            <Col span={7}/>
                            <Col span={10}>
                                <AppAlert target='delete product'/>
                            </Col>
                            <Col span={7}/>
                        </Row>
                        <Row justify="space-between" align="bottom" style={{padding:2}}>
                            <Col span={6}/>
                            <Col span={2}>
                                <AddProduct addData={addData}/>
                            </Col>
                            <Col span={10}>
                                <Space>
                                    <Input id='nameQry' placeholder="Name"  name='nameQry' value={nameQry||''} onChange={this.changeHandler} />
                                
                                    <Input id='priceQry' placeholder="Price" name='priceQry' value={priceQry||''} onChange={this.changeHandler}/>
                                
                                    <Select placeholder="Product Type"  onChange={this.selectChangeHandler.bind(this,'typeQry')} allowClear>
                                        <Option value={ProductType.Hardware}>Hardware</Option>
                                        <Option value={ProductType.Software}>Software</Option>
                                    </Select>
                                    <Button type='primary' size='middle' onClick={queryData}>Query</Button>
                                </Space>
                            </Col> 
                            <Col span={6}/>                           
                        </Row>
                        <Divider style={{margin: 1}}/>
                        {/* {console.log(products)} */}
                        <Table dataSource={products} rowKey={product=>product.id}>
                            <Column title="Name" dataIndex="name" key="name"/>
                            <Column title="Price" dataIndex="price" key="price"/>
                            <Column title="Type" dataIndex="type" key="type"
                                    render={
                                        type=>ProductType[type]
                                    }
                            />
                            <Column title="Description" dataIndex="description" key="description"/>
                            <Column title="Action" key="id" 
                                    render={
                                        (text:any,product:any)=>{
                                            return (
                                                <Space>
                                                    <EditProduct updateData={updateData} product={product}/>
                                                    <Popconfirm title="Are you sure delete this product?" onConfirm={()=>{deleteData(product.id)}} onCancel={()=>{}} okText="Yes" cancelText="No">
                                                        <Button size='middle'>Delete</Button>
                                                    </Popconfirm>
                                                </Space>
                                            );
                                        }
                                    }
                            />
                        </Table>
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
        updateQryParameters(name:string,value:string){
            // debugger
            let action = updateProductParameterAction({[name]:value});
            dispatch(action);
        },
        addData(value:any){
            // console.log(value);
            let action = addProductAction(value);
            dispatch(action);
        },
        updateData(value:any){
            let action = updateProductAction(value);
            dispatch(action);
        },
        deleteData(productId:string){
            let action = deleteProductAction(productId);
            dispatch(action);
        }
    }
}

export default connect(stateToProps,dispatchToAction)(ProductList);