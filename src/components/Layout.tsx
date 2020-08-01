import React from 'react';
import { Layout } from 'antd';
import ProductList from './ProductList';

const { Header, Footer, Sider, Content } = Layout;

const AppLayout=()=>{
    return (
        <>
            <Layout>
                <Header>Product Management</Header>
                <Content>
                    <ProductList/>
                </Content>
                <Footer></Footer>
            </Layout>
        </>
    );
}

export default AppLayout;