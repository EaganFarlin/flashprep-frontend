import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useRouter,
  Navigate,
} from "react-router";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import RootLayout from "./components/RootLayout";
import Dashboard from "./components/Dashboard";
import CreateSet from "./components/CreateSet";
import Set from "./components/Set";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="set/:setId" element={<Set />} />
          <Route path="create" element={<CreateSet />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
