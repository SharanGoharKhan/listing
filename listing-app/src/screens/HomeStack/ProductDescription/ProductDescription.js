import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { View, TouchableOpacity, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from 'react-native/Libraries/NewAppScreen'
import { LeftButton, ReportModal, RightButton, TextDefault } from '../../../components'
import { alignment, colors, scale } from '../../../utilities'
import styles from './style'
import { FontAwesome, MaterialIcons, Entypo, SimpleLineIcons } from '@expo/vector-icons'
import Swiper from 'react-native-swiper'

const IMG_LIST = [
    require('../../../assets/images/products/cycle.jpg'),
    require('../../../assets/images/products/cycle(1).jpg'),
    require('../../../assets/images/products/nord.jpg'),
]


function ProductDescription() {
    const navigation = useNavigation()
    const [isLike, isLikeSetter] = useState(false)
    const [reportModal, setReportModal] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => null
        })
    }, [navigation])

    function toggleModal() {
        setReportModal(prev => !prev)
    }

    const Slide = props => {
        return (
            <View style={styles.slide}>
                <Image
                    style={styles.image}
                    source={props.uri}
                    resizeMode='cover'
                />
            </View>
        )
    }

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={[styles.flex, styles.safeAreaview]}>
            <ScrollView style={[styles.flex, styles.mainContainer]}
                contentContainerStyle={{
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                {/* Modal */}
                <ReportModal visible={reportModal} onModalToggle={toggleModal} />

                <View style={styles.swiperContainer}>
                    <Swiper style={styles.wrapper} >
                        {IMG_LIST.map((item, i) => (
                            <Slide
                                uri={item}
                                key={i}
                            />
                        ))}
                    </Swiper>
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
                        {'Japanese 28 inches cycle'}
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
                <TouchableOpacity style={styles.profileContainer}>
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
                        <TouchableOpacity style={alignment.MTxSmall}>
                            <TextDefault textColor={colors.spinnerColor} bold>
                                {'SEE Profile'}
                            </TextDefault>
                        </TouchableOpacity>
                    </View>
                    <Entypo name='chevron-small-right' size={scale(20)} color={colors.buttonbackground} />
                </TouchableOpacity>
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
                    <TouchableOpacity activeOpacity={0.7}>
                        {RightButton({ iconColor: colors.white, icon: 'share' })}
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {/* Footer */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
                >
                    <SimpleLineIcons name='bubble' size={scale(20)} color={colors.white} />
                    <TextDefault textColor={colors.buttonText} uppercase bold style={alignment.PLsmall}>
                        {'Chat'}
                    </TextDefault>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
                >
                    <SimpleLineIcons name='envelope' size={scale(20)} color={colors.white} />
                    <TextDefault textColor={colors.buttonText} uppercase bold style={alignment.PLsmall}>
                        {'SMS'}
                    </TextDefault>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
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