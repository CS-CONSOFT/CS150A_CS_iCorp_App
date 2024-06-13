import { ReactNode } from "react";
import { FlatList, View } from "react-native";
import Custom_Pagination from "../pagination/Custom_Pagination";

interface CustomListWithPaginationProps {
    list: any[];
    renderItemComponent: (item: any) => ReactNode;
    getPage: (page: number) => void;
    totalItens?: number;
    paginationArray?: number[]
}

const CustomListWithPagination = ({ list, renderItemComponent, getPage, totalItens, paginationArray }: CustomListWithPaginationProps) => {

    function getPaginationArray(): number[] {
        if (totalItens) {
            let pageArray: number[] = []
            for (let index = 1; index <= totalItens; index++) {
                pageArray.push(index)
            }
            return pageArray
        } else {
            return paginationArray!
        }
    }

    return (
        <View>
            <FlatList
                data={list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <RenderItem children={renderItemComponent(item)} />}
            />
            <Custom_Pagination
                onPagePress={(page) => getPage(page)}
                paginationArray={getPaginationArray()} />
        </View>
    );
}

const RenderItem = ({ children }: { children: ReactNode }) => {
    return (
        <View>
            {children}
        </View>
    )
}

export default CustomListWithPagination;