import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, View, TouchableOpacity } from 'react-native';
import { EmptyButton, TextDefault } from '../../../../components';
import { alignment, colors } from '../../../../utilities';
import styles from './styles';

function Ads() {
    const navigation = useNavigation()
    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                <Image
                    style={styles.emptyImage}
                    source={require('../../../../assets/images/emptyView/ads.png')}
                />
                <TextDefault H4 center bold style={alignment.MTlarge}>
                    {"You haven't listed anything yet."}
                </TextDefault>
                <TextDefault H5 center light style={alignment.MTsmall}>
                    {"Let go og what you don't use anymore"}
                </TextDefault>
                <EmptyButton
                    title='Start selling'
                />
            </View>
        )
    }

    return (
        <View style={[styles.flex, styles.mainContainer]}>
            {emptyView()}
        </View>
    )
}

export default React.memo(Ads)