import { AntDesign, Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { TextDefault } from '../../../components';
import { alignment, colors, scale } from '../../../utilities';
import styles from './styles';

function MainAccount() {
    const navigation = useNavigation()
    return (
        <View style={[styles.flex, styles.container]}>
            <View style={styles.profileContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.imgResponsive}
                        source={require('../../../assets/images/avatar.png')}
                        resizeMode='cover'
                    />
                </View>
                <View style={[styles.flex, styles.profileInfo]}>
                    <TextDefault H4 bold style={alignment.MBmedium}>
                        {'Muhammad Saad Javed'}
                    </TextDefault>
                    <TouchableOpacity activeOpacity={0.5}
                        style={alignment.PBxSmall}>
                        <TextDefault textColor={colors.spinnerColor} H5 bold>
                            {'View and edit profile'}
                        </TextDefault>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.smallContainer}>
                <FontAwesome5 name="users" size={scale(20)} color={colors.buttonbackground} />
                <View style={[styles.flex]}>
                    <TextDefault bold H5 style={alignment.PLlarge}>
                        {'My Network'}
                    </TextDefault>
                    <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                        {'Followers, following and find friends'}
                    </TextDefault>
                </View>
                <Entypo name="chevron-small-right" size={scale(30)} color={colors.buttonbackground} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallContainer} onPress={()=>navigation.navigate('Packages')}>
                <AntDesign name="creditcard" size={scale(22)} color={colors.buttonbackground} />
                <View style={[styles.flex]}>
                    <TextDefault bold H5 style={alignment.PLlarge}>
                        {'Buy Packages & My Orders'}
                    </TextDefault>
                    <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                        {'Packages, orders, invoices & billing information'}
                    </TextDefault>
                </View>
                <Entypo name="chevron-small-right" size={scale(30)} color={colors.buttonbackground} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallContainer} onPress={() => navigation.navigate('Settings')}>
                <AntDesign name="setting" size={scale(22)} color={colors.buttonbackground} />
                <View style={[styles.flex]}>
                    <TextDefault bold H5 style={alignment.PLlarge}>
                        {'Settings'}
                    </TextDefault>
                    <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                        {'Privacy and logout'}
                    </TextDefault>
                </View>
                <Entypo name="chevron-small-right" size={scale(30)} color={colors.buttonbackground} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallContainer} onPress={() => navigation.navigate('Help')}>
                <Ionicons name="ios-help-circle-outline" size={scale(22)} color={colors.buttonbackground} />
                <View style={[styles.flex]}>
                    <TextDefault bold H5 style={alignment.PLlarge}>
                        {'Help and Support'}
                    </TextDefault>
                    <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                        {'Help center, Terms and conditions, Privacy policy'}
                    </TextDefault>
                </View>
                <Entypo name="chevron-small-right" size={scale(30)} color={colors.buttonbackground} />
            </TouchableOpacity>
        </View >
    );
}

export default MainAccount
