import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { TextDefault } from '../../Text'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons'
import { colors, scale } from '../../../utilities'

function ModalHeader(props) {
    return (
        <View style={[styles.headerContainer, { borderBottomWidth: props.title ? StyleSheet.hairlineWidth : 0 }]}>
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