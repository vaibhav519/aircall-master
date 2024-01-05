import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CallList from "./components/CallList.jsx";
import CallDetails from "./components/CallDetails.jsx";
import Archives from "./components/Archives.jsx";

function App() {
    return (
        <div className="container">
            <BrowserRouter basename="/">
                <Header/>
                    <div className="container-view">
                        <Routes>
                            <Route path="/" element={<CallList/>}/>
                            <Route path="/call/:id" element={<CallDetails/>}/>
                            <Route path="/archives" element={<Archives/>}/>
                        </Routes>
                    </div>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
