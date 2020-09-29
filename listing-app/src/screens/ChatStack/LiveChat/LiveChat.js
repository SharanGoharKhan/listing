import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LiveHeader } from '../../../components'
import styles from './styles'

function LiveChat() {
    const navigation = useNavigation()
    
    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <LiveHeader />
        })
    }, [])


    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.flex, styles.safeAreaViewStyles,]}>
            <View style={styles.flex}>

            </View>

        </SafeAreaView>
    )
}

export default React.memo(LiveChat)