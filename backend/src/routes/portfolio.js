import { Router } from "express";
import { fof } from "../mockData.js";

const router = Router();

// GET /api/portfolio — Fund of Funds 통합 대시보드 데이터
router.get("/", (_req, res) => res.json(fof));

export default router;
