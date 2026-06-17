import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import diagnose from "./routes/diagnose.js";
import advisors from "./routes/advisors.js";
import deals from "./routes/deals.js";
import portfolio from "./routes/portfolio.js";
import singapore from "./routes/singapore.js";
import auth from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4600;
const ORIGIN = process.env.CORS_ORIGIN || "http://localhost:4599";

app.use(cors({ origin: ORIGIN }));
app.use(express.json({ limit: "5mb" }));

// 요청 로깅 (간단)
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()}  ${req.method} ${req.url}`);
  next();
});

// 헬스체크
app.get("/api/health", (_req, res) =>
  res.json({ ok: true, service: "hpr-api", version: "0.1.0", time: new Date().toISOString() })
);

// 도메인 라우트 (현재는 목업 응답 → 향후 실제 엔진/DB 연동)
app.use("/api/auth", auth);
app.use("/api/diagnose", diagnose);
app.use("/api/advisors", advisors);
app.use("/api/deals", deals);
app.use("/api/portfolio", portfolio);
app.use("/api/singapore", singapore);

// 404
app.use((_req, res) => res.status(404).json({ error: "Not Found" }));

// 에러 핸들러
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`\n  PLUS Private Room API`);
  console.log(`  ▸ http://localhost:${PORT}/api/health`);
  console.log(`  ▸ CORS origin: ${ORIGIN}\n`);
});
