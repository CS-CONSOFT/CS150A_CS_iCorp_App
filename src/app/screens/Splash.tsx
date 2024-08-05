import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { getSimpleData, storeSimpleData } from "../services/storage/AsyncStorageConfig";
import { DataKey } from "../enum/DataKeys";

const Splash = () => {
    const { navigate } = useNavigation()
    useEffect(() => {
        getSimpleData(DataKey.IsFirstTimeOpenApp).then((res) => {
            if (res === undefined) {
                storeSimpleData(DataKey.IsFirstTimeOpenApp, "0")
            } else {
                storeSimpleData(DataKey.IsFirstTimeOpenApp, "-1")
            }
        })
        setTimeout(() => {
            navigate('Config_Ambiente')
        }, 100)
    }, [])
    return (
        <></>
    );
}

export default Splash;