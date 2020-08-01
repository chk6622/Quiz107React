import React,{useState} from 'react';
import { Button,Input,Row,Col,Space,Popconfirm,Divider,Select,Table,Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProductType } from './Product';

const {Option}=Select;
const {TextArea}=Input;

export default function AddProduct(props:any){
    const [open,setOpen]:any = useState(false);
    const [name,setName]:any = useState('');
    const [price,setPrice]:any = useState('');
    const [type,setType]:any = useState('');
    const [description,setDescription]:any = useState('');


    const handleOk=()=>{
        let product={
            name,
            price,
            type,
            description
        }
        props.addData(product);
    }

    return (
        <>
                <Button icon={<PlusOutlined/>} size='middle' type='primary' onClick={()=>{setOpen(!open)}}></Button>
                <Modal
                    title="Add Product"
                    visible={open}
                    onOk={handleOk}
                    onCancel={()=>setOpen(!open)}
                    maskClosable={false}
                    >
                    <p>
                        <Input id='name' placeholder="Name"  name='name' value={name} onChange={(e)=>{setName(e.target.value)}} />
                    </p>
                    <p>
                        <Input id='price' placeholder="Price"  name='price' value={price} onChange={(e)=>{setPrice(e.target.value)}} />
                    </p>
                    <p>
                        <Select placeholder="Product Type"  onChange={(val)=>{setType(val)}} allowClear>
                            <Option value={ProductType.Hardware}>Hardware</Option>
                            <Option value={ProductType.Software}>Software</Option>
                        </Select>
                    </p>
                    <p>
                        <TextArea rows={4} 
                            id='description' 
                            placeholder="Description"  
                            name='description' 
                            value={description} 
                            onChange={(e)=>{setDescription(e.target.value)}}/>
                    </p>
                </Modal>
        </>
    );

}

