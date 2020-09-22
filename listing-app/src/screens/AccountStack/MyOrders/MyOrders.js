import React from 'react'
import { Image, View } from 'react-native'
import { TextDefault } from '../../../components'
import { alignment } from '../../../utilities'
import styles from './styles'

function MyOrders() {

    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                <Image
                    style={styles.emptyImage}
                    source={require('../../../assets/images/emptyView/investigate.png')}
                />
                <TextDefault H4 center bold style={alignment.MTlarge}>
                    {"Nothing Here...."}
                </TextDefault>
                <TextDefault H5 center light style={alignment.MTsmall}>
                    {"You don't have any packages."}
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
export default React.memo(MyOrders)