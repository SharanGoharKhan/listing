import { gql, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { FlatList, Image, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { categories } from '../../../apollo/server';
import { LocationModal, MainHeader, Spinner, TextDefault, TextError } from '../../../components';
import SearchModal from '../../../components/Modal/SearchModal/SearchModal';
import { alignment, colors, textStyles } from '../../../utilities';
import Card from './Card/Card';
import styles from './styles';
const GET_CATEGORIES = gql`${categories}`


const COLORS = ['#ffd54d', '#6df8f3', '#ff7a7a', '#d5b09f', '#eccbcb']

const data = [
  {
    id: '10',
    title: 'Japanese 28 inches cycle',
    price: 'Rs: 22,900',
    location: 'Peshawar Road, Rawalpindi, Punjab',
    image: require('../../../assets/images/products/cycle.jpg')
  },
  {
    id: '11',
    title: 'PS4 Pro 1TB With Nacon Controller',
    price: 'Rs: 74,900',
    location: 'Agha Shahi Avenue, Islamabad, Islamabad Capital Territory',
    image: require('../../../assets/images/products/Ps4.jpg')
  },
  {
    id: '12',
    title: 'OnePlus Nord Dual Sim Onyx Grey 8GB RAM 128GB 5G - Global Version',
    price: 'Rs: 71,900',
    location: 'Model Town Extension, Lahore, Punjab',
    image: require('../../../assets/images/products/nord.jpg')
  },
  {
    id: '13',
    title: 'iPad 7th gen',
    price: 'Rs 59,000',
    location: 'Gulberg 3, Lahore, Punjab',
    image: require('../../../assets/images/products/ipad.jpg')
  },
  {
    id: '14',
    title: 'W26 smart watch health sale Mela',
    price: 'Rs 3,200',
    location: 'Gulberg 3, Lahore, Punjab',
    image: require('../../../assets/images/products/watch.jpg')
  },
  {
    id: '15',
    title: 'Pure hand work',
    price: 'Rs 3,500',
    location: 'Zamzama, Karachi, Sindh',
    image: require('../../../assets/images/products/handwork.jpg')
  },
  {
    id: '16',
    title: 'Samsung Note 10 plus 5g Dot..S10 plus S10 4g etc available',
    price: 'Rs 84,000',
    location: 'Quetta, Balochistan, Pakistan',
    image: require('../../../assets/images/products/note10.jpg')
  }, {
    id: '17',
    title: 'Japanese 28 inches cycle',
    price: 'Rs: 22,900',
    location: 'Peshawar Road, Rawalpindi, Punjab',
    image: require('../../../assets/images/products/cycle.jpg')
  },
  {
    id: '18',
    title: 'PS4 Pro 1TB With Nacon Controller',
    price: 'Rs: 74,900',
    location: 'Agha Shahi Avenue, Islamabad, Islamabad Capital Territory',
    image: require('../../../assets/images/products/Ps4.jpg')
  },
  {
    id: '19',
    title: 'OnePlus Nord Dual Sim Onyx Grey 8GB RAM 128GB 5G - Global Version',
    price: 'Rs: 71,900',
    location: 'Model Town Extension, Lahore, Punjab',
    image: require('../../../assets/images/products/nord.jpg')
  },
]

function MainHome() {
  
  const inset = useSafeAreaInsets()
  const navigation = useNavigation()
  const [filters, setFilters] = useState({title:'Current Location11'})
  const [modalVisible, setModalVisible] = useState(false);
  const [searchVisible, setSerachVisible] = useState(false);
  const { loading: CategoryLoading, error: CategoryError, data: CategoryData } = useQuery(GET_CATEGORIES)


  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <MainHeader onModalToggle={toggleModal} toggleSearch={toggleSearch} locationText={filters.title} />
    })
  }, [navigation, filters])

  function toggleModal() {
    setModalVisible(prev => !prev)
  }

  function toggleSearch() {
    setSerachVisible(prev => !prev)
  }

  function emptyView() {
    return (
      <View style={[styles.flex, styles.emptyContainer]}>
        <Image
          style={styles.emptyImage}
          source={require('../../../assets/images/emptyView/noData.png')}
        />
        <TextDefault H5 center bold style={alignment.MTlarge}>
          No data found.
        </TextDefault>
        <TextDefault center light>
          Please contact with your provider!.
        </TextDefault>
      </View>
    )
  }
  function categoryHeader() {
    return (
      <View style={styles.categoryHeader}>
        <TextDefault H5 bold>
          {'Browse Categories'}
        </TextDefault>
        <TouchableOpacity style={styles.rightBtn}
          onPress={() => navigation.navigate('Categories')}
        >
          <TextDefault H5 bolder>See All</TextDefault>
        </TouchableOpacity>
      </View>
    )
  }

  function renderHeader() {
    return (
      <>
        <View style={styles.headerContainer}>
          {categoryHeader()}
          {CategoryLoading ? <Spinner colors={colors.spinnerColor1} backColor={'transparent'} /> : CategoryError ? <TextError text={CategoryError.message} textColor={colors.fontThirdColor} style={textStyles.Light} /> :
            <FlatList
              data={CategoryData ? CategoryData.categories.slice(0, 5) : []}
              keyExtractor={item => item._id}
              contentContainerStyle={styles.categoryContainer}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.cardContainer}
                  onPress={() => navigation.navigate('SubCategories', { headerTitle: item.title, categoryId: item._id })}>
                  <View style={styles.textViewContainer}>
                    <View style={[styles.iconContainer, { backgroundColor: COLORS[index % 5] }]}>
                      <Image
                        style={styles.imgResponsive}
                        source={{ uri: item.image }}
                      />
                    </View>
                    <TextDefault numberOfLines={1} uppercase small light>
                      {item.title?? 'Current Location' }
                    </TextDefault>
                  </View>
                </TouchableOpacity>
              )}
            />
          }
        </View>
        <View style={styles.spacer} />
        <View style={styles.headerTitle}>
          <TextDefault H5 bold>
            {'Fresh Recommendations'}
          </TextDefault>
        </View>
      </>
    )
  }

  return (
    <View style={[styles.flex, styles.container]}>
      {/* Browswer Container */}
      <FlatList
        data={data}
        style={[styles.flex, styles.flatList]}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.containerBox, ...alignment.PBlarge }}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={emptyView}
        ListHeaderComponent={renderHeader}
        numColumns={2}
        renderItem={({ item }) => (
          <Card {...item} />
        )}
      />

      {/* Modal */}
      <LocationModal visible={modalVisible} onModalToggle={toggleModal}
        setFilters={setFilters} />
      <SearchModal visible={searchVisible} onModalToggle={toggleSearch} />
    </View>
  );
}

export default MainHome
