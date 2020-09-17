import React from 'react'
import { Image, View } from 'react-native'
import { TextDefault } from '../../../../components'
import { alignment } from '../../../../utilities'
import styles from './styles'

function Followers() {

    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                <Image
                    style={styles.emptyImage}
                    source={require('../../../../assets/images/emptyView/followers.png')}
                />
                <TextDefault H4 center bold style={alignment.MTlarge}>
                    {"You don't have followers yet."}
                </TextDefault>
                <TextDefault H5 center light style={alignment.MTsmall}>
                    {'Chat, post or start following somebody so they can follow you.'}
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
export default React.memo(Followers)