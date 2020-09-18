import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { TextDefault } from '../../../components';
import styles from './styles';

const SubCategory = [
    { id: '0', title: 'Tablets' },
    { id: '1', title: 'Accessories' },
    { id: '2', title: 'MobilePhones' }
]

function SubCategories() {
    const navigation = useNavigation()
    const route = useRoute()
    const headerTitle = route?.params?.headerTitle ?? null


    useLayoutEffect(() => {
        navigation.setOptions({
            title: headerTitle
        })
    }, [navigation, headerTitle])
    return (
        <View style={[styles.flex, styles.container]}>
            <FlatList
                data={SubCategory}
                style={styles.flatList}
                contentContainerStyle={styles.categoryContainer}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.categoryRow}
                        onPress={() => navigation.navigate('SellingForm')}
                    >
                        <TextDefault light H5 style={styles.fontText}>
                            {item.title}
                        </TextDefault>
                    </TouchableOpacity>
                )}
            />

        </View>
    );
}

export default React.memo(SubCategories)
