import React from 'react'
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { TASK } from '../../model/index';
import { APP_COLORS } from '../../styles/colors';

const TaskList = ({taskList, onPressCallBack, onLongPressCallBack}) => {
    return (
        <View>
            {
                taskList.map(task => (
                <ListItem
                    key={task.id}
                    title={task.content}
                    bottomDivider
                    onPress={() => onPressCallBack(task)}
                    onLongPress = {() => onLongPressCallBack(task)}
                    badge={{
                        value: task.status,
                        badgeStyle: (
                            task.status === TASK.todoStatus 
                            ? {backgroundColor : APP_COLORS.accent} 
                            : {backgroundColor : APP_COLORS.lightPrimaryColor}
                        )                        
                    }}
                />
                ))
            }
        </View>
    )
}

export default TaskList