import React, { useContext } from 'react';
import { Button } from 'antd';
import { UPDATE_OPEN_STATE } from './ProductPageStateReducer';
import { EditProductContext } from './ProductEdit';

export function EditButton() {
    const { dispatch }: any = useContext(EditProductContext);

    return (
        <Button size='middle'
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
            Update
        </Button>
    );
}
