import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, View } from 'react-native';
import { EmptyButton, TextDefault } from '../../../../components';
import { alignment, colors } from '../../../../utilities';
import styles from './styles';

function Favourite() {
    const navigation = useNavigation()
    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                <Image
                    style={styles.emptyImage}
                    source={require('../../../../assets/images/emptyView/favourite.png')}
                />
                <TextDefault H4 center bold style={alignment.MTlarge}>
                    {"You haven't liked anything yet."}
                </TextDefault>
                <TextDefault H5 center light style={alignment.MTsmall}>
                    {"Mark the items that you like and share it with the world!"}
                </TextDefault>
                <EmptyButton
                    title='Dicover'
                    onPress={() => navigation.navigate('Main')}
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

export default React.memo(Favourite)