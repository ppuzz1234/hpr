import { useEffect, useState } from "react";

// iOS 상태바 (모바일 전용, ≤480px 에서만 표시)
export default function StatusBar() {
  const [time, setTime] = useState(() => fmt(new Date()));
  useEffect(() => {
    const t = setInterval(() => setTime(fmt(new Date())), 15000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="statusbar">
      <span>{time}</span>
      <div className="sb-right">
        <div className="sb-bars">
          <i style={{ height: 4 }} /><i style={{ height: 6 }} /><i style={{ height: 9 }} /><i style={{ height: 11 }} />
        </div>
        <span className="sb-5g">5G</span>
        <div className="sb-bat"><i /></div>
      </div>
    </div>
  );
}

function fmt(d) {
  return d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");
}
