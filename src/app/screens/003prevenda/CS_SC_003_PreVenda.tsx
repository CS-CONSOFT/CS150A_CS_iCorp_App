import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { commonStyle } from "../../CommonStyle";
import CustomHorizontalFilter, { FilterHorizontalItem } from "../../components/filterHorizontal/CustomHorizontalFilter";
import CustomIcon from "../../components/icon/CustomIcon";
import CustomEmpty from "../../components/lists/CustomEmpty";
import CustomSeparator from "../../components/lists/CustomSeparator";
import { DataKey } from "../../enum/DataKeys";
import { Csicp_dd070_Completo } from "../../services/api/interfaces/prevenda/CS_IResPreVendaLista";
import { storeSimpleData } from "../../services/storage/AsyncStorageConfig";
import { FETCH_STATUS } from "../../util/FETCH_STATUS";
import { formatMoneyValue } from "../../util/FormatText";
import { ICON_NAME } from "../../util/IconsName";
import { ToastType, showToast } from "../../util/ShowToast";
import { getFinalDateToFilter, handleFetchPv, handleGenerateReport, handleLiberarPV, handleRetornarPV } from "../../view_controller/prevenda/PreVendaViewController";
import { stylesPreVenda } from "./PreVendaStyles";


const CS_SC_003_PreVenda = () => {
    const [pvList, setPvList] = useState<Csicp_dd070_Completo[]>([]);
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const { navigate } = useNavigation()
    const [currentDateFilter, setCurrentDateFilter] = useState(0)
    const [currentFilterOfTypePV, setFilterTypeOfPv] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [hasMoreData, setHasMoreData] = useState(true)
    const [hasChangedFilter, setHasChangedFilter] = useState(false)




    useEffect(() => {
        // Resetar os dados ao alterar o filtro
        if (hasChangedFilter) {
            setPvList([]);  // Limpar a lista de dados
            setCurrentPage(0);  // Resetar a páginação
            setHasMoreData(true);  // Garantir que há mais dados
        }

        _fetchPV(currentDateFilter);  // Recarregar os dados com o novo filtro
    }, [currentDateFilter, currentFilterOfTypePV]);



    const _fetchPV = async (dateFilterId: number) => {
        setStatus(FETCH_STATUS.LOADING)
        /**Formatando data */
        const todayDate: Date = new Date()

        const passDate = getFinalDateToFilter(dateFilterId)

        const todayDateString: string = todayDate.toISOString().slice(0, 10);
        const passDateString: string = passDate.toISOString().slice(0, 10);

        const isConsulta = currentFilterOfTypePV === 0
        const isFaturado = currentFilterOfTypePV === 1
        const isAprovado = currentFilterOfTypePV === 2

        handleFetchPv(passDateString, todayDateString, currentPage + 1, 10, isConsulta, isFaturado, isAprovado).then((res) => {
            try {
                if (res.csicp_dd070_Completo !== undefined) {
                    if (res.csicp_dd070_Completo.length !== 0 || res.csicp_dd070_Completo.length !== undefined) {
                        setPvList(prevData => [...prevData, ...res.csicp_dd070_Completo]);
                        setCurrentPage(prevPage => prevPage + 1);
                        //se a pagina atual for maior ou igual ao total de paginas, nao precisa mais chamar a rolagem
                        if (currentPage >= res.Contador.cs_number_of_pages) {
                            setHasMoreData(false)
                        }
                    }
                }
                setStatus(FETCH_STATUS.SUCCESS)

            } catch (error) {
                navigate('Menu')
                showToast(ToastType.ERROR, "Erro", "Indefinição na resposta do servidor")
            }
        }).catch((err) => {
            navigate('Menu')
            showToast(ToastType.ERROR, "Falha na requisição", err.response.data.Errors[0])
        })
    }



    const isLoading = status === FETCH_STATUS.LOADING
    const handleLoadMore = () => {
        if (!isLoading && hasMoreData) {
            setStatus(FETCH_STATUS.LOADING)
            if (pvList.length > 9) {
                _fetchPV(currentDateFilter)
            } else {
                setStatus(FETCH_STATUS.SUCCESS)
            }
        }
    };

    function goToDetails(currentPv: Csicp_dd070_Completo) {
        storeSimpleData(DataKey.CurrentPV, currentPv.DD070_Nota.csicp_dd070.DD070_Id)
        navigate('Pre_Venda_Detalhes_001', {
            currentPv: currentPv.DD070_Nota.csicp_dd070.DD070_ProtocolNumber
        })
    }


    return (
        <View style={{ flex: 1 }}>
            <View>
                <Text style={stylesPreVenda.textTitle}>Lista Geral</Text>

                <CustomHorizontalFilter
                    dataList={[
                        { id: 0, label: 'Hoje' },
                        { id: 1, label: 'Ontem' },
                        { id: 2, label: '5 dias' },
                        { id: 3, label: '15 dias' },
                        { id: 4, label: '30 dias' },
                    ]}
                    onPress={(currentItem) => {
                        if (!isLoading) {
                            setCurrentDateFilter(currentItem)
                            setHasChangedFilter(true)
                            setCurrentPage(0)
                        }
                    }}
                    currentItemSelected={currentDateFilter}
                />
                <CustomSeparator />


                <View style={commonStyle.common_rowItem}>
                    <FilterHorizontalItem
                        item={{ id: 0, label: 'Consulta' }}
                        onPress={(currentItem) => {
                            if (!isLoading) {
                                setFilterTypeOfPv(currentItem)
                                setCurrentDateFilter(0)
                                setHasChangedFilter(true)
                                setCurrentPage(0)
                            }

                        }}
                        currentItemSelected={currentFilterOfTypePV}
                    />

                    <FilterHorizontalItem
                        item={{ id: 1, label: 'Faturado' }}
                        onPress={(currentItem) => {
                            if (!isLoading) {
                                setFilterTypeOfPv(currentItem)
                                setHasChangedFilter(true)
                                setCurrentPage(0)
                            }
                        }
                        }

                        currentItemSelected={currentFilterOfTypePV}
                    />


                    <FilterHorizontalItem
                        item={{ id: 2, label: 'Aprovado' }}
                        onPress={(currentItem) => {
                            if (!isLoading) {
                                setFilterTypeOfPv(currentItem)
                                setHasChangedFilter(true)
                                setCurrentPage(0)
                            }
                        }}
                        currentItemSelected={currentFilterOfTypePV}
                    />
                </View>


                <FlatList
                    style={{ height: '70%' }}
                    data={pvList.toReversed()}
                    ListFooterComponent={() => <>
                        {isLoading && <ActivityIndicator size={32} color={"#000"} style={{ padding: 16 }} />}
                    </>}
                    ListEmptyComponent={() => !isLoading && <CustomEmpty text={"Nenhuma pré venda encontrada"} />}
                    renderItem={({ item }) => <PreVendaRenderItem item={item}
                        onPress={() => goToDetails(item)} />}
                    keyExtractor={(item) => item.DD070_Nota.csicp_dd070.DD070_Id.toString()}
                    //extraData={pvList}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.1}
                />
                {/* 
                {paginationArray !== undefined && paginationArray.length > 1 && (
                    <View style={{ height: '30%' }}>
                        <Custom_Pagination
                            onPagePress={(page) => _fetchPV(currentDateFilter)}
                            paginationArray={paginationArray} />
                    </View>
                )} */}


            </View>
        </View >
    );
}
export default CS_SC_003_PreVenda;


/** RENDER ITEM */
function PreVendaRenderItem({ item, onPress }: { item: Csicp_dd070_Completo, onPress: () => void }) {
    const [year, month, day] = item.DD070_Nota.csicp_dd070.DD070_Data_Emissao.split('-')
    const [isLoading, setIsLoading] = useState(false)
    const { navigate } = useNavigation()


    enum NOTA_SIT {
        CONSULTA = "Consulta",
        APROVADO = "Aprovado"
    }

    function liberarPV(): void {
        setIsLoading(true)
        handleLiberarPV({ cs_bb012_id: item.DD070_Nota.csicp_bb012.ID, cs_pv_id: item.DD070_Nota.csicp_dd070.DD070_Id }).then((res) => {
            setIsLoading(false)
            if (!res.IsErro) {
                showToast(ToastType.INFO, "Aguarde", "Estamos processando!")
            } else {
                showToast(ToastType.ERROR, "Falha", res.Msg)
            }
        }).catch((err) => {
            setIsLoading(false)
            showToast(ToastType.ERROR, "Falha", err.response.data.Errors[0])
        })
    }

    function retornarPv(): void {
        setIsLoading(true)
        handleRetornarPV({ cs_pv_id: item.DD070_Nota.csicp_dd070.DD070_Id }).then((res) => {
            setIsLoading(false)
            if (!res.IsErro) {
                showToast(ToastType.SUCCESS, "Sucesso", res.Msg)
            } else {
                showToast(ToastType.ERROR, "Falha", res.Msg)
            }
        }).catch((err) => {
            setIsLoading(false)
            showToast(ToastType.ERROR, "Falha", err.response.data.Errors[0])
        })
    }

    function gerarReport(): void {
        setIsLoading(true)
        handleGenerateReport({ cs_pv_id: item.DD070_Nota.csicp_dd070.DD070_Id }).then((htmlContent) => {
            setIsLoading(false);
            navigate('PDF', { htmlContent: htmlContent })
        }
        )

    }

    return (
        <Pressable onPress={onPress}>
            <View style={stylesPreVenda.containerRenderItem}>

                <View style={stylesPreVenda.containerRenderItemLeft}>
                    <Text style={stylesPreVenda.containerRenderItemLeftText}>{day}</Text>
                    <Text style={stylesPreVenda.containerRenderItemLeftText}>{month}</Text>
                    <Text style={stylesPreVenda.containerRenderItemLeftText}>{year}</Text>
                </View>

                <View style={stylesPreVenda.containerRenderItemRight}>
                    <Text style={stylesPreVenda.containerRenderItemRightTextBold}>N° {item.DD070_Nota.csicp_dd070.DD070_ProtocolNumber} - {item.DD070_Nota.csicp_bb012.BB012_Codigo}</Text>
                    <Text style={stylesPreVenda.containerRenderItemRightTextBold}>{item.DD070_Nota.csicp_bb012.BB012_Nome_Cliente}</Text>
                    <Text style={stylesPreVenda.containerRenderItemRightPriceText}>{formatMoneyValue(item.DD070_Nota.csicp_dd070.DD070_Total_Liquido || 0)}</Text>
                    <Text style={stylesPreVenda.containerRenderItemRightTextNormal}>{item.DD070_Nota.csicp_sy001_Atendente.SY001_Nome}</Text>
                    <View>
                        <Text style={[stylesPreVenda.containerRenderItemRightTextNormal]}>{item.DD070_Nota.csicp_dd070_Sit.Label}</Text>
                    </View>
                </View>

                <View style={[stylesPreVenda.containerRenderItemIcons, commonStyle.justify_content_space_evl]}>
                    {isLoading && (
                        <ActivityIndicator color={"#c3c3c3"} size={32} style={commonStyle.align_centralizar} />
                    )}

                    {!isLoading && (
                        <>
                            {item.DD070_Nota.csicp_dd070_Sit.Label === NOTA_SIT.CONSULTA && (
                                <>
                                    <CustomIcon iconSize={32} icon={ICON_NAME.CHECK_CONTORNADO} onPress={() => liberarPV()} />
                                </>
                            )}

                            {item.DD070_Nota.csicp_dd070_Sit.Label === NOTA_SIT.APROVADO && (
                                <CustomIcon iconSize={32} icon={ICON_NAME.APROVED} onPress={() => retornarPv()} />
                            )}

                            <CustomIcon iconSize={32} icon={ICON_NAME.PRINT} onPress={() => gerarReport()} />
                        </>
                    )}
                </View>

            </View>
        </Pressable>
    )
}
