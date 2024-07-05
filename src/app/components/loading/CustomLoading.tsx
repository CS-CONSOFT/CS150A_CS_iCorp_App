import { ActivityIndicator } from "react-native";
import { commonStyle } from "../../CommonStyle";
import ColorStyle from "../../ColorStyle";

const CustomLoading = () => {
    return (
        <ActivityIndicator style={[commonStyle.align_centralizar, { height: "100%" }]} size="large" color={ColorStyle.colorPrimary200} />
    );
}

export default CustomLoading;