import { useApp } from "../context/AppContext.jsx";

export default function Toasts() {
  const { toasts, dismiss } = useApp();
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={"toast" + (t.warn ? " warn" : "")}>
          <div className="t-head">
            <span className="ic">{t.icon || "◆"}</span>
            {t.title}
          </div>
          {t.body && <div className="t-body" dangerouslySetInnerHTML={{ __html: t.body }} />}
          {t.actions && t.actions.length > 0 && (
            <div className="t-act">
              {t.actions.map((a, i) => (
                <button
                  key={i}
                  className={"btn btn-sm " + (a.primary ? "btn-primary" : "btn-ghost")}
                  onClick={() => { a.fn && a.fn(); dismiss(t.id); }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
