import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useContext } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { RightButton, TextDefault } from '../../../components'
import { alignment, colors } from '../../../utilities'
import UserContext from '../../../context/user';
import styles from './styles'

function Profile() {
    const navigation = useNavigation()
    const { profile } = useContext(UserContext)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: null,
            headerRight: () => <RightButton iconColor={colors.headerText} icon='dots' />
        })
    }, [navigation])

    return (
        <View style={[styles.flex, styles.mainContainer]}>
            <View style={styles.profileContainer}>
                <View style={styles.upperContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.imgResponsive}
                            source={require('../../../assets/images/avatar.png')}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={[styles.flex, styles.subContainer]}>
                        <View style={styles.profileInfo}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.following}
                                onPress={() => navigation.navigate('Network', { screen: 'Following' })}
                            >
                                <TextDefault textColor={colors.fontMainColor} H3 bold>
                                    {profile.following.length}
                                </TextDefault>
                                <TextDefault textColor={colors.fontSecondColor} light uppercase>
                                    {'Following'}
                                </TextDefault>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.follower}
                                onPress={() => navigation.navigate('Network', { screen: 'Followers' })}
                            >
                                <TextDefault textColor={colors.fontMainColor} H3 bold>
                                    {profile.followers.length}
                                </TextDefault>
                                <TextDefault textColor={colors.fontSecondColor} light uppercase>
                                    {'Followers'}
                                </TextDefault>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => navigation.navigate('EditProfile')}
                        >
                            <TextDefault textColor={colors.buttonbackground}>
                                {'Edit Profile'}
                            </TextDefault>
                        </TouchableOpacity>
                    </View>
                </View>
                <TextDefault H4 bold style={[alignment.MBxSmall, alignment.PLsmall, alignment.MTsmall]}>
                    {profile.name}
                </TextDefault>
            </View>
        </View>
    )
}

export default React.memo(Profile)