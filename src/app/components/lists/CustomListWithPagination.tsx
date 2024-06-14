import { ReactNode } from "react";
import { FlatList, View } from "react-native";
import Custom_Pagination from "../pagination/Custom_Pagination";
import CustomEmpty from "./CustomEmpty";

interface CustomListWithPaginationProps {
    list: any[];
    renderItemComponent: (item: any) => ReactNode;
    getPage: (page: number) => void;
    emptyText: string;
    totalPages?: number;
    paginationArray?: number[]
}

const CustomListWithPagination = ({ list, renderItemComponent, getPage, totalPages, paginationArray, emptyText }: CustomListWithPaginationProps) => {
    function getPaginationArray(): number[] {
        if (totalPages) {
            let pageArray: number[] = []
            for (let index = 1; index <= totalPages; index++) {
                pageArray.push(index)
            }
            return pageArray
        } else {
            return paginationArray!
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={list}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={<CustomEmpty text={emptyText} />}
                renderItem={({ item }) => <RenderItem children={renderItemComponent(item)} />}
            />
            {list !== undefined && list.length > 0 && (
                <Custom_Pagination
                    onPagePress={(page) => getPage(page)}
                    paginationArray={getPaginationArray()} />
            )}
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