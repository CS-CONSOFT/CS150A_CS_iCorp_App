import React from 'react';
import { View } from 'react-native';

const CustomVerticalSeparator = () => {
    return (
        <View
            style={{
                borderRightColor: '#C3C3C3',
                borderRightWidth: 1,
                height: '100%', // Ajusta a altura do separador vertical
            }}
        />
    );
}

export default CustomVerticalSeparator;
