import { Router } from "express";
import { corp } from "../mockData.js";

const router = Router();

/* POST /api/diagnose
   향후: 업로드된 재무제표(PDF) → OCR → CFO/FCF/ROIC 산출 → 기회비용·정체구간 도출
   현재: 목업 진단 결과 반환 */
router.post("/", (req, res) => {
  const m = corp.main;
  const wacc = 7.4;
  res.json({
    corp: corp.name,
    cfo: m.ebitda,
    fcf: m.fcf,
    idleCash: m.cash,
    roic: m.roic,
    wacc,
    roicGap: +(wacc - m.roic).toFixed(1),
    oppCost: Math.round(m.cash * (wacc - m.roic) / 100), // 유휴현금 × 갭
    deployable: 880,
    score: 71,
    keywords: ["항공우주·UAM", "클린에너지", "아트테크", "바이오 헬스케어"],
    generatedAt: new Date().toISOString(),
  });
});

export default router;
