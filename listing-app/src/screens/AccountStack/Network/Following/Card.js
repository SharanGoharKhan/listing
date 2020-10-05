import React, { useState } from 'react'
import { Image, View, TouchableOpacity } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { TextDefault, UnfollowModal } from '../../../../components'
import { alignment, colors, scale } from '../../../../utilities'
import styles from './styles'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

function Card(props) {
    const [modalVisible, setModalVisible] = useState(false)
    const navigation = useNavigation()

    function onModalToggle() {
        setModalVisible(prev => !prev)
    }
    return (
        <>
            <View style={styles.userContainer}>
                <TouchableOpacity activeOpacity={1}
                    onPress={() => navigation.navigate('UserProfile')} style={styles.avatar}>
                    <Image style={styles.img} source={props.img} />
                </TouchableOpacity >
                <TextDefault textColor={colors.buttonbackground} bold style={[alignment.PLmedium, styles.flex]}>
                    {props.name}
                </TextDefault>
                <BorderlessButton
                    style={alignment.Psmall}
                    onPress={onModalToggle}>
                    <Feather name="user-check" size={scale(20)} color="black" />
                </BorderlessButton>
            </View>
            <UnfollowModal modalVisible={modalVisible} onModalToggle={onModalToggle} name={props.name} />
        </>
    )
}

export default React.memo(Card)