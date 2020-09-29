import { StyleSheet } from 'react-native'
import { alignment, colors, scale } from '../../../utilities'

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    mainContainer: {
        backgroundColor: colors.themeBackground
    },
    subContainer: {
        backgroundColor: colors.themeBackground,
        ...alignment.PLmedium,
        ...alignment.PRmedium,
        ...alignment.MTlarge
    },
    emptyContainer: {
        backgroundColor: colors.containerBox,
        justifyContent: "center",
        alignItems: "center",
        ...alignment.PLmedium,
        ...alignment.PRmedium,
    },
    emptyImage: {
        width: scale(150),
        height: scale(150)
    },
    smallContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: StyleSheet.hairlineWidth,
        ...alignment.PTmedium,
        ...alignment.PBmedium,
    },
    buttonView: {
        width: "100%",
        ...alignment.PBsmall
    }

})
export default styles