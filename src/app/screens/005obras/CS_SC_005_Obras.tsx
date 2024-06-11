import { Animated, Pressable, Text, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomCard_001 from "../../components/containers/CustomCard_001";
import CustomSearch from "../../components/search/CustomSearch";
import CustomSeparator from "../../components/lists/CustomSeparator";
import CustomIcon from "../../components/icon/CustomIcon";
import { ICON_NAME } from "../../util/IconsName";
import CustomVerticalSeparator from "../../components/lists/CustomVertticalSeparator";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const CS_SC_005_Obras = () => {
    return (
        <View>
            <CustomSearch
                placeholder="Pesquisar"
                onSearchPress={() => { }}
                onFilterClick={() => { }}
            />

            <RenderItem />

        </View>
    );
}

const RenderItem = () => {
    const [extraIconsRightOpen, setExtraIconsRightOpen] = useState(false);
    const leftSwipe = () => {
        setExtraIconsRightOpen(!extraIconsRightOpen);
    };
    return (
        <View>
            <CustomCard_001
                title="Obra 001"
                children={<CustomCardObraChildren leftSwipe={leftSwipe} isRightChildrenOpen={extraIconsRightOpen} />}
                rightChildren={<RightItem />}
                showRightChildren={extraIconsRightOpen}
            />
        </View>
    )
}

const RightItem = () => {
    const { navigate } = useNavigation()
    return (
        <View style={[commonStyle.common_columnItem,
        { backgroundColor: "#95B5C7", flex: 1, padding: 8, paddingVertical: 16, borderTopRightRadius: 16, borderBottomRightRadius: 16 },
        commonStyle.justify_content_space_btw]}>
            <CustomIcon icon={ICON_NAME.ENVIAR} onPress={() => navigate('Obras_Solicitacao')} />
            <CustomIcon icon={ICON_NAME.CHAT} onPress={() => { }} />
            <CustomIcon icon={ICON_NAME.PAPEL_LISTA_CONTORNADO} onPress={() => { }} />
            <CustomIcon icon={ICON_NAME.ANEXO} onPress={() => { }} />
        </View>
    )
}

const CustomCardObraChildren = ({ leftSwipe, isRightChildrenOpen }: { leftSwipe: () => void, isRightChildrenOpen: boolean }) => {

    return (
        <View>
            <View style={[commonStyle.common_columnItem, { alignSelf: 'center', padding: 4 }]}>
                <Text style={[commonStyle.common_fontWeight_600]}>Mateus Tau</Text>
                <View style={commonStyle.common_rowItem}>
                    <Text style={[commonStyle.common_fontWeight_600]}>PPTR: </Text>
                    <Text>2024</Text>
                </View>
            </View>

            <CustomSeparator />

            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_btw, { margin: 16 }]}>
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>Data Movimento</Text>
                    <Text>16/05/2024</Text>
                </View>
                <CustomVerticalSeparator />
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>Inicio Exec</Text>
                    <Text>18/05/2024</Text>
                </View>
                <CustomVerticalSeparator />
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>Fim Exec</Text>
                    <Text>18/05/2024</Text>
                </View>
            </View>
            <CustomSeparator />
            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_evl, { margin: 8 }]}>
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>Proprietário</Text>
                    <Text>Valter Gabriel</Text>
                </View>
                <View style={[commonStyle.common_columnItem]}>
                    <Text style={[commonStyle.common_fontWeight_600]}>Responsavel</Text>
                    <Text>Valter Gabriel</Text>
                </View>
            </View>

            <View style={{ alignSelf: 'center', marginTop: 16 }}>
                <Text style={[commonStyle.common_fontWeight_600]}>Em Andamento</Text>
            </View>

            <View style={[commonStyle.common_rowItem, commonStyle.justify_content_space_evl]}>
                <Text style={{ marginLeft: 32 }}></Text>
                <Pressable style={[commonStyle.common_button_style]} onPress={leftSwipe}>
                    <Text style={commonStyle.common_text_button_style}>Obras Filha</Text>
                </Pressable>
                {isRightChildrenOpen ? <CustomIcon icon={ICON_NAME.FLECHA_ESQUERDA} onPress={leftSwipe} /> : <CustomIcon icon={ICON_NAME.FLECHA_DIRETA} onPress={leftSwipe} />}

            </View>
        </View>
    )
}

export default CS_SC_005_Obras;