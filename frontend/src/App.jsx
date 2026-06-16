import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import Layout from "./components/Layout.jsx";
import DeviceFrame from "./components/DeviceFrame.jsx";
import Home from "./screens/Home.jsx";
import Step1 from "./screens/Step1.jsx";
import Step2 from "./screens/Step2.jsx";
import Step3 from "./screens/Step3.jsx";
import Dual from "./screens/Dual.jsx";
import Bridge from "./screens/Bridge.jsx";
import Singapore from "./screens/Singapore.jsx";

export default function App() {
  return (
    <AppProvider>
      <Routes>
        {/* iPhone 17 Pro 디바이스 시뮬레이터 진입 경로 */}
        <Route path="/device" element={<DeviceFrame />} />
        {/* 앱 본체 */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="step1" element={<Step1 />} />
          <Route path="step2" element={<Step2 />} />
          <Route path="step3" element={<Step3 />} />
          <Route path="dual" element={<Dual />} />
          <Route path="bridge" element={<Bridge />} />
          <Route path="singapore" element={<Singapore />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}
