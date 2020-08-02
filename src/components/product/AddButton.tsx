import React, { useContext } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UPDATE_OPEN_STATE } from './ProductPageStateReducer';
import { AddProductContext } from './ProductAdd';

export function AddButton() {
    const { dispatch }: any = useContext(AddProductContext);

    return (
        <Button icon={<PlusOutlined />} size='middle' type='primary'
            onClick={() => {
                let newState={open:true};
                dispatch(
                    {
                        type: UPDATE_OPEN_STATE,
                        value: newState
                    }
                );
            }}
        >
        </Button>
    );
}
