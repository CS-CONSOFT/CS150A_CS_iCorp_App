import FontAwesome from '@expo/vector-icons/Ionicons';

export interface ICustomIcon {
    icon: any,
    style?: object,
    iconColor?: string,
    iconSize?: number,
    onPress?: (prop?: any) => void
}

const CustomIcon = ({ onPress, icon, style = { alignSelf: 'center' }, iconColor = '#000', iconSize = 32 }: ICustomIcon) => {
    return (
        <FontAwesome size={iconSize} style={style} name={icon} color={iconColor} onPress={onPress} />
    );
}

export default CustomIcon;