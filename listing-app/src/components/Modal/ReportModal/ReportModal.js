import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Modal, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ModalHeader from '../../Header/ModalHeader/ModalHeader';
import RadioButton from '../../RadioBtn/RadioBtn';
import { TextDefault } from '../../Text';
import styles from './styles';

const REPORT_OPTIONS = [
    {
        value: 0,
        title: 'Offensive content'
    },
    {
        value: 1,
        title: 'Fraud'
    },
    {
        value: 2,
        title: 'Duplicate ad'
    },
    {
        value: 3,
        title: 'Product already sold'
    },
    {
        value: 4,
        title: 'Other'
    },
]

function ReportModal(props) {
    const inset = useSafeAreaInsets()
    const [check, setCheck] = useState(null)


    function footerView() {
        return (
            <View style={styles.footerView}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Comment'
                />
                <View style={styles.buttonsRow}>
                    <TouchableOpacity style={styles.button} onPress={() => props.onModalToggle()}>
                        <View style={styles.buttonText}>
                            <TextDefault>
                                {'Cancel'}
                            </TextDefault>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <View style={styles.buttonText}>
                            <TextDefault>
                                {'Send'}
                            </TextDefault>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
        >
            <View style={[
                styles.safeAreaViewStyles,
                styles.flex,
                { paddingTop: inset.top, paddingBottom: inset.bottom }]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.flex}>
                    <View style={[styles.flex, styles.mainContainer]}>
                        <ModalHeader closeModal={props.onModalToggle} title={'Report ad'} />
                        <FlatList
                            data={REPORT_OPTIONS}
                            contentContainerStyle={{ flexGrow: 1 }}
                            style={styles.body}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={styles.stateBtn}
                                    onPress={() => setCheck(item.value)}>
                                    <RadioButton
                                        size={13}
                                        animation={'bounceIn'}
                                        isSelected={item.value === check}
                                        onPress={() => setCheck(item.value)}
                                    />
                                    <TextDefault style={[styles.flex, styles.font]} >
                                        {item.title}
                                    </TextDefault>
                                </TouchableOpacity>
                            )} />

                        {footerView()}
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal >
    )
}
export default React.memo(ReportModal)