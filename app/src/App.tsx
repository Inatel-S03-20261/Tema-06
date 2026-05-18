import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Players from "./pages/Players";
import Header from "./components/Header";

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jogadores" element={<Players />} />
            </Routes>
        </>
    );
};

export default App;