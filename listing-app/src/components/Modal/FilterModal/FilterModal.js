import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { alignment, colors, scale } from '../../../utilities';
import ModalHeader from '../../Header/ModalHeader/ModalHeader';
import { TextDefault } from '../../Text';
import styles from './styles';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { ScrollView } from 'react-native-gesture-handler';

const CONDITIONS = [
    {
        value: 0,
        title: 'Any'
    },
    {
        value: 1,
        title: 'New'
    },
    {
        value: 2,
        title: 'Used'
    }
]

const SORT = [
    {
        value: 3,
        title: 'Newly Listed'
    },
    {
        value: 4,
        title: 'Most Revelvent'
    },
    {
        value: 5,
        title: 'Lowest Price'
    },
    {
        value: 6,
        title: 'Highest Price'
    },
    {
        value: 7,
        title: 'Nearest to me'
    }
]

function FilterModal(props) {
    const inset = useSafeAreaInsets()
    const [priceSliderValue, setPriceSliderValue] = useState([0, 50000])
    const [condition, setCondition] = useState(CONDITIONS[0].value)
    const [sort, setSort] = useState(SORT[0].value)

    function priceSliderChange(values) {
        setPriceSliderValue(values)
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
                <View style={[styles.flex, styles.mainContainer]}>
                    <ModalHeader closeModal={props.onModalToggle} title={'Filter'} />
                    <View style={styles.headerContents}>
                        <TouchableOpacity
                            style={styles.categoryBtn} >
                            <View style={[styles.flex, {}]}>
                                <TextDefault bold H5>
                                    {'Categories'}
                                </TextDefault>
                                <TextDefault >
                                    {props.searchCategory}
                                </TextDefault>
                            </View>
                            <Entypo name="chevron-small-right" size={scale(20)} color={colors.fontMainColor} />
                        </TouchableOpacity>
                        <View style={styles.subContainer}>
                            <TextDefault H5 bold style={styles.width100}>
                                {'Price'}
                            </TextDefault>
                            <View style={styles.subContainerRow}>
                                <View style={[styles.priceFrom, styles.boxContainer]}>
                                    <TextDefault numberOfLines={1} style={styles.limitPrice}>
                                        {'Rs: '}{priceSliderValue[0]}
                                    </TextDefault>
                                </View>
                                <TextDefault light>{'to'}</TextDefault>
                                <View style={[styles.priceFrom, styles.boxContainer]}>
                                    <TextDefault style={styles.limitPrice}>
                                        {'Rs: '}{priceSliderValue[1]}
                                    </TextDefault>
                                </View>
                            </View>
                            <MultiSlider
                                sliderLength={scale(310)}
                                trackStyle={styles.trackStyle}
                                markerStyle={styles.markerStyle}
                                selectedStyle={styles.trackLine}
                                values={[priceSliderValue[0], priceSliderValue[1]]}
                                onValuesChange={priceSliderChange}
                                min={0}
                                max={50000}
                                step={100}
                                allowOverlap
                                snapped
                            />
                        </View>
                        <View style={styles.subContainer}>
                            <TextDefault H5 bold style={styles.width100}>
                                {'Condition'}
                            </TextDefault>
                            <View style={styles.subContainerRow}>
                                {CONDITIONS.map((item, index) => (
                                    <TouchableOpacity key={item.value}
                                        style={[styles.conditionBox, styles.boxContainer, item.value === condition ? styles.selected : styles.notSelected]}
                                        onPress={() => setCondition(item.value)}>
                                        <TextDefault style={item.value === condition ? styles.selectedText : styles.unSelectedText}>
                                            {item.title}
                                        </TextDefault>
                                    </TouchableOpacity>
                                ))

                                }
                            </View>
                        </View>
                        <View style={styles.subContainer}>
                            <TextDefault H5 bold style={styles.width100}>
                                {'Sort'}
                            </TextDefault>
                            <ScrollView
                                contentContainerStyle={styles.scrollviewContent}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                {SORT.map((item, index) => (
                                    <TouchableOpacity key={item.value}
                                        style={[styles.sortBox, styles.boxContainer, item.value === sort ? styles.selected : styles.notSelected]}
                                        onPress={() => setSort(item.value)}>
                                        <TextDefault style={item.value === sort ? styles.selectedText : styles.unSelectedText}>
                                            {item.title}
                                        </TextDefault>
                                    </TouchableOpacity>
                                ))
                                }
                            </ScrollView>
                        </View>
                    </View>
                </View>
                {/* Button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.button}
                        onPress={() => props.onModalToggle()}
                    >
                        <TextDefault textColor={colors.buttonText} uppercase bold>
                            {'Apply'}
                        </TextDefault>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal >
    )
}
export default React.memo(FilterModal)