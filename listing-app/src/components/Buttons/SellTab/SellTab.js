import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, scale } from '../../../utilities';
import styles from './styles';

function SellTab() {

    return (
        <View
            activeOpacity={0.7}
            style={StyleSheet.compose(styles.emptyButton)}>
            <FontAwesome name='plus' size={scale(20)} color={colors.buttonbackground} />
        </View>
    )
}

export default React.memo(SellTab)