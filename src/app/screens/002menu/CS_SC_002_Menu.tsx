import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, ImageBackground, SafeAreaView, Text, View } from "react-native";
import CustomHeaderUserInfo from "../../components/headers/CustomHeaderUserInfo";
import CustomItemIconTitleHalfRoundedWhite from "../../components/items/CustomItemIconTitleHalfRoundedWhite";
import { DataKey } from "../../enum/DataKeys";
import { checkIfUserIsLogged, logout } from "../../view_controller/login/LoginViewController";
import { configureMenuByRule } from "./ListMenu";
import CustomLoading from "../../components/loading/CustomLoading";
import { IMenuItem, MenuTitle } from "../../services/api/interfaces/login/CS_IPostLoginData";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import appConfig from '../../../../app.json';

const CS_SC_002_Menu = () => {
    const { navigate } = useNavigation()

    const [listOfMenu, setListOfMenu] = useState<IMenuItem[]>()
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)

    useEffect(() => {
        setStatus(FETCH_STATUS.LOADING)
        checkIfUserIsLogged().then((isLogged) => {
            if (!isLogged) {
                logout(DataKey.LoginResponse).then(() => {
                    navigate('Login')
                })
                setStatus(FETCH_STATUS.IDLE)
            } else {
                configureMenuByRule().then((res) => {
                    setListOfMenu(res)
                    setStatus(FETCH_STATUS.IDLE)
                })
            }
        })
    }, [])


    function scHandleClickMenuItem(menuTitle: string) {
        switch (menuTitle) {
            case MenuTitle.PV:
                navigate('Pre_Venda')
                break;
            case MenuTitle.CLIENTE:
                navigate('TabListCliente')
                break;
            case MenuTitle.COMANDA:
                navigate('ComandaLista')
                break;
            case MenuTitle.ENTREGA:
                navigate('Entrega')
                break;
            case MenuTitle.OBRAS:
                navigate('Obras')
                break;
            case MenuTitle.PRODUTO:
                navigate('Consulta_Produtos', { cameFromPv: false, insertComanda: false })
                break;
            case MenuTitle.SERIE:
                navigate('Serie')
                break;
        }
    }

    const isLoading = status === FETCH_STATUS.LOADING
    if (isLoading) {
        return <CustomLoading />
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../../assets/Pre-venda.png')}
                style={{ flex: 1 }}
            >
                <View style={{
                    paddingVertical: 16,
                    flex: 1,
                }}>
                    <CustomHeaderUserInfo />

                    <FlatList
                        data={listOfMenu}
                        keyExtractor={item => item.id.toString()}
                        numColumns={3}
                        renderItem={({ item }) => {
                            return (
                                <CustomItemIconTitleHalfRoundedWhite
                                    title={item.title}
                                    onPress={() => scHandleClickMenuItem(item.title)}
                                    iconName={item.iconName}
                                />
                            );
                        }}
                    />
                    <Text style={{ color: "#fff", padding: 8 }}>-Versão: {appConfig.expo.version}</Text>
                </View>

            </ImageBackground>
        </SafeAreaView>
    );
}


export default CS_SC_002_Menu;