import { alignment, colors } from "../../../utilities";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    safeAreaview: {
        backgroundColor: colors.headerbackground
    },
    mainContainer: {
        flexGrow: 1,
        backgroundColor: colors.themeBackground,
        ...alignment.PTlarge,
        ...alignment.PBlarge
    },
    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.horizontalLine
    },
    subContainer: {
        backgroundColor: colors.themeBackground,
        ...alignment.PLmedium,
        ...alignment.PRmedium,
    },
    marginAside: {
        ...alignment.MLmedium,
        ...alignment.MRmedium
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        ...alignment.MTsmall
    }
})
export default styles