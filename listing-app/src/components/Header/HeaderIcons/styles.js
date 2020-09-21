import { StyleSheet } from 'react-native'
import { alignment, colors, scale } from '../../../utilities'

const styles = StyleSheet.create({
  leftIconPadding: {
    ...alignment.PLmedium,
    ...alignment.PRlarge
  },
  rightIconPadding: {
    ...alignment.PLmedium,
    ...alignment.PRsmall
  },
  textIcon: {
    ...alignment.PLmedium,
    ...alignment.PRsmall
  },
  rightOuter: {
    height: "90%",
    justifyContent: "center"
  },
  rightContainer: {
    height: '95%',
    width: scale(140),
    justifyContent: 'center',
    backgroundColor: colors.containerBox,
    ...alignment.MRsmall,
    ...alignment.PLsmall
  },
})

export default styles
