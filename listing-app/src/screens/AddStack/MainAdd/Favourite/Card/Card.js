import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { TextDefault } from '../../../../../components';
import { colors, scale } from '../../../../../utilities';
import ConfigurationContext from '../../../../../context/configuration'
import styles from '../styles';

function Card(props) {
    const navigation = useNavigation()
    const configuration = useContext(ConfigurationContext)
    return (
        <TouchableOpacity activeOpacity={1}
            style={styles.productCardContainer}
            onPress={() => navigation.navigate('ProductDescription', { screen: 'ProductDescription', params: { product: props } })}>
            <View style={styles.topCardContainer}>
                <Image
                    source={{ uri: props.images[0] }}
                    resizeMode="cover"
                    style={styles.imgResponsive}
                />
                <View activeOpacity={0}
                    style={styles.heartContainer}>
                    <FontAwesome name="heart" size={scale(20)} color={colors.buttonbackground} />
                </View>
            </View>
            <View style={styles.botCardContainer}>
                <TextDefault numberOfLines={2} textColor={colors.fontMainColor}>
                    {props.title}
                </TextDefault>
                <TextDefault textColor={colors.fontMainColor}>
                    {configuration.currencySymbol} {props.price}
                </TextDefault>
            </View>
        </TouchableOpacity>
    )
}

export default React.memo(Card)