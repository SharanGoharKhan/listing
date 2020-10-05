import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextDefault } from '../../Text'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons'
import { colors, scale } from '../../../utilities'
import { BorderlessButton } from 'react-native-gesture-handler'

function ModalHeader(props) {
    return (
        <View style={[styles.headerContainer, { borderBottomWidth: props.title ? StyleSheet.hairlineWidth : 0 }]}>
            <View style={styles.headerContents}>
                <BorderlessButton
                    style={styles.closeBtn}
                    onPress={() => {
                        props.closeModal()
                    }}>
                    <AntDesign
                        name="close"
                        size={scale(25)}
                        color={colors.headerText}
                    />
                </BorderlessButton>
                {props.title &&
                    <TextDefault textColor={colors.headerText} style={styles.title} bolder H3>
                        {props.title}
                    </TextDefault>
                }
            </View>
        </View>
    )
}
export default React.memo(ModalHeader)