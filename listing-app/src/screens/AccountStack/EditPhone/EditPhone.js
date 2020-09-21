import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { Image, TextInput, TouchableOpacity, View } from 'react-native'
import { EmptyButton, TextDefault } from '../../../components'
import { alignment, colors, scale } from '../../../utilities'
import styles from './styles'
import { Entypo } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

function EditPhone() {
    const navigation = useNavigation()
    const [phone, setPhone] = useState('')
    const [focus, setFocus] = useState(false)
    const [adColor, setAdColor] = useState(colors.fontThirdColor)

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => null
        })
    }, [navigation])

    function validate() {
        if (phone.length > 0)
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
                        {'Verify your phone'}
                    </TextDefault>
                    <TextDefault textColor={colors.fontSecondColor} style={[alignment.MTsmall, alignment.PLsmall]}>
                        {'We will send a confirmation code to your phone'}
                    </TextDefault>
                    <View style={styles.phoneRow}>
                        <View style={styles.countryBox}>
                            <TextDefault textColor={colors.fontThirdColor}>
                                {'Country'}
                            </TextDefault>
                            <TextDefault H5 style={[alignment.PBxSmall, alignment.PTxSmall]}>
                                {'+92'}
                            </TextDefault>
                        </View>
                        <View style={[styles.numberBox, { borderColor: adColor }]}>
                            <TextDefault textColor={adColor}>
                                {(focus || phone.length > 0) ? 'Phone Number' : ''}
                            </TextDefault>
                            <TextInput style={styles.flex}
                                placeholder={focus ? '' : 'Phone Number'}
                                placeholderTextColor={colors.fontThirdColor}
                                value={phone}
                                keyboardType={'phone-pad'}
                                onFocus={() => {
                                    setFocus(true)
                                    setAdColor(colors.selectedText)
                                }}
                                onBlur={() => {
                                    setFocus(false)
                                    setAdColor(colors.fontThirdColor)
                                }}
                                onChangeText={text => setPhone(text)}
                            />
                        </View>
                    </View>
                </View >
                <View style={styles.buttonView}>
                    <EmptyButton
                        disabled={phone.length < 1}
                        title='Next'
                        onPress={validate} />
                </View>
            </View >
        </SafeAreaView >
    )
}

export default React.memo(EditPhone)