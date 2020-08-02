import Mock from 'mockjs';
import { ProductType } from '../components/product/Product';


export class MockData {
    private static instance: MockData = new MockData();

    public mockData: any = null;

    private constructor() {
        this.mockData = Mock.mock({
            "products|10": [{
                "id|+1": 1,
                "name|1": ['Product1', 'Product2', 'Product3', 'Product4', 'Product5', 'Product6', 'Product7', 'Product8', 'Product9', 'Product10'],
                "price|18-28.1": 25,
                "type|1": [ProductType.Hardware, ProductType.Software],
                "description|5-15": "abc"
            }]
        });
    }

    public static getInstance(): MockData {
        return MockData.instance;
    }
}
