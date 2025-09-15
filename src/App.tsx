import CentralDialog from "./components/CentralDialog/CentralDialog";
import RightDisplay from "./components/RightDisplay/RightDisplay";
import Sidebar from "./components/Sidebar/Sidebar";
import "./styles/main.css";

function App() {
  const handleNavigate = (section: string) => {
    console.log("Navigated to:", section);
  };

  const results: any[] = [];

  return (
    <div className="app-root">
      <Sidebar onNavigate={handleNavigate} />
      <div className="center-area">
        <CentralDialog />
      </div>
      <div className="right-area">
        <RightDisplay results={results} />
      </div>
    </div>
  );
}

export default App;
