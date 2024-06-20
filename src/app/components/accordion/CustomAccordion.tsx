import { ReactNode, useState } from "react";
import { Animated, Pressable, View, StyleSheet } from "react-native";
import ColorStyle from "../../ColorStyle";

interface rProp {
    visibleChildren: ReactNode
    hiddenChildren: ReactNode
}
const CustomAccordion = ({ visibleChildren, hiddenChildren }: rProp) => {

    const [openBottom, setOpenBottom] = useState(false);
    const [dragY] = useState(new Animated.Value(0));

    function animateDownSwipe(extraBottomOpen: boolean, dragY: Animated.Value) {
        const toValue = extraBottomOpen ? 0 : -15;
        Animated.timing(dragY, {
            toValue,
            duration: 150,
            useNativeDriver: false,
        }).start();
    }

    function downSwipe(): void {
        animateDownSwipe(openBottom, dragY)
        setOpenBottom(!openBottom);
    }



    return (
        <Pressable onPress={() => downSwipe()}  style={styles.accordion}>
            <Animated.View>
                {visibleChildren}
            </Animated.View>

            {/** CONTEUDO EXIBIDO AO ABRIR O ITEM */}
            {openBottom && (
                <View>
                    {hiddenChildren}
                </View>
            )}

        </Pressable>
    );
}

export default CustomAccordion;

export const styles = StyleSheet.create({
    accordion:{
        borderRadius: 10,
        borderColor: ColorStyle.colorneutrais200,
        borderWidth: 2,
        padding: 5,
        marginBottom: 10,
    }
});
