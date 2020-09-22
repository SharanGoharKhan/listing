import React from 'react'
import { Image, View } from 'react-native'
import { TextDefault } from '../../../components'
import { alignment } from '../../../utilities'
import styles from './styles'

function Invoices() {

    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                <Image
                    style={styles.emptyImage}
                    source={require('../../../assets/images/emptyView/invoice.png')}
                />
                <TextDefault H4 center bold style={alignment.MTlarge}>
                    {"You don't have invoices."}
                </TextDefault>
                <TextDefault H5 center light style={alignment.MTsmall}>
                    {"Haven't you tired our featured ads yet? Increase your views!"}
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
export default React.memo(Invoices)