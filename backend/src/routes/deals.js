import { Router } from "express";
import { tranches, clubDeals } from "../mockData.js";

const router = Router();

// GET /api/deals/tranches — Tranching 공급망
router.get("/tranches", (_req, res) => res.json(tranches));

// GET /api/deals/club — 폐쇄형 클럽딜
router.get("/club", (_req, res) => res.json(clubDeals));

/* POST /api/deals/commit — 출자확약 (트랜치/클럽딜 공통)
   향후: 전자서명 · 무인 캐피탈 콜 · Embedded Finance 집행 연동
   현재: 확약 접수만 에코 */
router.post("/commit", (req, res) => {
  const { dealId, amount } = req.body || {};
  if (!dealId || !amount) return res.status(400).json({ error: "dealId, amount required" });
  res.status(201).json({ ok: true, dealId, amount, status: "committed", at: new Date().toISOString() });
});

export default router;
