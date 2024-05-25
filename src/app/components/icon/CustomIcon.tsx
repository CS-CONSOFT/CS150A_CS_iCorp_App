import FontAwesome from '@expo/vector-icons/Ionicons'

export interface ICustomIcon {
    icon: any
}

const CustomIcon = ({ icon }: ICustomIcon) => {
    return (
        <FontAwesome size={32} style={{
            alignSelf: 'center'
        }} name={icon} />
    );
}

export default CustomIcon;