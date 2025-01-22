import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { commonStyle } from '../../CommonStyle';
import { useNavigation } from '@react-navigation/native';
import { getSimpleData, storeSimpleData } from '../../services/storage/AsyncStorageConfig';
import { DataKey } from '../../enum/DataKeys';
import { handleGetSimpleData } from '../../view_controller/SharedViewController';
import React from 'react';

export default function CS_SC_Camera({ route }: { route: any }) {
    const [facing, setFacing] = useState('back');
    //dados que vem do qrcode ou barcode
    const [dataCode, setDataCode] = useState('');
    const [permission, requestPermission] = useCameraPermissions();
    const { previousScreen } = route.params
    const { navigate } = useNavigation()


    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>CS Icorp app gostaria de acessar sua câmera!</Text>
                <Text style={{ textAlign: 'center' }}>Usamos a câmera para escanear QR Codes e facilitar o login sem precisar digitar.</Text>
                <Button onPress={requestPermission} title="Continuar" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    async function readBarCode(scanningResult: BarcodeScanningResult) {
        setDataCode(scanningResult.data)
        navigate(previousScreen)
        await storeSimpleData(DataKey.CAMERA_CONTENT, scanningResult.data)
    }

    return (
        <View style={styles.container}>
            <Text style={commonStyle.btn_text_gray}>{dataCode}</Text>
            <CameraView style={styles.camera} facing='back' onBarcodeScanned={readBarCode} barcodeScannerSettings={{
                barcodeTypes: ['code128', 'aztec', 'codabar', 'code39', 'code93', 'datamatrix', 'ean13', 'ean8', 'itf14', 'pdf417', 'qr', 'upc_a', 'upc_e']
            }}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 16
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});