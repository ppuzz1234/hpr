import { createContext, useContext, useState, useCallback } from "react";
import { DB, companies as seedCompanies, companyOrder as seedOrder, defaultCompanyId, buildCompany } from "../data.js";

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

let _id = 0;

export function AppProvider({ children }) {
  // ----- 진입 게이트 (스플래시 → 로그인 → 타입선택 → 입장) -----
  // entered=false 이면 앱 본체(/) 접근 시 스플래시로 리다이렉트
  const [auth, setAuth] = useState({ entered: false, user: null, provider: null });
  const [userType, setUserType] = useState(null); // "lp" | "gp" | "institution" | "angel"

  const signIn = useCallback((provider, user) => setAuth((a) => ({ ...a, user, provider })), []);
  const enter = useCallback(() => setAuth((a) => ({ ...a, entered: true })), []);
  const reset = useCallback(() => {
    setAuth({ entered: false, user: null, provider: null });
    setUserType(null);
  }, []);

  // ----- 회사 레지스트리 (런타임 확장 가능) -----
  const [companies, setCompanies] = useState({ ...seedCompanies });
  const [companyOrder, setCompanyOrder] = useState([...seedOrder]);
  const [companyId, setCompanyId] = useState(defaultCompanyId);
  const company = companies[companyId];

  // ----- 여정 상태 (네비게이션 간 유지) -----
  const [diag, setDiag] = useState({ done: false, advisor: null });

  // 회사 전환 시 진단 상태 초기화 (새 회사로 재진단)
  const switchCompany = useCallback((id) => {
    setCompanyId(id);
    setDiag({ done: false, advisor: null });
  }, []);

  // 기업 검색에서 선택 — 미등록 회사면 진단 프로필 생성 후 레지스트리에 추가
  const registerCompany = useCallback((entry) => {
    const built = buildCompany(entry);
    setCompanies((prev) => (prev[built.id] ? prev : { ...prev, [built.id]: built }));
    setCompanyOrder((prev) => (prev.includes(built.id) ? prev : [built.id, ...prev]));
    setCompanyId(built.id);
    setDiag({ done: false, advisor: null });
    return built.id;
  }, []);

  const [vehicle, setVehicle] = useState({ trust: false, llc: false });
  const [commits, setCommits] = useState({}); // dealId -> 억

  // ----- 토스트 / 방어 팝업 -----
  const [toasts, setToasts] = useState([]);
  const dismiss = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const toast = useCallback(
    (opt) => {
      const id = ++_id;
      setToasts((t) => [...t, { id, ...opt }]);
      const ttl = opt.actions && opt.actions.length ? 4000 : 2000;
      setTimeout(() => dismiss(id), ttl);
      return id;
    },
    [dismiss]
  );

  // ----- 모달 (React 노드 보관) -----
  const [modal, setModal] = useState(null);
  const openModal = useCallback((node) => setModal(node), []);
  const closeModal = useCallback(() => setModal(null), []);

  const value = {
    auth, signIn, enter, reset,
    userType, setUserType,
    companies, companyOrder,
    companyId, company, switchCompany, registerCompany,
    diag, setDiag,
    vehicle, setVehicle,
    commits, setCommits,
    toasts, toast, dismiss,
    modal, openModal, closeModal,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
