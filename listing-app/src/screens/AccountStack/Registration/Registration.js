import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { View, Image, Platform } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMutation, gql } from '@apollo/client'
import * as AppAuth from 'expo-app-auth'
import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook'
import getEnvVars from '../../../../environment'
import { ModalHeader, TextDefault, FlashMessage, Spinner } from '../../../components'
import LoginButton from '../../../components/Buttons/LoginButton/LoginButton'
import UserContext from '../../../context/user'
import { colors, scale } from '../../../utilities'
import styles from './styles'
import { login } from '../../../apollo/server'

const LOGIN = gql`
  ${login}
`

const {
    IOS_CLIENT_ID_GOOGLE,
    ANDROID_CLIENT_ID_GOOGLE,
    FACEBOOK_APP_ID } = getEnvVars()


const icon = require('../../../assets/Icon.png')

function Registration() {
    const navigation = useNavigation()
    const inset = useSafeAreaInsets()
    const [mutate] = useMutation(LOGIN, { onCompleted, onError })
    const { setTokenAsync, profile } = useContext(UserContext)
    const [loginButton, setLoginButton] = useState(null)
    const [loading, setLoading] = useState(false)

    async function onCompleted(data) {
        try {
            await setTokenAsync(data.login.token)
            navigation.goBack()
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    console.log("profile",profile)
    function onError(error) {
        try {
            console.log('graphql', error.message)
            FlashMessage({ message: error.message, type: 'warning', position: 'top' })
            setLoginButton(null)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    async function _facebookSignup() {
        await Facebook.initializeAsync(FACEBOOK_APP_ID);
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            FACEBOOK_APP_ID,
            {
                permissions: ['public_profile', 'email']
            }
        )
        console.log('Token: ', token)
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}&fields=email,name`
            )
            const user = await response.json()
            console.log(token, user)
            return user
        }
    }

    async function _GoogleSignUp() {
        try {
            const { type, user } = await Google.logInAsync({
                iosClientId: IOS_CLIENT_ID_GOOGLE,
                androidClientId: ANDROID_CLIENT_ID_GOOGLE,
                iosStandaloneAppClientId: IOS_CLIENT_ID_GOOGLE,
                androidStandaloneAppClientId: ANDROID_CLIENT_ID_GOOGLE,
                redirectUrl: `${AppAuth.OAuthRedirect}:/oauth2redirect/google`,
                scopes: ['profile', 'email']
            })
            if (type === 'success')
                return user
        }
        catch (e) {
            if (e.code != -3) {
                FlashMessage({ message: e.message, type: 'warning', position: 'top' })
            }
        }
    }



    async function mutateLogin(user) {
        try {
            setLoading(true)
            let notificationToken = null
            const { status: existingStatus } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            )
            if (existingStatus === 'granted') {
                notificationToken = (await Notifications.getExpoPushTokenAsync()).data
            }
            mutate({ variables: { ...user, notificationToken } })
        } catch (e) {
            console.log(e)
        } finally {
        }
    }

    return (
        <View style={[
            styles.safeAreaViewStyles,
            styles.flex,
            { paddingTop: inset.top, paddingBottom: inset.bottom }]}>
            <View style={[styles.flex, styles.mainContainer]}>
                <ModalHeader closeModal={() => navigation.goBack()} />
                <View style={styles.logoContainer}>
                    <View style={styles.image}>
                        <Image
                            source={icon}
                            style={styles.imgResponsive}
                            resizeMode='contain' />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <LoginButton
                        style={{ width: '85%' }}
                        icon='social-google'
                        title=' Continue with Gmail'
                        loading={loading && loginButton === "Google"}
                        onPressIn={() => {
                            setLoginButton('Google')
                        }}
                        onPress={async () => {
                            const googleUser = await _GoogleSignUp()
                            if (googleUser) {
                                const user = {
                                    phone: '',
                                    email: googleUser.email,
                                    password: '',
                                    name: googleUser.name,
                                    picture: googleUser.photoUrl,
                                    type: 'google',
                                }
                                mutateLogin(user)
                            }
                        }} />
                    {Platform.OS !== 'android' && <LoginButton
                        style={{ width: '85%' }}
                        icon='social-facebook'
                        title=' Continue with Facebook'
                        loading={loading && loginButton === "Facebook"}
                        onPressIn={() => {
                            setLoginButton('Facebook')
                        }}
                        onPress={async () => {
                            const facebookUser = await _facebookSignup()
                            if (facebookUser) {
                                const user = {
                                    facebookId: facebookUser.id,
                                    phone: "",
                                    email: facebookUser.email,
                                    password: "",
                                    name: facebookUser.name,
                                    picture: '',
                                }
                                mutateLogin(user)
                            }
                        }
                        } />}
                </View>
                <View style={styles.footerContainer}>
                    <TextDefault textColor={colors.fontPlaceholder} bold center small>
                        {'If you Continue, you are accepting'}
                    </TextDefault>
                    <TextDefault textColor={colors.fontPlaceholder} bold center small style={{ textDecorationLine: "underline" }}>
                        {'APP Terms and Conditions and Privacy Policy'}
                    </TextDefault>
                </View>
            </View>
        </View>
    )
}


export default React.memo(Registration)