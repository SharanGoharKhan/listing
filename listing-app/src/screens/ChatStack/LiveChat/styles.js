import { StyleSheet } from 'react-native';
import { colors } from '../../../utilities';

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    safeAreaViewStyles: {
        backgroundColor: colors.headerbackground
    },
    mainContainer: {
        backgroundColor: colors.themeBackground
    },
    box: {
        height: 100,
        width: 100,
        backgroundColor: 'red'
    }
})
export default styles