import FontAwesome from '@expo/vector-icons/Ionicons'

export interface ICustomIcon {
    title: any
}

const CustomIcon = ({ title }: ICustomIcon) => {
    return (
        <FontAwesome size={32} style={{
            alignSelf: 'center'
        }}  name={title} />
    );
}

export default CustomIcon;