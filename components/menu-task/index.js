import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { Button } from 'react-native-elements'
import Modal from 'react-native-modal'
import { style } from './style'

const MenuTask = ({isVisible, onDisapearCallBack, onDeleteCallBack, onChangeStatusCallBack}) => {
    return (
        <TouchableWithoutFeedback onPress={() => onDisapearCallBack()}>
        
            <Modal 
                isVisible={isVisible}
                animationIn={'zoomInDown'}
                animationOut={'zoomOutUp'}
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTansitionInTiming={1000}
                backdropTansitionOutTiming={1000}
            >

                <TouchableWithoutFeedback>

                    <View style={style.modal}>

                        <View style={style.textView}>
                            <Text>Que souhaitez vous faire sur la tâche ?</Text>
                        </View>

                        <View style={style.buttonView}>
                            <Button
                                buttonStyle={style.buttonDelete}
                                title="Supprimer" 
                                onPress={() => onDeleteCallBack() } 
                                />
                            <Button
                                buttonStyle={style.buttonChangeStatus}
                                title="Changer Status"  
                                onPress={() => onChangeStatusCallBack() } 
                                />
                        </View>

                    </View>

                </TouchableWithoutFeedback>
                
            </Modal>

        </TouchableWithoutFeedback>
    )
}

export default MenuTask;