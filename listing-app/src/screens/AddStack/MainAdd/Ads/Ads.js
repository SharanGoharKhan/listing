import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Image, View, TouchableOpacity, FlatList } from 'react-native';
import { AddFilter, EmptyButton, TextDefault } from '../../../../components';
import { alignment, colors, scale } from '../../../../utilities';
import styles from './styles';
import { Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

const dataList = [
    {
        status: 'ACTIVE',
        title: 'Japanese 28 inches cycle',
        price: 'RS: 20,000',
        img: require('../../../../assets/images/products/cycle.jpg'),
        views: 9,
        likes: 0,
        postingDate: '29 Sep 2020',
        endingDate: '29 OCT 2020'
    },
    {
        status: 'PENDING',
        title: 'Japanese 28 inches cycle',
        price: 'RS: 20,000',
        img: require('../../../../assets/images/products/cycle.jpg'),
        views: 0,
        likes: 0,
        postingDate: '29 Sep 2020',
        endingDate: '29 OCT 2020'
    }
]

function Ads() {
    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)

    function onModalToggle() {
        setVisible(prev => !prev)
    }

    function emptyView() {
        return (
            <View style={[styles.flex, styles.emptyContainer]}>
                <Image
                    style={styles.emptyImage}
                    source={require('../../../../assets/images/emptyView/ads.png')}
                />
                <TextDefault H4 center bold style={alignment.MTlarge}>
                    {"You haven't listed anything yet."}
                </TextDefault>
                <TextDefault H5 center light style={alignment.MTsmall}>
                    {"Let go of what you don't use anymore"}
                </TextDefault>
                <EmptyButton
                    title='Start selling'
                    onPress={() => navigation.navigate('Sell', { screen: 'Home' })}
                />
            </View>
        )
    }

    function header() {
        return (
            <TouchableOpacity style={styles.smallContainer}
                onPress={onModalToggle}>
                <TextDefault bolder H5 style={alignment.PRsmall}>
                    {`View All (${dataList.length})`}
                </TextDefault>
                <Feather name="chevron-down" size={scale(15)} color={colors.fontSecondColor} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={[styles.flex, styles.mainContainer]}>
            <FlatList
                data={dataList}
                style={styles.flex}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={emptyView}
                ListHeaderComponent={header}
                keyExtractor={(item, index) => index.toString()}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={[styles.adContainer, { borderLeftColor: item.status === 'PENDING' ? colors.horizontalLine : colors.activeLine, }]} onPress={() => navigation.navigate('ProductDescription')}>
                        <TextDefault small textColor={colors.fontSecondColor} uppercase style={styles.dateRow}>
                            {'From: '} <TextDefault small bold>{item.postingDate}</TextDefault>
                            {' -To: '} <TextDefault bold small>{item.endingDate}</TextDefault>
                        </TextDefault>
                        <View style={styles.InfoContainer}>
                            <Image
                                source={item.img}
                                style={styles.imgResponsive}
                            />
                            <View style={[styles.flex, styles.descriptionContainer]}>
                                <View>
                                    <TextDefault bold>
                                        {item.title}
                                    </TextDefault>
                                    <TextDefault style={alignment.PTxSmall}>
                                        {item.price}
                                    </TextDefault>
                                </View>
                                <View style={styles.locationRow}>
                                    <View style={styles.Vline}>
                                        <MaterialCommunityIcons name="eye-outline" size={scale(15)} color={colors.headerText} />
                                        <TextDefault numberOfLines={1} small bold style={styles.locationText}>
                                            {'View:'} <TextDefault small light> {item.status === 'PENDING' ? '-' : item.views}</TextDefault>
                                        </TextDefault>
                                    </View>
                                    <FontAwesome name="heart" size={scale(13)} color={colors.headerText} />
                                    <TextDefault numberOfLines={1} small bold style={styles.locationText}>
                                        {'Likes:'} <TextDefault small light> {item.status === 'PENDING' ? '-' : item.likes}</TextDefault>
                                    </TextDefault>
                                </View>
                            </View>
                        </View>
                        <View style={styles.statusContainer}>
                            <View style={[styles.statusBox, item.status === 'PENDING' ? styles.pendingStatus : styles.activeStatus]}>
                                <TextDefault textColor={item.status === 'PENDING' ? colors.white : colors.fontMainColor} uppercase small bolder>
                                    {item.status}
                                </TextDefault>
                            </View>
                            <TextDefault style={alignment.MTxSmall}>
                                {item.status === 'PENDING' ? 'This ad is being processed and it will be live soon' : 'This add is currently live'}
                            </TextDefault>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <AddFilter visible={visible} onModalToggle={onModalToggle} active={dataList.length} />
        </View>
    )
}

export default React.memo(Ads)