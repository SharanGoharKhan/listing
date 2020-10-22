import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState, useContext } from 'react'
import {
    Image, Switch, Text, TextInput, View, KeyboardAvoidingView, Keyboard, TouchableOpacity,
    PixelRatio, StyleSheet
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CountryPicker from 'react-native-country-picker-modal';
import { EmptyButton, ModalHeader, TextDefault } from '../../../components'
import { alignment, colors, scale, textStyles, fontStyles } from '../../../utilities'
import styles from './styles'


function EditPhone() {
    const navigation = useNavigation()
    const [phone, setPhone] = useState('')
    const [focus, setFocus] = useState(false)
    const [margin, marginSetter] = useState(false)
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(prev => !prev);
    const [adColor, setAdColor] = useState(colors.fontThirdColor)
    const [countryCode, setCountryCode] = useState('PK')
    const [callingCode, setCallingCode] = useState('')
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
        <SafeAreaView style={[styles.flex, styles.safeAreaView]}>
            <KeyboardAvoidingView contentContainerStyle={alignment.PBlarge} style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableOpacity activeOpacity={1}
                    style={[styles.flex, styles.mainContainer]}
                    onPress={() => Keyboard.dismiss()}>
                    <ModalHeader closeModal={() => navigation.goBack()} />
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
                        {/* <View style={stylesCountry.container}>
                            
                        </View> */}
                        <View style={styles.phoneRow}>
                            <View style={styles.countryBox}>
                                <CountryPicker
                                    containerButtonStyle={[alignment.PTsmall, alignment.PBxSmall]}
                                    countryCode={countryCode}
                                    withCallingCode
                                    withAlphaFilter
                                    withFilter
                                    withCallingCodeButton
                                    onSelect={(value) => {
                                        console.log(value)
                                        setCountryCode(value.cca2)
                                        setCallingCode(value.callingCode[0])
                                        alert(value.callingCode[0])
                                    }}
                                    cca2={countryCode}
                                    translation='eng'

                                />
                            </View>
                            <View style={[styles.numberBox, { borderColor: adColor }]}>
                                <TextDefault textColor={adColor}>
                                    {(focus || phone.length > 0) ? 'Phone Number' : ''}
                                </TextDefault>
                                <TextInput
                                 style={[styles.flex, alignment.PBxSmall,textStyles.H5]}
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
                        <View style={styles.smallContainer}>
                            <TextDefault H5 bold style={styles.flex}>
                                {'Show my phone number in ads'}
                            </TextDefault>
                            <Switch
                                trackColor={{ false: colors.headerbackground, true: colors.buttonbackground }}
                                thumbColor={colors.containerBox}
                                ios_backgroundColor={colors.headerbackground}
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </View >
                    <View style={styles.buttonView}>
                        <EmptyButton
                            disabled={phone.length < 1}
                            title='Save'
                            onPress={validate} />
                    </View>
                </TouchableOpacity >
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

const stylesCountry = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        fontSize: 12,
        textAlign: 'center',
        color: '#888',
        marginBottom: 5,
    },
    data: {
        padding: 15,
        marginTop: 10,
        backgroundColor: '#ddd',
        borderColor: '#888',
        borderWidth: 1 / PixelRatio.get(),
        color: '#777'
    }
});

export default React.memo(EditPhone)