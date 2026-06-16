import { createContext, useContext, useState, useCallback } from "react";

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

let _id = 0;

export function AppProvider({ children }) {
  // ----- 여정 상태 (네비게이션 간 유지) -----
  const [diag, setDiag] = useState({ done: false, advisor: null });
  const [vehicle, setVehicle] = useState({ trust: false, llc: false });
  const [commits, setCommits] = useState({}); // dealId -> 억

  // ----- 토스트 / 방어 팝업 -----
  const [toasts, setToasts] = useState([]);
  const dismiss = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const toast = useCallback(
    (opt) => {
      const id = ++_id;
      setToasts((t) => [...t, { id, ...opt }]);
      const ttl = opt.actions && opt.actions.length ? 13000 : 6000;
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
    diag, setDiag,
    vehicle, setVehicle,
    commits, setCommits,
    toasts, toast, dismiss,
    modal, openModal, closeModal,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
