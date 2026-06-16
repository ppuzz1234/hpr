import { Router } from "express";
import { sgLicense } from "../mockData.js";

const router = Router();

// GET /api/singapore/licenses — 13O/13U/VCC 자격 매칭 결과
router.get("/licenses", (_req, res) => res.json(sgLicense));

export default router;
