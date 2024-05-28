import FontAwesome from '@expo/vector-icons/Ionicons'

export interface ICustomIcon {
    icon: any,
    style?: object,
    iconColor?: string,
    iconSize?: number
}

const CustomIcon = ({ icon, style = { alignSelf: 'center' }, iconColor = '#000', iconSize = 32 }: ICustomIcon) => {
    return (
        <FontAwesome size={iconSize} style={style} name={icon} color={iconColor} />
    );
}

export default CustomIcon;