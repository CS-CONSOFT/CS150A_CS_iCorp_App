import { FlatList } from "react-native";
import Separator from "./Separator";
import React from "react";


interface ListComponentProps {
    dataList: [],
    itemListIdentifier: string,
    renderItemComponent: (item: any) => JSX.Element;
    emptyListComponent?: (item: any) => JSX.Element;
    extraData?: string //extraData={selectedId} to FlatList we make sure FlatList itself will re-render when the state changes. Without setting this prop, FlatList would not know it needs to re-render any items because it is a PureComponent and the prop comparison will not show any changes.
}

const ListComponent = ({ dataList, itemListIdentifier, renderItemComponent, emptyListComponent, extraData = '' }: ListComponentProps) => {
    return (
        <FlatList
            ItemSeparatorComponent={Separator}
            data={dataList}
            renderItem={({ item }) => renderItemComponent(item)}
            ListEmptyComponent={emptyListComponent}
            keyExtractor={(currentItem) => currentItem[itemListIdentifier]}
            extraData={extraData}
        />
    );
}

export default ListComponent;