import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface CustomProp {
    children: ReactNode,
    height: number
}
const CustomBottomItem = ({ children, height }: CustomProp) => {
    return (
        <View>
            <View style={[styles.container, { height: height }]}>
                {children}
            </View>
        </View>

    );
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E3E3E3"
    }

})

export default CustomBottomItem;

