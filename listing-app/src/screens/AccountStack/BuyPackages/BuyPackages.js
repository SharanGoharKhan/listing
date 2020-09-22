import React from 'react'
import { Image, View } from 'react-native'
import { TextDefault } from '../../../components'
import { alignment } from '../../../utilities'
import styles from './styles'

function BuyPackages() {

    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                <Image
                    style={styles.emptyImage}
                    source={require('../../../assets/images/emptyView/under-construction.png')}
                />
                <TextDefault H4 center bold style={alignment.MTlarge}>
                    {"Comming Soon...."}
                </TextDefault>
                <TextDefault H5 center light style={alignment.MTsmall}>
                    {"This feature is under-construction."}
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
export default React.memo(BuyPackages)