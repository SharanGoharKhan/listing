import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Image, Platform, Modal, FlatList, Dimensions } from 'react-native'
import { TextDefault } from '../../Text'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons'
import { alignment, colors, scale } from '../../../utilities'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { LeftButton } from '../HeaderIcons/HeaderIcons'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window')

const OPTIONS = ['Delete Chat', 'Report User', 'Block User', 'Safety Tipe', 'Turn Off SafetyTips']

function ModalHeader() {
    const navigation = useNavigation()
    const [open, setOpen] = useState(false)
    const inset = useSafeAreaInsets()
    return (
        <SafeAreaView edges={['top']} style={styles.safeAreaContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.headerContents}>
                    <LeftButton icon='back' iconColor={colors.headerText} />
                    <View style={[styles.flex, styles.titleContainer]}>
                        <View style={styles.imageResponsive}>
                            <Image
                                style={[styles.flex, styles.img]}
                                source={require('../../../assets/images/products/cycle.jpg')} />
                            <Image
                                style={styles.profileImg}
                                source={require('../../../assets/images/avatar.png')}
                            />
                        </View>
                        <View style={styles.infoContainer}>
                            <TextDefault bold H5>
                                {'Fatim'}
                            </TextDefault>
                            <TextDefault textColor={colors.fontSecondColor} small>
                                {'Online'}
                            </TextDefault>
                        </View>
                        <View style={styles.iconContainer}>
                            <BorderlessButton
                                style={alignment.PxSmall}
                                borderless={false}>
                                <View accessible>
                                    <Feather name="phone" size={scale(20)} color={colors.headerText} />
                                </View>
                            </BorderlessButton>
                            <BorderlessButton
                                style={alignment.PxSmall}
                                borderless={false}>
                                <MaterialCommunityIcons name="message-text-outline" size={scale(20)} color={colors.headerText} />
                            </BorderlessButton>
                            <BorderlessButton
                                onPress={() => setOpen(true)}
                                style={alignment.PxSmall}
                                borderless={false}>
                                <MaterialCommunityIcons name="dots-vertical" size={scale(20)} color={colors.headerText} />
                            </BorderlessButton>
                        </View>
                    </View>
                    {open &&
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={open}
                            onRequestClose={() => setOpen(false)}
                        >
                            <TouchableOpacity activeOpacity={1} style={styles.flex} onPress={() => setOpen(false)} >
                                <FlatList
                                    data={OPTIONS}
                                    style={{ width: width * 0.5, backgroundColor: colors.containerBox, position: 'absolute', top: inset.top, right: scale(5) }}
                                    keyExtractor={(index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <BorderlessButton
                                            onPress={() => {
                                                setOpen(false)
                                                navigation.goBack()
                                            }}
                                            borderless={false}
                                            style={{ ...alignment.Pmedium }}>
                                            <TextDefault bold H5>
                                                {item}
                                            </TextDefault>
                                        </BorderlessButton>
                                    )}
                                />
                            </TouchableOpacity>
                        </Modal>
                    }
                </View>
            </View>
        </SafeAreaView >
    )

}
export default React.memo(ModalHeader)