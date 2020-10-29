import { Entypo, FontAwesome, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as Device from 'expo-device'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { Image, Linking, Platform, ScrollView, Share, TouchableOpacity, View } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import MapView, { Marker, Circle, PROVIDER_DEFAULT, PROVIDER_GOOGLE, } from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashMessage, LeftButton, ReportModal, RightButton, TextDefault } from '../../../components'
import UserContext from '../../../context/user'
import { alignment, colors, scale } from '../../../utilities'
import Slider from './Slider'
import styles from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from '../../../components/Text/TextDefault/styles'


const title = 'Japanese 28 inches cycle'
const mapIcon = require('../../../assets/icons/gMap.png')

const IMG_LIST = [
    require('../../../assets/images/products/cycle.jpg'),
    require('../../../assets/images/products/cycle(1).jpg'),
    require('../../../assets/images/products/nord.jpg'),
]

const LATITUDE = 33.7001019
const LONGITUDE = 72.9735978
const LATITUDE_DELTA = 0.0452
const LONGITUDE_DELTA = 0.0451

function linkToMapsApp({ latitude, longitude }) {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
    const latLng = `${latitude},${longitude}`
    const url = `${scheme}${latLng}`

    Linking.openURL(url)
}


function ProductDescription() {
    const location = null
    const navigation = useNavigation()
    const [isLike, isLikeSetter] = useState(false)
    const [reportModal, setReportModal] = useState(false);
    const { isLoggedIn } = useContext(UserContext)
    const region = {
        latitude: location ? location.latitude : LATITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitude: location ? location.longitude : LONGITUDE,
        longitudeDelta: LONGITUDE_DELTA
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => null
        })
    }, [navigation])

    function toggleModal() {
        setReportModal(prev => !prev)
    }
    async function share() {
        try {
            const result = await Share.share({
                title: 'App link',
                message:
                    'Install this app and enjoy your friend community',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                    FlashMessage({ message: 'The invitation has been sent', type: 'success' });
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            FlashMessage({ message: error.message, type: 'warning' });
        }
    }

    function dialCall() {
        if (!isLoggedIn)
            navigation.navigate('Registration')
        else if (!Device.isDevice)
            FlashMessage({ message: 'This function is not working on Simulator/Emulator', type: 'warning' })
        else {
            let phoneNumber = '';
            if (Platform.OS === 'android') {
                phoneNumber = 'tel:${1234567890}';
            }
            else {
                phoneNumber = 'telprompt:${1234567890}';
            }

            Linking.openURL(phoneNumber);
        }
    };

    function Sms() {
        if (!isLoggedIn)
            navigation.navigate('Registration')
        else {
            let url = `sms:1234567890${Platform.OS === "ios" ? "&" : "?"}body=${"This is sample text"}`

            Linking.openURL(url);
        }
    };

    return (
        <SafeAreaView style={[styles.flex, styles.safeAreaview]}>
            <ScrollView style={[styles.flex, styles.mainContainer]}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Modal */}
                <ReportModal visible={reportModal} onModalToggle={toggleModal} />

                <View style={styles.swiperContainer}>
                    <Slider IMG_LIST={IMG_LIST} />
                </View>
                <View style={styles.priceContainer}>
                    <View style={styles.priceRow}>
                        <TextDefault H4 bold>
                            {'Rs 20,000'}
                        </TextDefault>
                        <TouchableOpacity activeOpacity={0} onPress={() => isLikeSetter(prev => !prev)}>
                            {isLike ? <FontAwesome name="heart" size={scale(20)} color="black" /> :
                                <FontAwesome name="heart-o" size={scale(20)} color="black" />
                            }
                        </TouchableOpacity>
                    </View>
                    <TextDefault>
                        {title}
                    </TextDefault>
                    <View style={styles.locationRow}>
                        <MaterialIcons name='location-on' size={scale(15)} color={colors.headerText} />
                        <TextDefault numberOfLines={1} style={styles.locationText}>
                            {'Peshawar Road, Rawalpindi, Punjab'}
                        </TextDefault>
                        <TextDefault numberOfLines={1} uppercase>
                            {'09 SEP'}
                        </TextDefault>
                    </View>
                </View>
                <View style={styles.conditionContainer}>
                    <TextDefault bold H5 style={alignment.MBsmall}>
                        {'Detail'}
                    </TextDefault>
                    <View style={styles.row}>
                        <TextDefault uppercase light style={{ ...alignment.MBsmall, width: '35%' }}>
                            {'Condition'}
                        </TextDefault>
                        <TextDefault bold style={alignment.MBsmall}>
                            {'Used'}
                        </TextDefault>
                    </View>
                    <View style={styles.row}>
                        <TextDefault uppercase light style={{ ...alignment.MBsmall, width: '35%' }}>
                            {'type'}
                        </TextDefault>
                        <TextDefault bold style={alignment.MBsmall}>
                            {'Audio-Video'}
                        </TextDefault>
                    </View>
                </View>
                <View style={styles.conditionContainer}>
                    <TextDefault bold H5 style={alignment.MBsmall}>
                        {'Description'}
                    </TextDefault>
                    <TextDefault >
                        {"Condition Iike new \nShimano gears \nEach and Everything smoothly functional \nFor more details contact"}
                    </TextDefault>
                </View>
                <BorderlessButton
                    borderless={false}
                    style={styles.profileContainer}
                    onPress={() => navigation.navigate('UserProfile')}>
                    <View style={styles.imageResponsive}>
                        <Image
                            style={styles.image}
                            source={require('../../../assets/images/avatar.png')} />
                    </View>
                    <View style={styles.profileInfo}>
                        <TextDefault bold>
                            {'Fatim'}
                        </TextDefault>
                        <TextDefault light small>
                            {'Member since Jan 2020'}
                        </TextDefault>
                        <TextDefault textColor={colors.spinnerColor} bold style={alignment.MTxSmall}>
                            {'SEE Profile'}
                        </TextDefault>
                    </View>
                    <Entypo name='chevron-small-right' size={scale(20)} color={colors.buttonbackground} />
                </BorderlessButton>
                <View style={styles.line} />
                <View style={styles.conditionContainer}>
                    <TextDefault bold H5 style={alignment.MBsmall}>
                        {'Ad posted at'}
                    </TextDefault>
                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.flex}
                            scrollEnabled={false}
                            zoomEnabled={false}
                            zoomControlEnabled={false}
                            rotateEnabled={false}
                            showsUserLocation={false}
                            provider={Platform.select({
                                ios: PROVIDER_DEFAULT,
                                android: PROVIDER_GOOGLE
                            })}
                            initialRegion={region}
                            onPress={() => {
                                navigation.navigate('FullMap', {
                                    title: title,
                                    region: region
                                })
                            }}
                        >
                            <Circle center={region}
                                radius={scale(250)}
                                strokeColor={'rgba(28, 115, 112, 0.9)'}
                                fillColor={'rgba(28, 115, 112, 0.4)'}
                            />

                        </MapView>
                        <RectButton
                            onPress={() => {
                                linkToMapsApp(region)
                            }}
                            style={{
                                width: scale(35),
                                height: scale(35),
                                position: 'absolute',
                                backgroundColor: colors.containerBox,
                                bottom: 10,
                                right: 10,
                                zIndex: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <View style={styles.iconResponsive}>
                                <Image source={mapIcon} style={styles.image} />
                            </View>
                        </RectButton>
                    </View>
                </View>
                <View style={styles.profileContainer}>
                    <TextDefault >
                        {'AD ID:10232142312'}
                    </TextDefault>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => toggleModal()}>
                        <TextDefault textColor={colors.spinnerColor} uppercase bold>
                            {'Report This AD'}

                        </TextDefault>
                    </TouchableOpacity>
                </View>


                {/* Header */}
                <View style={styles.headerView}>
                    <TouchableOpacity activeOpacity={0.7}>
                        {LeftButton({ iconColor: colors.white, icon: 'back' })}
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={share}>
                        {RightButton({ iconColor: colors.white, icon: 'share' })}
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {/* Footer */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
                    onPress={() => navigation.navigate('Chat', { screen: 'LiveChat', initial: false })}
                >
                    <SimpleLineIcons name='bubble' size={scale(20)} color={colors.white} />
                    <TextDefault textColor={colors.buttonText} uppercase bold style={alignment.PLsmall}>
                        {'Chat'}
                    </TextDefault>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
                    onPress={Sms}
                >
                    <SimpleLineIcons name='envelope' size={scale(20)} color={colors.white} />
                    <TextDefault textColor={colors.buttonText} uppercase bold style={alignment.PLsmall}>
                        {'SMS'}
                    </TextDefault>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
                    onPress={dialCall}
                >
                    <SimpleLineIcons name='phone' size={scale(20)} color={colors.white} />
                    <TextDefault textColor={colors.buttonText} uppercase bold style={alignment.PLsmall}>
                        {'CALL'}
                    </TextDefault>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}

export default React.memo(ProductDescription)