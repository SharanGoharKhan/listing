import { StyleSheet, Dimensions } from 'react-native'
import { alignment, colors, scale, textStyles } from '../../../utilities'
const { height } = Dimensions.get('window')


const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    width100: {
        width: "100%",
    },
    safeAreaViewStyles: {
        backgroundColor: colors.headerbackground
    },
    mainContainer: {
        backgroundColor: colors.themeBackground
    },
    headerContainer: {
        width: '100%',
        height: height * 0.07,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'transparent'
    },
    headerContents: {
        width: "90%",
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: "center",
        ...alignment.PTsmall
    },
    categoryBtn: {
        flexDirection: "row",
        alignItems: 'center',
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: StyleSheet.hairlineWidth,
        ...alignment.PTsmall,
        ...alignment.PBsmall,
        ...alignment.MBlarge
    },
    subContainer: {
        width: "100%",
        alignItems: "center",
        ...alignment.PTsmall,
        ...alignment.PBsmall
    },
    subContainerRow: {
        width: "100%",
        alignSelf: "center",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        ...alignment.PTsmall,
        ...alignment.PBsmall
    },
    boxContainer: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: scale(5),
        alignItems: "center",
        justifyContent: "center"
    },
    priceFrom: {
        width: '40%',
        height: scale(30),
    },
    limitPrice: {
        ...alignment.PLxSmall,
        ...alignment.PRxSmall
    },
    trackStyle: {
        height: scale(3),
        backgroundColor: colors.selected
    },
    trackLine: {
        backgroundColor: colors.buttonbackground
    },
    markerStyle: {
        borderWidth: scale(8),
        borderColor: colors.buttonbackground,
        backgroundColor: colors.themeBackground,
    },
    conditionBox: {
        width: '32%',
        height: scale(40),
    },
    sortBox: {
        height: scale(40),
        ...alignment.PLsmall,
        ...alignment.PRsmall,
        ...alignment.MRsmall
    },
    scrollviewContent: {
        alignItems: "center",
        ...alignment.PTsmall,
        ...alignment.PBsmall
    },
    notSelected: {
        backgroundColor: colors.themeBackground,
        borderColor: colors.buttonbackground
    },
    selected: {
        backgroundColor: colors.selected,
        borderColor: colors.selectedText
    },
    unSelectedText: {
        color: colors.fontMainColor,
    },
    selectedText: {
        color: colors.selectedText,
        ...textStyles.Bold
    },
    buttonContainer: {
        height: scale(60),
        width: "100%",
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: colors.themeBackground,
        borderTopColor: colors.headerbackground,
        borderTopWidth: scale(3)
    },
    button: {
        backgroundColor: colors.buttonbackground,
        width: "90%",
        height: scale(45),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: scale(5)
    },
    closeBtn: {
        flex: 1,
        flexDirection: "row",
    },
    title:{
        flex:3,
        height:50
    },
    backBtn: {
        flex:2,
        height:50,
    },
})

export default styles