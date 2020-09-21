import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { Image, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import { BackButton, DisconnectButton, EmptyButton, RightButton, TextDefault } from '../../../components'
import { alignment, colors, scale } from '../../../utilities'
import styles from './styles'
import { Entypo } from '@expo/vector-icons';

const phone = ''
const email = ''

function EditProfile() {
    const navigation = useNavigation()
    const [adColor, setAdColor] = useState(colors.fontThirdColor)
    const [descriptionColor, setDescriptionColor] = useState(colors.fontMainColor)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [nameError, setNameError] = useState(null)
    const [descriptionError, setDescriptionError] = useState(null)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: null,
            headerBackImage: () =>
                BackButton({ iconColor: colors.headerText, icon: 'close' }),
            headerRight: () => <RightButton iconColor={colors.headerText} icon='text' title='Save' onPress={() => navigation.goBack()}
            />
        })
    }, [navigation])
    return (
        <ScrollView style={[styles.flex, styles.mainContainer]}>
            <View style={styles.basicInfoContainer}>
                <TextDefault textColor={colors.fontMainColor} bold H4 style={alignment.MTlarge}>
                    {'Basic information'}
                </TextDefault>
                <View style={styles.upperContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.imgResponsive}
                            source={require('../../../assets/images/avatar.png')}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={[styles.subContainer, styles.flex]}>
                        <TextDefault textColor={nameError ? colors.google : adColor} bold style={styles.width100}>
                            {'Enter Name *'}
                        </TextDefault>
                        <View style={[styles.textContainer, { borderColor: adColor }]}>
                            <TextInput
                                style={styles.inputText}
                                onFocus={() => {
                                    setNameError(null)
                                    setAdColor(colors.selectedText)
                                }}
                                onBlur={() => setAdColor(colors.fontThirdColor)}
                                onChangeText={text => setName(text)}
                                placeholderTextColor={colors.fontThirdColor}
                                placeholder={'Enter your name'}
                            />
                        </View>
                        {nameError &&
                            <TextDefault textColor={colors.google} style={styles.width100}>
                                {nameError}
                            </TextDefault>
                        }
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <TextDefault textColor={descriptionError ? colors.google : descriptionColor} bold style={styles.width100}>
                        {'Description'}
                    </TextDefault>
                    <View style={[styles.descriptionContainer, { borderColor: descriptionColor }]}>
                        <TextInput
                            style={styles.inputText}
                            maxLength={140}
                            multiline={true}
                            onFocus={() => {
                                setDescriptionError(null)
                                setDescriptionColor(colors.selectedText)
                            }}
                            onBlur={() => setDescriptionColor(colors.fontMainColor)}
                            onChangeText={text => setDescription(text)}
                            placeholderTextColor={colors.fontSecondColor}
                            placeholder={'Something about you'}
                        />
                    </View>
                    <TextDefault light small right style={alignment.MTxSmall}>
                        {description.length + '/ 140'}
                    </TextDefault>
                    {descriptionError &&
                        <TextDefault textColor={colors.google} style={styles.width100}>
                            {descriptionError}
                        </TextDefault>
                    }
                </View>
            </View>
            <View style={styles.basicInfoContainer}>
                <TextDefault textColor={colors.fontMainColor} bold H4>
                    {'Contact information'}
                </TextDefault>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.phoneRow}
                    onPress={() => navigation.navigate('EditPhone')}>
                    <View style={styles.countryBox}>
                        <TextDefault textColor={colors.fontThirdColor}>
                            {'Country'}
                        </TextDefault>
                        <TextDefault H5 style={[alignment.PBxSmall, alignment.PTxSmall]}>
                            {'+92'}
                        </TextDefault>

                    </View>
                    <View style={styles.numberBox}>
                        <View>
                            <TextDefault textColor={colors.fontThirdColor}>
                                {phone.length < 1 ? '' : 'Phone Number'}
                            </TextDefault>
                            <TextDefault textColor={phone.length < 1 ? colors.fontThirdColor : colors.fontMainColor} H5 style={[alignment.PBxSmall, alignment.PTxSmall]}>
                                {phone.length < 1 ? 'Phone Number' : phone}
                            </TextDefault>
                        </View>
                        <Entypo name="chevron-small-right" size={scale(25)} color={colors.fontMainColor} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => navigation.navigate('EditEmail')}>
                    <View style={styles.emailBox}>
                        <View>
                            <TextDefault textColor={colors.fontThirdColor}>
                                {email.length < 1 ? '' : 'Email'}
                            </TextDefault>
                            <TextDefault textColor={email.length < 1 ? colors.fontThirdColor : colors.fontMainColor} H5 style={[alignment.PBxSmall, alignment.PTxSmall]}>
                                {email.length < 1 ? 'Email' : email}
                            </TextDefault>
                        </View>
                        <Entypo name="chevron-small-right" size={scale(25)} color={colors.fontMainColor} />
                    </View>
                    <TextDefault textColor={colors.fontSecondColor} style={[alignment.MTxSmall, alignment.MBsmall]}>
                        {"This email will be useful to keep in touch. We won't share your private email with other APP users."}
                    </TextDefault>
                </TouchableOpacity>
            </View>
            <View style={styles.basicInfoContainer}>
                <TextDefault textColor={colors.fontMainColor} bold H4>
                    {'Optional information'}
                </TextDefault>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.phoneRow}>
                    <View style={styles.optionalLeft}>
                        <TextDefault textColor={colors.fontMainColor} H5 style={alignment.MBsmall}>
                            {'Facebook'}
                        </TextDefault>
                        <TextDefault textColor={colors.fontSecondColor} style={[alignment.PBxSmall, alignment.PTxSmall]}>
                            {'Sign in with Facebook and discover your trusted connections to buyers'}
                        </TextDefault>
                    </View>
                    <View style={styles.optionalRight}>
                        <EmptyButton
                            title='connect'
                            onPress={() => navigation.goBack()} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.phoneRow}>
                    <View style={styles.optionalLeft}>
                        <TextDefault textColor={colors.fontMainColor} H5 style={alignment.MBsmall}>
                            {'Google'}
                        </TextDefault>
                        <TextDefault textColor={colors.fontSecondColor} style={[alignment.PBxSmall, alignment.PTxSmall]}>
                            {'Connect your APP account to your Google account for simplicity and ease.'}
                        </TextDefault>
                    </View>
                    <View style={styles.optionalRight}>
                        <DisconnectButton
                            title='disconnect'
                            onPress={() => navigation.goBack()} />
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default React.memo(EditProfile)