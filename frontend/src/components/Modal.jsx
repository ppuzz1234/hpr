import { useApp } from "../context/AppContext.jsx";

export default function ModalHost() {
  const { modal, closeModal } = useApp();
  if (!modal) return null;
  return (
    <div className="modal-root show">
      <div className="modal-bg" onClick={closeModal} />
      <div className="modal">
        <button className="close" onClick={closeModal}>×</button>
        {modal}
      </div>
    </div>
  );
}
