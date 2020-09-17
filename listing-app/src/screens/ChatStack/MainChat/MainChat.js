import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FlashMessage, TextDefault } from '../../../components';
import { colors } from '../../../utilities';
import styles from './styles';

function MainChat() {

    return (
        <View style={styles.container}>
            <TextDefault textColor={colors.fontSecondColor}>
                {'Open up App.js to start working on your'}
            </TextDefault>
            <TouchableOpacity onPress={() => {
                FlashMessage({ message: "Hello", type: 'warning' })
            }}>
                <TextDefault textColor={colors.buttonbackground} bold H4 >
                    {'Click Here'}
                </TextDefault>
            </TouchableOpacity>
        </View>
    );
}

export default MainChat
