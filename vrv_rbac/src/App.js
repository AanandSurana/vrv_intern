import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Import Sidebar
import User from "./pages/User";
import Roles from "./pages/Roles";

function App() {
  return (
    <Router>
      <div className="lg:flex md:flex">
        <Sidebar />

        <div className="flex-grow overflow-scroll h-screen scrollbar-hide">
          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/roles" element={<Roles />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
