import { FlatList, Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import { IResGetPv } from "../../services/api/interfaces/prevenda/CS_Common_IPreVenda";
import { useEffect, useState } from "react";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { handleGetPv } from "../../view_controller/prevenda/PreVendaViewController";
import CustomCard_001 from "../../components/cards/CustomCard_001";
import CustomSeparator from "../../components/lists/CustomSeparator";
import CustomVerticalSeparator from "../../components/lists/CustomVertticalSeparator";
import CustomIcon from "../../components/icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";

const CS_SC_010_Requisicao = () => {
    const [pv, setPv] = useState<IResGetPv>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const [extraIconsRightOpen, setExtraIconsRightOpen] = useState(false);
    const leftSwipe = () => {
        setExtraIconsRightOpen(!extraIconsRightOpen);
    };

    useEffect(() => {
        getCurrentPv()
    }, [])


    function getCurrentPv() {
        setStatus(FETCH_STATUS.LOADING)
        //pega a pv
        handleGetPv().then((res) => {
            if (res !== undefined) {
                setPv(res)
                setStatus(FETCH_STATUS.SUCCESS)
            }
        })
    }


    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity style={commonStyle.common_button_style}>
                    <Text style={commonStyle.common_text_button_style}>Gerar</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={[{ key: 1, value: 2 }]}
                key={''}
                renderItem={({ item }) =>
                    <CustomCard_001
                        title={"2024"}
                        children={<RenderItem leftSwipe={leftSwipe} isRightChildrenOpen={extraIconsRightOpen} />}
                        rightChildren={<RightItem />}
                        showRightChildren={true}
                    />

                }
            />

        </SafeAreaView>
    );
}

const RenderItem = ({ leftSwipe, isRightChildrenOpen }: { leftSwipe: () => void, isRightChildrenOpen: boolean }) => {
    return (
        <View>
            <View style={[commonStyle.common_columnItem, { alignSelf: 'center', padding: 4 }]}>
                <Text style={[commonStyle.common_fontWeight_600]}>PPTR: {123}</Text>
            </View>

            <CustomSeparator />

            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw, { margin: 16 }]}>
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>Data</Text>
                    <Text>{15}</Text>
                </View>
                <CustomVerticalSeparator />
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>Destino</Text>
                    <Text>{15}</Text>
                </View>
                <CustomVerticalSeparator />
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>Origem</Text>
                    <Text>{15}</Text>
                </View>
            </View>
            <CustomSeparator />
            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_evl, { margin: 8 }]}>
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>Requisitante</Text>
                    <Text>{15}</Text>
                </View>
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>Atendente</Text>
                    <Text>{15}</Text>
                </View>
            </View>

            <View style={{ alignSelf: 'center', marginTop: 16, padding: 16 }}>
                <Text style={[commonStyle.common_fontWeight_600]}>{"Aberto"}</Text>
            </View>
        </View>
    )
}

const RightItem = () => {
    return (
        <View style={[commonStyle.common_columnItem,
        { backgroundColor: "#95B5C7", flex: 1, padding: 8, paddingVertical: 16, borderTopRightRadius: 16, borderBottomRightRadius: 16 },
        commonStyle.justify_content_space_btw]}>
            <CustomIcon icon={ICON_NAME.ENVIAR} onPress={() => { }} />
            <CustomIcon icon={ICON_NAME.FECHAR} onPress={() => {
                { }
            }} />
            <CustomIcon icon={ICON_NAME.LIXEIRA} onPress={() => {
                { }
            }} />
        </View>
    )
}

export default CS_SC_010_Requisicao;