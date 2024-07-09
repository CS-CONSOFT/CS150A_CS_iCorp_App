import { ReactNode } from "react";
import { ActivityIndicator, Pressable, View, Text } from "react-native";
import { common003_01_styles } from "../../screens/003prevenda/003_01_produto/components/CommonStyles";
import { commonStyle } from "../../CommonStyle";
import ColorStyle from "../../ColorStyle";
import CustomLoading from "../loading/CustomLoading";

interface ReactProps {
    children: ReactNode,
    rightItem?: ReactNode,
    onClickItem?: (item?: any) => void,
    loadingClick?: boolean,
    title: string
}
const CustomCard004 = ({ children, rightItem, onClickItem, loadingClick, title }: ReactProps) => {

    if (loadingClick) {
        return <CustomLoading />
    }
    return (
        <Pressable onPress={() => {
            onClickItem!()
        }}>
            <View style={[common003_01_styles.containerRenderItem, { elevation: 3, marginBottom: 5 }]}>
                {/** IMAGEM */}
                <View style={[commonStyle.align_centralizar, {
                    width: 111,
                    backgroundColor: '#A3C5D9',
                    borderTopLeftRadius: 12,
                    borderBottomLeftRadius: 12
                }]}>
                    <Text style={[commonStyle.common_fontWeight_800, commonStyle.font_size_18]}>{(title || '').replace(".", "").replace(" ", "").substring(0, 2)}</Text>
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

export default CustomCard004;