import React from 'react'
import { View } from 'react-native'
import Image from 'react-native-image-progress';
import Swiper from 'react-native-swiper'
import styles from './style'

function Slider(props) {
    return (
        <Swiper style={styles.wrapper} >
            {props.IMG_LIST.map((item, i) => (
                <View style={styles.slide} key={i}>
                    <Image
                        style={styles.image}
                        source={{uri:item}}
                        resizeMode='cover'
                    />
                </View>
            ))}
        </Swiper>
    )
}
export default React.memo(Slider)