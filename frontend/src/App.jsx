import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import Layout from "./components/Layout.jsx";
import DeviceFrame from "./components/DeviceFrame.jsx";
import Splash from "./screens/Splash.jsx";
import Login from "./screens/Login.jsx";
import HnwStory from "./screens/HnwStory.jsx";
import UserType from "./screens/UserType.jsx";
import InvestorType from "./screens/InvestorType.jsx";
import Welcome from "./screens/Welcome.jsx";
import HnwAbout from "./screens/HnwAbout.jsx";
import HnwSignup from "./screens/HnwSignup.jsx";
import HnwVerifyDetail from "./screens/HnwVerifyDetail.jsx";
import HnwSectorSelect from "./screens/HnwSectorSelect.jsx";
import HnwReady from "./screens/HnwReady.jsx";
import HnwShell from "./components/HnwShell.jsx";
import HnwHome from "./screens/HnwHome.jsx";
import HnwInvest from "./screens/HnwInvest.jsx";
import HnwDealDetail from "./screens/HnwDealDetail.jsx";
import HnwPortfolio from "./screens/HnwPortfolio.jsx";
import HnwMenu from "./screens/HnwMenu.jsx";
import CompanySearch from "./screens/CompanySearch.jsx";
import GPDashboard from "./screens/GPDashboard.jsx";
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

        {/* 진입 단계: 스플래시 → 로그인 → 타입선택(투자자/운용사)
            → 투자자: 개인투자(HNW)/법인투자 분기 → 랜딩 or 기업검색
            → 운용사: 콘솔 대시보드 */}
        <Route path="/splash" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome/hnw/intro" element={<HnwStory />} />
        <Route path="/welcome" element={<UserType />} />
        <Route path="/investor-type" element={<InvestorType />} />
        <Route path="/welcome/:type" element={<Welcome />} />
        <Route path="/welcome/hnw/about" element={<HnwAbout />} />
        <Route path="/welcome/hnw/signup" element={<HnwSignup />} />
        <Route path="/welcome/hnw/signup/:method" element={<HnwVerifyDetail />} />
        <Route path="/welcome/hnw/ready" element={<HnwReady />} />
        <Route path="/welcome/hnw/sector" element={<HnwSectorSelect />} />
        <Route path="/institution/search" element={<CompanySearch />} />
        <Route path="/gp/dashboard" element={<GPDashboard />} />

        {/* 개인투자(HNW) 딜 콘솔 — 기관 FCF 여정과 무관한 독립 셸 */}
        <Route path="/hnw" element={<HnwShell />}>
          <Route index element={<HnwHome />} />
          <Route path="invest" element={<HnwInvest />} />
          <Route path="deal/:id" element={<HnwDealDetail />} />
          <Route path="portfolio" element={<HnwPortfolio />} />
          <Route path="menu" element={<HnwMenu />} />
        </Route>

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
