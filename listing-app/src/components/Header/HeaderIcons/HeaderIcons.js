import React from 'react'
import {
  Ionicons,
  EvilIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/stack'
import PropTypes from 'prop-types'
import { scale } from '../../../utilities'
import { View } from 'react-native'

function BackButton(props) {
  if (props.icon === 'leftArrow') {
    return (
      <Ionicons
        name="ios-arrow-back"
        size={scale(30)}
        style={styles.leftIconPadding}
        color={props.iconColor}
      />
    )
  } else if (props.icon === 'menu') {
    return (
      <MaterialIcons
        name="menu"
        size={scale(30)}
        style={styles.leftIconPadding}
        color={props.iconColor}
      />
    )
  } else if (props.icon === 'share') {
    return (
      <EvilIcons
        name="share-google"
        size={scale(30)}
        style={styles.leftIconPadding}
        color={props.iconColor}
      />
    )
  } else {
    return (
      <EvilIcons
        name="close"
        size={scale(30)}
        style={styles.leftIconPadding}
        color={props.iconColor}
      />
    )
  }
}

function LeftButton(props) {
  const navigation = useNavigation()
  if (props.icon === 'back') {
    return (
      <HeaderBackButton
        labelVisible={false}
        backImage={() =>
          BackButton({ iconColor: props.iconColor, icon: 'leftArrow' })
        }
        onPress={() => {
          navigation.goBack()
        }}
      />
    )
  } else if (props.icon === 'close') {
    return (
      <HeaderBackButton
        labelVisible={false}
        backImage={() =>
          BackButton({ iconColor: props.iconColor, icon: 'close' })
        }
        onPress={() => {
          navigation.goBack()
          // navigation.dispatch(state => {
          //   const routes = state.routes.filter(r => r.name === 'Menu')
          //   return CommonActions.reset({
          //     ...state,
          //     routes,
          //     index: 0
          //   })
          // })
        }}
      />
    )
  }
}
function RightButton(props) {
  if (props.icon === 'share') {
    return (
      <HeaderBackButton
        labelVisible={false}
        backImage={() =>
          BackButton({ iconColor: props.iconColor, icon: 'share' })
        }
      />
    )
  }
}

BackButton.propTypes = {
  icon: PropTypes.string,
  iconColor: PropTypes.string.isRequired
}
LeftButton.propTypes = {
  icon: PropTypes.string,
  iconColor: PropTypes.string.isRequired
}
RightButton.propTypes = {
  icon: PropTypes.string,
  iconColor: PropTypes.string.isRequired
}

export { BackButton, LeftButton, RightButton }
