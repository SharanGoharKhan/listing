import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { TextDefault } from '../../../components'
import { alignment, colors, scale } from '../../../utilities'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

function Packages() {
    const navigation = useNavigation()
    return (
        <View style={[styles.flex, styles.mainContainer]}>
            <TouchableOpacity style={styles.smallContainer}
                onPress={() => navigation.navigate('BuyPackages')}>
                <View style={[styles.flex]}>
                    <TextDefault bold H5 style={alignment.PLlarge}>
                        {'Buy Packages'}
                    </TextDefault>
                    <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                        {'Sell faster, more & higher margins with packages'}
                    </TextDefault>
                </View>
                <Entypo name="chevron-small-right" size={scale(30)} color={colors.buttonbackground} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallContainer}
                onPress={() => navigation.navigate('MyOrders')}>
                <View style={[styles.flex]}>
                    <TextDefault bold H5 style={alignment.PLlarge}>
                        {'My Orders'}
                    </TextDefault>
                    <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                        {'Active, scheduled and epired orders'}
                    </TextDefault>
                </View>
                <Entypo name="chevron-small-right" size={scale(30)} color={colors.buttonbackground} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallContainer}
                onPress={() => navigation.navigate('Invoices')}>
                <View style={[styles.flex]}>
                    <TextDefault bold H5 style={alignment.PLlarge}>
                        {'Invoices'}
                    </TextDefault>
                    <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                        {'See and download your invoices'}
                    </TextDefault>
                </View>
                <Entypo name="chevron-small-right" size={scale(30)} color={colors.buttonbackground} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallContainer}
                onPress={() => navigation.navigate('Billing')}>
                <View style={[styles.flex]}>
                    <TextDefault bold H5 style={alignment.PLlarge}>
                        {'Billing information'}
                    </TextDefault>
                    <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                        {'Edit your billing name, address, etc.'}
                    </TextDefault>
                </View>
                <Entypo name="chevron-small-right" size={scale(30)} color={colors.buttonbackground} />
            </TouchableOpacity>

        </View>
    )
}
export default React.memo(Packages)