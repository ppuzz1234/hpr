import { Router } from "express";
import { advisors } from "../mockData.js";

const router = Router();

// GET /api/advisors — 글로벌 어드바이저 목록
router.get("/", (_req, res) => res.json(advisors));

/* POST /api/advisors/:id/consult
   향후: Claude API 로 어드바이저 페르소나 기반 컨설팅 응답 생성
   현재: 에코 형태의 목업 응답 */
router.post("/:id/consult", (req, res) => {
  const advisor = advisors.find((a) => a.id === req.params.id);
  if (!advisor) return res.status(404).json({ error: "advisor not found" });
  const { question = "" } = req.body || {};
  res.json({
    advisor: advisor.name,
    question,
    answer: `[목업] ${advisor.name}의 관점에서 검토 중입니다. (향후 Claude API 연동)`,
  });
});

export default router;
