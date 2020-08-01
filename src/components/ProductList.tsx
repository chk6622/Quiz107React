import React,{Component} from 'react';
import {connect} from 'react-redux';
import { queryProductAction,updateProductAction,addProductAction,updateProductParameterAction,deleteProductAction } from '../redux/ProductAction';
import { IProductProps } from '../redux/IProps';
import { ProductType,IProduct } from './Product';
import { Button,Input,Row,Col,Space,Popconfirm,Divider,Select,Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddProduct from './ProductAdd';

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
        const {nameQry,priceQry,typeQry,products,addData,deleteData,queryData} = this.props;
        console.log(products)
        return (
            <>
                    <div>
                        <Row>
                            <Col span={2}>
                                <AddProduct addData={addData}/>
                            </Col>
                            <Col span={22}>
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
                        </Row>
                        <Divider />
                        <Table dataSource={products}>
                            <Column title="Name" dataIndex="name" key="name"/>
                            <Column title="Price" dataIndex="price" key="price"/>
                            <Column title="Type" dataIndex="type" key="type"
                                    render={
                                        type=>ProductType[type]
                                    }
                            />
                            <Column title="Description" dataIndex="description" key="description"/>
                            <Column title="Action" key="action" 
                                    render={
                                        (text:any,product:any)=>(
                                            <Space>
                                                <Button size='middle'>Update</Button>
                                                
                                                <Popconfirm title="Are you sure delete this product?" onConfirm={()=>{deleteData(product.id)}} onCancel={()=>{}} okText="Yes" cancelText="No">
                                                    <Button size='middle'>Delete</Button>
                                                </Popconfirm>
                                            </Space>
                                        )
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
            debugger
            let action = updateProductParameterAction({[name]:value});
            dispatch(action);
        },
        addData(value:any){
            console.log(value);
            let action = addProductAction(value);
            dispatch(action);
        },
        updateData(){

        },
        deleteData(productId:string){
            let action = deleteProductAction(productId);
            dispatch(action);
        }
    }
}

export default connect(stateToProps,dispatchToAction)(ProductList);