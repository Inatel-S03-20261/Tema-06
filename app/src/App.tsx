import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import PlayerDetails from "./pages/PlayerDetails";
import Players from "./pages/Players";
import TradeDashboard from "./pages/Trades";

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jogadores" element={<Players />} />
                <Route path="/jogadores/:playerId" element={<PlayerDetails />} />
                <Route path="/trocas" element={<TradeDashboard />} />
            </Routes>
        </>
    );
};

export default App;