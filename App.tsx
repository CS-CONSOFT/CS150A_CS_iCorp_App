import Routes from "./src/app/routes";
import { SQLiteProvider } from "expo-sqlite";
import { initDB } from "./src/app/services/storage/InitDB";
import Toast, { ToastConfig } from "react-native-toast-message";
import { toastConfig } from "./src/app/components/toast/ConfigToast";
import { store } from "./src/app/store/store";
const App = () => {
    return (
        <SQLiteProvider databaseName="config_db.db" onInit={initDB}>
            <Routes />
            <Toast config={toastConfig as ToastConfig} />
        </SQLiteProvider>
    );
}


export default App;