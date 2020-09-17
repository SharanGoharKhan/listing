import React from 'react'
import { Image, View } from 'react-native'
import { TextDefault } from '../../../../components'
import { alignment } from '../../../../utilities'
import styles from './styles'

function Following() {

    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                <Image
                    style={styles.emptyImage}
                    source={require('../../../../assets/images/emptyView/followers.png')}
                />
                <TextDefault H4 center bold style={alignment.MTlarge}>
                    {"You are not following anyone yet."}
                </TextDefault>
                <TextDefault H5 center light style={alignment.MTsmall}>
                    {'Start following people you know or like and get notified when they post something new!'}
                </TextDefault>
            </View>
        )
    }

    return (
        <View style={[styles.flex, styles.mainContainer]}>
            {emptyView()}
        </View>
    )
}
export default React.memo(Following)