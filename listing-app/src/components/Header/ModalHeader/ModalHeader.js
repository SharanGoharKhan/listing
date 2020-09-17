import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { TextDefault } from '../../Text'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons'
import { colors, scale } from '../../../utilities'

function ModalHeader(props) {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerContents}>
                <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => {
                        props.closeModal()
                    }}>
                    <AntDesign
                        name="close"
                        size={scale(25)}
                        color={colors.headerText}
                    />
                </TouchableOpacity>
                <TextDefault textColor={colors.headerText} style={styles.title} bolder H3>
                    {props.title}
                </TextDefault>
            </View>
        </View>
    )
}
export default React.memo(ModalHeader)