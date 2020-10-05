import { StyleSheet } from 'react-native'
import { colors, scale } from '../../../utilities'

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    emptyButton: {
        width: scale(50),
        height: scale(50),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.themeBackground,
        borderRadius: scale(25),
        marginBottom: scale(35),
        borderWidth: scale(5),
        borderBottomColor: colors.feature,
        borderTopColor: colors.spinnerColor,
        borderRightColor: colors.activeLine,
        borderLeftColor: colors.buttonbackground
    },
})
export default styles