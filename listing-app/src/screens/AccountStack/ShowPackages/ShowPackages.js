import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImageHeader, TextDefault } from '../../../components'
import { alignment, scale } from '../../../utilities'
import styles from './styles'
import { MaterialIcons } from '@expo/vector-icons';

function ShowPackages() {
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [navigation])
    return (
        <SafeAreaView edges={['bottom', 'top', 'left', 'right']} style={[styles.flex, styles.safeAreaview]}>
            <ScrollView
                style={styles.flex}
                contentContainerStyle={styles.mainContainer}>
                <ImageHeader />
                <View style={styles.line} />
                <TextDefault style={[alignment.MTlarge, styles.marginAside]} bold H5>
                    {'Post More Ads'}
                </TextDefault>
                <View style={[styles.marginAside, styles.row]}>
                    <MaterialIcons name="check" size={scale(20)} color="black" />
                    <TextDefault style={[styles.flex, alignment.PLmedium]} >
                        {'Package available for 90 days'}
                    </TextDefault>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default React.memo(ShowPackages)