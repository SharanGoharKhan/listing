import { FontAwesome } from '@expo/vector-icons';
import { useNavigationState } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View } from 'react-native';
import UserContext from '../../../context/user';
import { colors, scale } from '../../../utilities';
import styles from './styles';

function SellTab(props) {
    const state = useNavigationState(state => state.index)
    // console.log(state)
    const { isLoggedIn } = useContext(UserContext)
    if (props.focused || state === 5 || state === 6 || state === 7)
        return null
    else if ((state === 1 || state === 3) && !isLoggedIn) {
        return null
    }
    else {
        return (
            <View
                style={styles.emptyButton}>
                <FontAwesome name='plus' size={scale(20)} color={colors.buttonbackground} />
            </View>
        )
    }
}

export default React.memo(SellTab)