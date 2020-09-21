import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { Image, TextInput, TouchableOpacity, View } from 'react-native'
import { EmptyButton, TextDefault } from '../../../components'
import { alignment, colors, scale } from '../../../utilities'
import styles from './styles'
import { Entypo } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

function EditEmail() {
    const navigation = useNavigation()
    const [Email, setEmail] = useState('')
    const [focus, setFocus] = useState(false)
    const [adColor, setAdColor] = useState(colors.fontThirdColor)

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => null
        })
    }, [navigation])

    function validate() {
        if (Email.length > 0)
            return navigation.goBack()
    }

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.flex}>
            <View style={[styles.flex, styles.mainContainer]}>
                <View style={[styles.flex, styles.basicInfoContainer]}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.imgResponsive}
                            source={require('../../../assets/images/avatar.png')}
                            resizeMode='cover'
                        />
                    </View>
                    <TextDefault textColor={colors.fontMainColor} bold H4 style={[alignment.MTlarge, alignment.PLsmall]}>
                        {'Enter your Email'}
                    </TextDefault>
                    <View style={[styles.numberBox, { borderColor: adColor }]}>
                        <TextDefault textColor={adColor}  style={alignment.MBxSmall}>
                            {(focus || Email.length > 0) ? 'Email' : ''}
                        </TextDefault>
                        <TextInput
                        style={alignment.PBxSmall}
                            placeholder={focus ? '' : 'Email'}
                            placeholderTextColor={colors.fontThirdColor}
                            value={Email}
                            keyboardType={'phone-pad'}
                            onFocus={() => {
                                setFocus(true)
                                setAdColor(colors.selectedText)
                            }}
                            onBlur={() => {
                                setFocus(false)
                                setAdColor(colors.fontThirdColor)
                            }}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>
                </View >
                <View style={styles.buttonView}>
                    <EmptyButton
                        disabled={Email.length < 1}
                        title='Next'
                        onPress={validate} />
                </View>
            </View >
        </SafeAreaView >
    )
}

export default React.memo(EditEmail)