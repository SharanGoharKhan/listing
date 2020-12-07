import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { TextDefault, Spinner } from '../../../components'
import FilterModal from '../FilterModal/FilterModal'
import SearchHeader from '../../../components/Header/SearchHeader/SearchHeader'
import { alignment, colors, scale } from '../../../utilities'
import ProductCard from './ProductCard/ProductCard'
import styles from './styles'
import navigationOption from './navigationOption'
import { gql, useLazyQuery } from '@apollo/client'
import { itemsBySubCategory, subCategories } from '../../../apollo/server'

const PRODUCTS = gql`${itemsBySubCategory}`

function ProductListing() {
    const navigation = useNavigation()
    const route = useRoute()
    const searchCategory = route.params?.search ?? null
    const subCategory = route.params?.subCategory ?? null
    const [modalVisible, setModalVisible] = useState(false);
    const [fetchProducts, { called, data, loading, error }] = useLazyQuery(PRODUCTS, { variables: { subCategory: subCategory } })
    // useLayoutEffect(() => {
    //     navigation.setOptions(
    //         navigationOption({ searchCategory: searchCategory })
    //     )
    // }, [navigation])

    useEffect(() => {
        let isProduct = true
        if (!subCategory) return
            ; (async () => {
                isProduct && (await fetchProducts())
            })()
    }, [subCategory])

    function toggleModal() {
        setModalVisible(prev => !prev)
    }

    function headerView() {
        return (
            <View style={styles.headingRow}>
                {!loading && called && <TextDefault >
                    {`${data.itemsByCategory.length} ads`}
                </TextDefault>}
                <TouchableOpacity style={styles.filterBtn}
                    onPress={toggleModal}>
                    <MaterialIcons name='tune' size={scale(20)} color={colors.buttonbackground} />
                    <TextDefault style={styles.fontText} right>
                        {'Filter'}
                    </TextDefault>
                </TouchableOpacity>
            </View>
        )
    }
    if (error) {
        return <TextDefault>{JSON.stringify(error)}</TextDefault>
    }
    if (loading) {
        return <Spinner spinnerColor={colors.spinnerColor1} backColor={'transparent'} />
    }
    function emptyView() {
        return (
            <View style={{ alignContent: "center", alignItems: "center" }}>
                <TextDefault>
                    No Ads
                </TextDefault>
            </View>
        )
    }
    return (
        <>
            <View style={[styles.flex, styles.mainContainer]}>
                <FlatList
                    data={data?.itemsByCategory || []}
                    style={styles.flex}
                    contentContainerStyle={{ flexGrow: 1, ...alignment.PBlarge }}
                    ListEmptyComponent={!loading && called && emptyView}
                    ListHeaderComponent={headerView}
                    ItemSeparatorComponent={() => <View style={styles.spacer} />}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                        <ProductCard  {...item} />
                    )}
                />
            </View>
            <FilterModal visible={modalVisible} onModalToggle={toggleModal} searchCategory={searchCategory} />
        </>
    )
}
export default React.memo(ProductListing)