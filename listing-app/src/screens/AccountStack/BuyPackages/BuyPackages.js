import React, { useState } from 'react'
import { Image, View, TouchableOpacity } from 'react-native'
import { TextDefault, EmptyButton, LocationModal } from '../../../components'
import { alignment, scale, colors } from '../../../utilities'
import styles from './styles'
import { Entypo } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'

const empty = false

function BuyPackages() {
    const navigation = useNavigation()
    const routes = useRoute()
    const showButton = routes.params?.button ?? true
    const [filters, setFilters] = useState({})
    const [modalVisible, setModalVisible] = useState(false);

    function toggleModal() {
        setModalVisible(prev => !prev)
    }

    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                <Image
                    style={styles.emptyImage}
                    source={require('../../../assets/images/emptyView/under-construction.png')}
                />
                <TextDefault H4 center bold style={alignment.MTlarge}>
                    {"Comming Soon...."}
                </TextDefault>
                <TextDefault H5 center light style={alignment.MTsmall}>
                    {"This feature is under-construction."}
                </TextDefault>
            </View>
        )
    }

    return (
        <View style={[styles.flex, styles.mainContainer]}>
            {empty ? emptyView() :
                <View style={[styles.flex, styles.subContainer]}>
                    <View style={styles.flex}>
                        <TextDefault textColor={colors.fontMainColor} H4 uppercase style={alignment.MBlarge}>
                            {'SELECT OPTIONS TO SHOW PACKAGES'}
                        </TextDefault>
                        <TouchableOpacity style={styles.smallContainer}
                            onPress={() => navigation.navigate('Categories')}>
                            <View style={[styles.flex]}>
                                <TextDefault bold H5 style={alignment.PLlarge}>
                                    {'Categories'}
                                </TextDefault>
                                <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                                    {showButton ? 'Search Category' : 'Mobiles'}
                                </TextDefault>
                            </View>
                            <Entypo name="chevron-small-right" size={scale(30)} color={colors.buttonbackground} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smallContainer}
                            onPress={toggleModal}>
                            <View style={[styles.flex]}>
                                <TextDefault bold H5 style={alignment.PLlarge}>
                                    {'Location'}
                                </TextDefault>
                                <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                                    {'Service Society E11/2 '}
                                </TextDefault>
                            </View>
                            <Entypo name="chevron-small-right" size={scale(30)} color={colors.buttonbackground} />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.buttonView}>
                        <EmptyButton
                            disabled={showButton}
                            title='Show Packages'
                            onPress={() => navigation.navigate('ShowPackages')} />
                    </View>
                </View>
            }
            <LocationModal visible={modalVisible} onModalToggle={toggleModal}
                setFilters={setFilters} />
        </View>
    )
}
export default React.memo(BuyPackages)