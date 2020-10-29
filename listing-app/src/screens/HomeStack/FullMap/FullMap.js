import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { Platform } from 'react-native'
import MapView, { Circle, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from '../../../utilities'
import styles from './styles'

const LATITUDE_DELTA = 0.0022
const LONGITUDE_DELTA = 0.0021

function FullMap() {
  const navigation = useNavigation()
  const route = useRoute()
  const region = route.params?.region ?? null
  const title = route.params?.title ?? null


  useLayoutEffect(() => {
    navigation.setOptions({
      title: title
    })
  }, [navigation, route])

  return (
    <SafeAreaView edges={['bottom']} style={[styles.flex, styles.mainBackground]}>
      <MapView
        style={styles.flex}
        initialRegion={region}
        loadingEnabled={true}
        showsUserLocation={true}
        provider={Platform.select({
          ios: PROVIDER_DEFAULT,
          android: PROVIDER_GOOGLE
        })}
        showsTraffic={false}
      >
        <Circle center={region}
          radius={scale(250)}
          strokeColor={'rgba(28, 115, 112, 0.9)'}
          fillColor={'rgba(28, 115, 112, 0.4)'}
        />

      </MapView>
    </SafeAreaView>
  )
}
export default React.memo(FullMap)