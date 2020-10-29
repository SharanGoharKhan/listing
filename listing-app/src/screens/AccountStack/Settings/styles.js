import { StyleSheet } from 'react-native'
import { alignment, colors, scale } from '../../../utilities'

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    mainContainer: {
        backgroundColor: colors.themeBackground
    },
    smallContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: colors.horizontalLine,
        borderBottomWidth: StyleSheet.hairlineWidth,
        ...alignment.Pmedium
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: scale(20),
        width: '85%',
        backgroundColor: colors.containerBox,
        borderRadius: scale(5),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        ...alignment.Plarge
    },
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignSelf: "flex-end",
        ...alignment.PTsmall
    },
    button: {
        ...alignment.PTmedium,
        ...alignment.PLlarge,
        ...alignment.MLsmall
    },
    buttonText: {
        borderBottomColor: colors.buttonbackground,
        borderBottomWidth: 2,
        ...alignment.PBxSmall,
    }
})
export default styles