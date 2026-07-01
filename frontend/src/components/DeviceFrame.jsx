import { useEffect, useRef } from "react";

/* iPhone 17 Pro 디바이스 시뮬레이터 (route: /device)
   index 앱을 iframe(src="/")으로 임베드하고 화면 크기에 맞춰 스케일 */
export default function DeviceFrame() {
  const stageRef = useRef(null);

  useEffect(() => {
    // 실제 폰(터치 디바이스 + 좁은 화면)에서 열리면 프레임 없이 앱으로 이동.
    // 데스크톱 좁은 창에서는 프레임을 계속 보여준다.
    const isRealPhone =
      window.matchMedia("(pointer: coarse)").matches && window.innerWidth <= 520;
    if (isRealPhone) {
      window.location.replace("/");
      return;
    }
    const fit = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const dev = stage.firstElementChild;
      const w = dev.offsetWidth, h = dev.offsetHeight;
      let s = Math.min(1, (window.innerHeight - 130) / h, (window.innerWidth - 40) / w);
      if (s <= 0) s = 1;
      dev.style.transform = "scale(" + s + ")";
      stage.style.width = w * s + "px";
      stage.style.height = h * s + "px";
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div className="device-sim">
      <div className="stage" ref={stageRef}>
        <div className="device">
          <div className="screen">
            <div className="island" />
            <iframe src="/" title="PLUS Babel" />
          </div>
          <span className="btn-side b-action" />
          <span className="btn-side b-volup" />
          <span className="btn-side b-voldn" />
          <span className="btn-side b-power" />
          <span className="btn-side b-cam" />
        </div>
      </div>
      <div className="caption">
        <div className="t"><b>iPhone 17 Pro</b> · PLUS Babel Simulator</div>
        <a href="/">전체 화면(브라우저)으로 열기 →</a>
      </div>
    </div>
  );
}
