import AppRoutes from "./routes/AppRoutes";
import { initializeLocalData } from "./utils/localStorageData";

initializeLocalData();

function App() {
  return <AppRoutes />;
}

export default App;
