import React from 'react'
import ActionButton from 'react-native-action-button'
import { Icon } from 'react-native-elements'
import { APP_COLORS } from '../../styles/colors'


const ButtonAddTask = ({onPressCallBack}) => {
    return (
        <ActionButton 
            buttonColor= {APP_COLORS.primaryAction}
            icon= {<Icon color={APP_COLORS.primaryText} name={'add'} />}
            onPress={() => onPressCallBack()}
        />
    )
};


export default ButtonAddTask;