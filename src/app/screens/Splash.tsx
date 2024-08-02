import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const Splash = () => {
    const { navigate } = useNavigation()
    useEffect(() => {
        setTimeout(() => {
            navigate('Config_Ambiente', { maintainOpenConfig: false })
        }, 100)
    }, [])
    return (
        <></>
    );
}

export default Splash;