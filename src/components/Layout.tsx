import React from 'react';
import { Layout } from 'antd';
import ProductList from './product/ProductList';

const { Header, Content } = Layout;

const AppLayout=()=>{
    return (
        <>
            <Layout>
                <Header>Product Management</Header>
                <Content>
                    <ProductList/>
                </Content>
                {/* <Footer></Footer> */}
            </Layout>
        </>
    );
}

export default AppLayout;