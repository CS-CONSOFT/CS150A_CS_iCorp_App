import { ReactNode, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { common003_01_styles } from "../../screens/003prevenda/003_01_produto/components/CommonStyles";
import ColorStyle from "../../ColorStyle";
import { commonStyle } from "../../CommonStyle";
import CustomLoading from "../loading/CustomLoading";


interface ReactProps {
    children: ReactNode,
    image: ReactNode,
    rightItem?: ReactNode,
    onClickItem?: (item?: any) => void,
    loadingClick?: boolean
}
const CustomProduct = ({ children, image, rightItem, onClickItem, loadingClick }: ReactProps) => {

    if (loadingClick) {
        return <CustomLoading />
    }
    return (
        <Pressable onPress={() => {
            onClickItem!()
        }}>
            <View style={[common003_01_styles.containerRenderItem,
            common003_01_styles.boxShadow, { marginBottom: 5 }]}>
                {/** IMAGEM */}
                <View style={common003_01_styles.productContainerLeft}>
                    {image}
                </View>
                {/** MEIO DO COMPONENTE, ONDE MOSTRA OS VALORES */}
                <View style={common003_01_styles.productContainerMiddle}>
                    {
                        children
                    }
                </View>
                <View>
                    {/*Btn*/
                        rightItem
                    }
                </View>
            </View>
        </Pressable>
    );
}

export default CustomProduct;