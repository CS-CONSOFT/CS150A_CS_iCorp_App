import { useState } from "react";
import { ActivityIndicator, Text, TouchableHighlight } from "react-native";


export interface CustomButtonProps {
    title: string,
    onPress: (prop?: any) => void,
    onLongPress?: () => void,
    disabled?: boolean,
    buttonStyle: object,
    textStyle: object,
}


const CustomButton = ({
    title,
    onPress,
    onLongPress,
    disabled = false,
    buttonStyle = {}, textStyle = {} }: CustomButtonProps) => {

    const [isLoading, setIsLoading] = useState(false)

    const handlePress = () => {
        setIsLoading(true);
        const done = () => setIsLoading(false);
        onPress(done);
    };


    return (
        <TouchableHighlight
            onPress={handlePress}
            disabled={disabled}
            style={buttonStyle}
            onLongPress={onLongPress}
            underlayColor='white'
        >
            {isLoading ? <ActivityIndicator /> : <Text style={textStyle}>{title}</Text>}
        </TouchableHighlight>
    );
}

export default CustomButton;