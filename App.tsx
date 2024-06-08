import Routes from "./src/app/routes";
import { SQLiteProvider } from "expo-sqlite";
import { initDB } from "./src/app/services/storage/InitDB";
const App = () => {
    return (
        <SQLiteProvider databaseName="config_db.db" onInit={initDB}>
            <Routes />
        </SQLiteProvider>
    );
}


export default App;