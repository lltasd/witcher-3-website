import { Routes, Route } from "react-router-dom";
import React from 'react';
import Home from "../Pages/Home";
import GameSection from "../components/GameSection/GameSection";
import WitcherWebsite from "../components/WitcherWebsite/WitcherWebsite.jsx"; // <== добавляем импорт

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/game' element={<GameSection />} />
            <Route path='/witcher-3-website' element={<WitcherWebsite />} /> {/* Обновленный путь */}
        </Routes>
    );
}

export default AppRoutes;
