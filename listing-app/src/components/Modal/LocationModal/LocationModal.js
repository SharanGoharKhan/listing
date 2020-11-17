import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { FlatList, Modal, TextInput, TouchableOpacity, View, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { useQuery, gql } from '@apollo/client'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { alignment, colors, scale, states } from '../../../utilities';
import ModalHeader from '../../Header/ModalHeader/ModalHeader';
import { TextDefault } from '../../Text';
import styles from './styles';
import { zones } from '../../../apollo/server'
import Spinner from '../../Spinner/Spinner';

const GET_ZONES = gql`${zones}`
const STATE = states

function LocationModal(props) {
    const inset = useSafeAreaInsets()
    const { data, error, loading } = useQuery(GET_ZONES)
    function btnLocation(title) {
        props.setFilters(title)
        props.onModalToggle()
    }
    if (loading) {
        return <Spinner />
    }



    async function storageLocation() {
        const locationStr = await AsyncStorage.getItem('location')
        const locationObj = JSON.parse(locationStr)
        if (locationObj) {

            const location = { title: locationObj.label, ...locationObj }
            console.log(location)
            props.setFilters(location)
            props.onModalToggle()
        }
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
        >
            <SafeAreaView edges={['top', 'bottom']} style={[
                styles.safeAreaViewStyles,
                styles.flex]}>
                <KeyboardAvoidingView style={[styles.flex]}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <View style={[styles.flex, styles.mainContainer]}>
                        <ModalHeader closeModal={props.onModalToggle} title={'Location'} />
                        <View style={styles.body}>
                            <View style={styles.headerContents}>
                                <View style={styles.closeBtn}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            props.onModalToggle()
                                        }}
                                        style={styles.backBtn}>
                                        <Ionicons
                                            name="ios-search"
                                            size={scale(17)}
                                            color={colors.headerText}
                                        />
                                    </TouchableOpacity>
                                    <TextInput
                                        style={styles.inputAddress}
                                        placeholderTextColor={colors.fontSecondColor}
                                        placeholder={'Search city, area or neighbour'}
                                    />
                                </View>
                                <TouchableOpacity style={styles.currentLocation} onPress={() => storageLocation()}>
                                    <MaterialCommunityIcons name="target" size={scale(25)} color={colors.spinnerColor} />
                                    <View style={alignment.PLsmall}>
                                        <TextDefault textColor={colors.spinnerColor} H5 bold>
                                            {'Use current location'}
                                        </TextDefault>
                                        <TextDefault numberOfLines={1} textColor={colors.fontMainColor} light small style={{ ...alignment.MTxSmall, width: '85%' }}>
                                            {loading ? 'Fetching location...' : 'E11/2'}
                                        </TextDefault>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TextDefault textColor={colors.fontSecondColor} uppercase style={styles.title}>
                                {'Choose State'}
                            </TextDefault>
                        </View>

                        {error ? <TextDefault>{error.message}</TextDefault> : <FlatList
                            contentContainerStyle={alignment.PBlarge}
                            showsVerticalScrollIndicator={false}
                            data={data.zones || []}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={styles.stateBtn}
                                    onPress={() => btnLocation(item)} >
                                    <TextDefault style={styles.flex} >
                                        {item.title}
                                    </TextDefault>
                                    <Entypo name="chevron-small-right" size={scale(20)} color={colors.fontMainColor} />
                                </TouchableOpacity>
                            )} />}
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Modal >
    )
}
export default React.memo(LocationModal)