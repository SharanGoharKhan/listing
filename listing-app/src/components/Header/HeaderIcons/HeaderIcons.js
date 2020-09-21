import React, { useState } from 'react'
import {
  Ionicons,
  EvilIcons,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/stack'
import PropTypes from 'prop-types'
import { colors, scale } from '../../../utilities'
import { View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { TextDefault } from '../../Text'

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
  } else if (props.icon === 'dots') {
    return (
      <MaterialCommunityIcons
        name="dots-vertical"
        size={scale(30)}
        style={styles.rightIconPadding}
        color={props.iconColor}
      />
    )
  } else {
    return (
      <Ionicons
        name="md-close"
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
  const [password, setPassword] = useState(false)


  function togglePassword() {
    setPassword(prev => !prev)
  }
  if (props.icon === 'share') {
    return (
      <HeaderBackButton
        labelVisible={false}
        backImage={() =>
          BackButton({ iconColor: props.iconColor, icon: 'share' })
        }
      />
    )
  } else if (props.icon === 'dots') {
    return (
      <View>
        {password ? (
          <BorderlessButton
            onPress={props.onPress}
            borderless={false}
            style={styles.rightContainer}>
            <TextDefault textColor={colors.headerText} H5 bold style={styles.flex}>
              {'Share Profile'}
            </TextDefault>
          </BorderlessButton>
        ) : (
            <HeaderBackButton
              labelVisible={false}
              backImage={
                () => BackButton({ iconColor: props.iconColor, icon: 'dots' })
              }
              onPress={togglePassword}
            />
          )
        }
      </View >
    )
  }
  else if (props.icon === 'text') {
    return (
      <BorderlessButton
        onPress={props.onPress}
        borderless={false}
        style={styles.rightOuter}
      >
        <TextDefault textColor={props.iconColor} H5 style={styles.textIcon}>
          {props.title}
        </TextDefault>
      </BorderlessButton>
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
