import React from 'react';
import { FlatList, Modal, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ModalHeader from '../../Header/ModalHeader/ModalHeader';
import { TextDefault } from '../../Text';
import styles from './styles';

const OPTIONS = [
    {
        value: 'ALL',
        title: 'View all'
    },
    {
        value: 'ACTIVE',
        title: 'Active Ads'
    },
    {
        value: 'INACTIVE',
        title: 'Inactive Ads'
    },
    {
        value: 'PENDING',
        title: 'Pending Ads'
    },
]

function AddFilter({visible, onModalToggle, setFilter}) {
    const inset = useSafeAreaInsets()

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={[
                styles.safeAreaViewStyles,
                styles.flex,
                { paddingBottom: inset.bottom }]}>
                <View style={[styles.flex, styles.mainContainer]}>
                    <ModalHeader closeModal={onModalToggle} title={'Filters'} />
                    <FlatList
                        data={OPTIONS}
                        contentContainerStyle={{ flexGrow: 1 }}
                        style={styles.body}
                        ItemSeparatorComponent={() => <View style={styles.seperator} />}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={styles.stateBtn}
                                onPress={() => {
                                    onModalToggle()
                                    setFilter(item)
                                }}>
                                <TextDefault style={[styles.flex, styles.font]} H5>
                                    {item.title}
                                </TextDefault>
                            </TouchableOpacity>
                        )} />
                </View>
            </View>
        </Modal >
    )
}
export default React.memo(AddFilter)