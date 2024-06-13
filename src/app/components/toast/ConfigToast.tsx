// App.jsx
import { View, Text } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

/*
  1. Create the config
*/
export const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'green', backgroundColor: "#eefdec" }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 16,
                fontWeight: '800'
            }}
            text2Style={{
                fontSize: 16,
                fontWeight: '400'
            }}

        />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: 'yellow', backgroundColor: "#f8fade" }}
            text1Style={{
                fontSize: 18,
                fontWeight: '800',
                color: "#000"

            }}
            text2Style={{
                fontSize: 16,
                fontWeight: '600',
                color: "#000"
            }}
        />
    ),

    info: (props: any) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: 'blue', backgroundColor: "#e2f3fb" }}
            text1Style={{
                fontSize: 18,
                fontWeight: '800',
                color: "blue"

            }}
            text2Style={{
                fontSize: 16,
                fontWeight: '600',
                color: "#000"
            }}
        />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props }: { text1: any, props: any }) => (
        <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
        </View>
    )
};

