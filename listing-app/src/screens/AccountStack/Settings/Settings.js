import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { TextDefault } from '../../../components'
import { alignment, colors, scale } from '../../../utilities'
import { Entypo } from '@expo/vector-icons'

function Settings() {
    return (
        <View style={[styles.flex, styles.mainContainer]}>
            <TouchableOpacity style={styles.smallContainer}>
                <View style={[styles.flex]}>
                    <TextDefault bold H5 style={alignment.PLlarge}>
                        {'Recommendations'}
                    </TextDefault>
                    <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                        {'Recommendations & speical communications'}
                    </TextDefault>
                </View>
                <Entypo name="chevron-small-right" size={scale(30)} color={colors.buttonbackground} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallContainer}>
                <View style={[styles.flex]}>
                    <TextDefault bold H5 style={alignment.PLlarge}>
                        {'Privacy'}
                    </TextDefault>
                    <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                        {'Phone number visibility'}
                    </TextDefault>
                </View>
                <Entypo name="chevron-small-right" size={scale(30)} color={colors.buttonbackground} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallContainer}>
                <TextDefault bold H5 style={alignment.PLlarge}>
                    {'Logout'}
                </TextDefault>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallContainer}>
                <TextDefault bold H5 style={alignment.PLlarge}>
                    {'Logout from all devices'}
                </TextDefault>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallContainer}>
                <TextDefault bold H5 style={alignment.PLlarge}>
                    {'Deactivate account and delete my data'}
                </TextDefault>
            </TouchableOpacity>
        </View>
    )
}
export default React.memo(Settings)