import Routes from "./src/app/routes";
import { SQLiteProvider } from "expo-sqlite";
import { initDB } from "./src/app/services/storage/InitDB";
import Toast from "react-native-toast-message";
const App = () => {
    return (
        <SQLiteProvider databaseName="config_db.db" onInit={initDB}>
            <Routes />
            <Toast />
        </SQLiteProvider>
    );
}


export default App;