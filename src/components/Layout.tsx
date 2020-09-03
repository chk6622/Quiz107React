import React from 'react';
import { Layout } from 'antd';
import ProductList from './product/ProductList';
import Formtest from './product/Formtest';

const { Header, Content } = Layout;

const AppLayout=()=>{
    return (
        <>
            <Layout>
                <Header>Product Management</Header>
                <Content>
                    <Formtest/>
                </Content>
                {/* <Footer></Footer> */}
            </Layout>
        </>
    );
}

export default AppLayout;