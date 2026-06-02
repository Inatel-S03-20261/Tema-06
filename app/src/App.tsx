import { Routes, Route } from "react-router-dom";

import Battles from "./pages/Battles";
import Cards from "./pages/Cards";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Players from "./pages/Players";
import TradeDashboard from "./pages/Trades";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/jogadores" element={<Players />} />
                <Route path="/cartas" element={<Cards />} />
                <Route path="/batalhas" element={<Battles />} />
                <Route path="/trocas" element={<TradeDashboard />} />
            </Routes>
        </>
    );
};

export default App;
