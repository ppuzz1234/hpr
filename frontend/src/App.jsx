import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import Layout from "./components/Layout.jsx";
import DeviceFrame from "./components/DeviceFrame.jsx";
import Splash from "./screens/Splash.jsx";
import Login from "./screens/Login.jsx";
import UserType from "./screens/UserType.jsx";
import Welcome from "./screens/Welcome.jsx";
import CompanySearch from "./screens/CompanySearch.jsx";
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

        {/* 진입 단계: 스플래시 → 로그인 → 타입선택 → (기관)기업검색 / (그 외)랜딩 */}
        <Route path="/splash" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<UserType />} />
        <Route path="/welcome/:type" element={<Welcome />} />
        <Route path="/institution/search" element={<CompanySearch />} />

        {/* 앱 본체 (진입 게이트 통과 후) */}
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
