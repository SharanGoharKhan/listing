import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState, useRef } from 'react'
import { View, KeyboardAvoidingView, ScrollView, AsyncStorage } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EmptyButton, FlashMessage } from '../../../components'
import { scale, fontStyles, verticalScale } from '../../../utilities'
import { OutlinedTextField } from 'react-native-material-textfield';
import styles from './styles'
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permission from 'expo-permissions';
import CustomMarker from '../../../assets/SVG/imageComponents/CustomMarker'


const label_values = [
    {
        title: 'Home',
        value: 'Home'
    },
    {
        title: 'Work',
        value: 'Work'
    },
    {
        title: 'Other',
        value: 'Other'
    },
]

const LATITUDE = 33.7001019
const LONGITUDE = 72.9735978
const LATITUDE_DELTA = 0.0022
const LONGITUDE_DELTA = 0.0021

function LocationConfirm() {
    const addressRef = useRef();

    const [delivery_address, setDeliveryAddress] = useState('')
    const [delivery_details, setDeliveryDetails] = useState('')
    const [delivery_address_error, setDeliveryAddressError] = useState(null)
    const [delivery_details_error, setDeliveryDetailsError] = useState(null)
    const [region, setRegion] = useState({
        latitude: LATITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitude: LONGITUDE,
        longitudeDelta: LONGITUDE_DELTA
    })
    useEffect(() => {
        _getLocationAsync();
    }, [])
    const navigation = useNavigation()
    const route = useRoute()
    const regionObj = route.params ? route.params.regionChange : null

    useEffect(() => {
        navigation.setOptions({
            title: 'Confirm your location'
        })
    }, [])

    useEffect(() => {
        if (regionObj !== null) regionChange(regionObj)
    }, [regionObj])


    async function _getLocationAsync() {
        const { status } = await Permission.askAsync(Permission.LOCATION);
        if (status === 'granted') {
            let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
            let loc = {
                latitude: parseFloat(location.coords.latitude),
                latitudeDelta: LATITUDE_DELTA,
                longitude: parseFloat(location.coords.longitude),
                longitudeDelta: LONGITUDE_DELTA
            }
            setRegion(loc)
            regionChange(loc)
        }
        else {
            FlashMessage({
                message: 'Location permission not granted'
            })
        }
    }

    function regionChange(region) {
        Location.reverseGeocodeAsync({ ...region })
            .then(data => {
                if (data.length && addressRef.current !== null) {
                    const location = data[0]
                    const deliveryAddress = Object.keys(location)
                        .map(key => location[key])
                        .join(' ')
                    setDeliveryAddress(deliveryAddress)
                    setRegion(region)

                    addressRef.current.setValue(deliveryAddress)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <SafeAreaView edges={['bottom']} style={[styles.flex, styles.safeAreaview]}>
            {/* <View style={[styles.flex, styles.mainContainer]}> */}
            {/* <View style={styles.smallContainer}> */}
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.flex}>
                <View style={[styles.flex, styles.mainContainer]}>
                    <View style={styles.mapContainer}>
                        <MapView
                            style={{ flex: 1 }}
                            scrollEnabled={false}
                            zoomEnabled={false}
                            zoomControlEnabled={false}
                            rotateEnabled={false}
                            cacheEnabled={true}
                            initialRegion={{
                                latitude: LATITUDE,
                                latitudeDelta: LATITUDE_DELTA,
                                longitude: LONGITUDE,
                                longitudeDelta: LONGITUDE_DELTA
                            }}
                            region={region}
                            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                            onPress={() => {
                                navigation.navigate("FullMap", {
                                    latitude: region.latitude,
                                    longitude: region.longitude,
                                    currentScreen: 'LocationConfirm',
                                    title: 'Map'
                                });
                            }}
                        >
                        </MapView>
                        <View
                            style={{
                                width: 50,
                                height: 50,
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                zIndex: 1,
                                translateX: -25,
                                translateY: -25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                transform: [{ translateX: -25 }, { translateY: -25 }]
                            }}>
                            <CustomMarker
                                width={40}
                                height={40}
                                transform={[{ translateY: -20 }]}
                                translateY={-20}
                            />
                        </View>
                    </View>
                    <ScrollView style={styles.flex} contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.subContainer}>
                            <View style={styles.upperContainer}>
                                <View style={styles.addressContainer}>
                                    <OutlinedTextField
                                        error={delivery_address_error}
                                        ref={addressRef}
                                        value={delivery_address}
                                        label={'Full Delivery Address'}
                                        labelFontSize={scale(12)}
                                        fontSize={scale(12)}
                                        baseColor='rgb(0, 0, 0)'
                                        maxLength={100}
                                        labelOffset={{ y1: -5 }}
                                        tintColor={!delivery_address_error ? 'rgb(255, 85, 10)' : 'red'}
                                        labelTextStyle={{ fontFamily: fontStyles.MuseoSans300, fontSize: scale(12), paddingTop: scale(1) }}
                                        onChangeText={(text) => { setDeliveryAddress(text) }}
                                        onBlur={() => {
                                            setDeliveryAddressError(!delivery_address.trim().length ? 'Delivery address is required' : null)
                                        }}
                                    />
                                    <View style={{ marginTop: verticalScale(20) }}></View>
                                    <OutlinedTextField
                                        error={delivery_details_error}
                                        value={delivery_details}
                                        label={'Delivery Details'}
                                        labelFontSize={scale(12)}
                                        fontSize={scale(12)}
                                        textAlignVertical='top'
                                        multiline={false}
                                        baseColor='rgb(0, 0, 0)'
                                        maxLength={30}
                                        labelOffset={{ y1: -5 }}
                                        tintColor={!delivery_details_error ? 'rgb(255, 85, 10)' : 'red'}
                                        labelTextStyle={{ fontFamily: fontStyles.MuseoSans300, fontSize: scale(12), paddingTop: scale(1) }}
                                        onChangeText={(text) => { setDeliveryDetails(text) }}
                                        onBlur={() => {
                                            setDeliveryDetailsError(!delivery_details.trim().length ? 'Delivery details is required' : null)
                                        }}
                                    />
                                </View>

                            </View>
                        </View>
                    </ScrollView>
                </View>

            </KeyboardAvoidingView>
            {/* </View> */}

            <View style={styles.buttonView}>
                <EmptyButton
                    title='Next'
                    onPress={async () => {
                        const formStr = await AsyncStorage.getItem('formData')
                        const formObj = JSON.parse(formStr)
                        const address = {
                            latitude: region.latitude,
                            longitude: region.longitude,
                            address: delivery_address 
                        }
                        await AsyncStorage.setItem('formData', null)
                        navigation.navigate('AdPosting')
                    }} />
            </View>

            {/* </View> */}
        </SafeAreaView>
    )
}
export default React.memo(LocationConfirm) 