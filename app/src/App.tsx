import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlayerDetails from "./pages/PlayerDetails";
import Players from "./pages/Players";
import TradeDashboard from "./pages/Trades";
import Login from "./pages/Login";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/jogadores" element={<Players />} />
                <Route
                    path="/jogadores/:playerId"
                    element={<PlayerDetails />}
                />
                <Route path="/trocas" element={<TradeDashboard />} />
            </Routes>
        </>
    );
};

export default App;
