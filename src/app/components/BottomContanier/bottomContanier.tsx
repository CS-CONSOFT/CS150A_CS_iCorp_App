import { View, Pressable } from "react-native";
import { common003_01_styles } from "../../screens/003prevenda/003_01_produto/components/CommonStyles";
import { ReactNode } from "react";
import { useState } from "react";
import { commonStyle } from "../../CommonStyle";

interface ReactProps {
    children: ReactNode,
    image?: ReactNode,
    rightItem?: ReactNode,
    bottomItem?: ReactNode,
}


const BottomContanier = ({ image, children, rightItem, bottomItem }: ReactProps) => {

    const [open, setOpen] = useState<Boolean>(false)

    return (
        <View style={[{ height: "auto" }]}>
            <Pressable
                onPress={() => {
                    setOpen(!open)
                }}
            >
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
            {
                open && (
                    <View style={[commonStyle.common_margin_horizontal, commonStyle.card_bottom_shadow]}>
                        {bottomItem}
                    </View>
                )
            }
        </View>
    )
}

export default BottomContanier;