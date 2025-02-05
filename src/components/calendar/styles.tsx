import { StyleSheet } from "react-native";
import { screenWidth, vh, vw } from "../../utils/dimensions";
import { colors } from "../../utils/constants/colors";

const styles = StyleSheet.create({
    container: {
        margin: vw(10),
    },
    selectDateMainView: {
        flexDirection:'row',
        justifyContent: 'space-between',
        marginBottom: vh(10),
    },
    selectDateView: {
        borderWidth: 1,
        borderColor: colors.GRAY_300,
        borderRadius: vh(10),
        padding: vh(10),
        alignItems: 'center'
    },
    selectDateViewSize: {
        width: "47%"
    },
    calView: {
        borderWidth: 1,
        borderColor: colors.GRAY_300,
        borderRadius: vh(10),
        padding: vh(10)
    },
    customTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    customTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00BBF2'
    },
    customHeader: {
        marginHorizontal: vw(15),
        justifyContent: 'space-between',
        rowGap:vh(15),
    },
    customSubHeader: {
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    txt:{
        fontSize:16,
        fontWeight:'700',
        color:'gray',
    },
    txt1:{
        fontWeight:'600'
    },
    img:{
        width:vw(20),
        height:vh(20),
    },
    month:{
        fontSize:16,
        fontWeight:'600',
        color:colors.INPUT_ACTIVE_COLOR
    },
    dayName:{
        color:'gray',
        fontSize: 13,
        width: vw(screenWidth/7.61)
    }
})
export default styles;