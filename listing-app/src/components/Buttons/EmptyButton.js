import React from 'react';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../utilities';
import styles from './styles';
import PropTypes from 'prop-types'
import { TextDefault } from '../Text';

function EmptyButton(props) {

    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.emptyButton}
            onPress={props.onPress}>
            <TextDefault textColor={colors.buttonText} H4 bolder center>
                {props.title}
            </TextDefault>
        </TouchableOpacity>
    )
}
EmptyButton.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string.isRequired
}

export default React.memo(EmptyButton)