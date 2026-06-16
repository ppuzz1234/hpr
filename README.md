# PLUS Private Room

> B2B 폐쇄형 멀티패밀리오피스(Multi-Family Office) 플랫폼
> 법인의 잉여현금(FCF)을 **진단 → 비히클 설립 → 한화 밸류체인 대체투자**로 잇는 올인원 여정

React(Vite) 프론트엔드 + Node.js(Express) 백엔드 모노레포. AIM 앱 톤앤매너(딥 네이비 + 민트 시안),
iPhone 17 Pro 기준 모바일 UI, 디바이스 시뮬레이터 진입 경로 포함.

## 모노레포 구조

```
hpr/
├── package.json          # npm workspaces + 통합 스크립트
├── frontend/             # React 18 + Vite + react-router
│   ├── index.html
│   ├── vite.config.js    # dev:4599, /api → :4600 프록시
│   └── src/
│       ├── main.jsx / App.jsx
│       ├── styles.css            # 디자인 시스템 + 모바일 셸 + 디바이스 프레임
│       ├── data.js               # 목업 데이터 (→ 향후 api.js 로 교체)
│       ├── api.js                # 백엔드 호출 헬퍼 (스텁)
│       ├── utils.js              # 포맷·내비 설정
│       ├── context/AppContext.jsx
│       ├── components/           # Layout · Sidebar · Topbar · StatusBar
│       │                         # BottomNav · Toasts · Modal · DeviceFrame · Charts
│       └── screens/              # Home · Step1 · Step2 · Step3 · Dual · Bridge · Singapore
└── backend/              # Node.js + Express (API 스캐폴드)
    ├── .env.example
    └── src/
        ├── index.js              # 서버 엔트리 (:4600)
        ├── mockData.js
        └── routes/               # diagnose · advisors · deals · portfolio · singapore
```

## 빠른 시작

```bash
# 1) 의존성 설치 (루트에서 workspaces 일괄 설치)
npm install

# 2) 프론트 + 백엔드 동시 실행
npm run dev
#   프론트: http://localhost:4599
#   API:    http://localhost:4600/api/health

# 개별 실행
npm run dev:web      # 프론트만
npm run dev:api      # 백엔드만
```

### 진입 경로 (2개)
| URL | 설명 |
|-----|------|
| `http://localhost:4599/` | 앱 본체 (반응형 · iPhone 17 Pro 기준 모바일 UI) |
| `http://localhost:4599/device` | iPhone 17 Pro 디바이스 시뮬레이터(티타늄 프레임 + 다이내믹 아일랜드) 래퍼 |

> 모바일 셸(≤480px)에서는 iOS 상태바 + 하단 탭바로, 데스크톱에서는 사이드바 레이아웃으로 자동 전환됩니다.

## 화면 / 여정

| 단계 | 내용 |
|------|------|
| **STEP 1** | 재무제표 업로드 → 30초 FCF 스캔 → ROIC 정체구간·기회비용 → 1-Page Executive Summary |
| **STEP 1.1** | Cathie Wood / Ray Dalio / Warren Buffett 관점 선택 → 컨설팅 채팅 |
| **STEP 2** | 디지털 가족신탁 · Family LLC 빌더 · 스트레스 테스트 · 외환/세무 에뮬레이터 |
| **STEP 3** | Tranching 공급망 · 클럽딜 서명 · Fund of Funds 실시간 대시보드 |
| **코어 모듈** | 메인-승계 듀얼 시뮬레이터 · 글로벌 자산이전 브릿지 · 싱가포르 라이선스 허브 |

## 백엔드 API (스캐폴드)

현재는 목업 응답. 프론트는 `src/data.js`를 사용하며, 백엔드 연동 시 `src/api.js` 헬퍼로 교체합니다.

| 메서드 | 엔드포인트 | 용도 |
|--------|-----------|------|
| GET  | `/api/health` | 헬스체크 |
| POST | `/api/diagnose` | 재무 진단 (→ 향후 OCR·평가엔진) |
| GET  | `/api/advisors` | 어드바이저 목록 |
| POST | `/api/advisors/:id/consult` | 컨설팅 (→ 향후 Claude API) |
| GET  | `/api/deals/tranches` · `/api/deals/club` | 딜 공급망 |
| POST | `/api/deals/commit` | 출자확약 (→ 향후 전자서명·캐피탈 콜) |
| GET  | `/api/portfolio` | Fund of Funds 대시보드 |
| GET  | `/api/singapore/licenses` | 13O/13U/VCC 자격 |

`.env` 설정: `backend/.env.example` 복사 → `backend/.env`

## 빌드 / 배포

```bash
npm run build          # frontend/dist 생성
npm run preview        # 빌드 결과 미리보기 (SPA 라우팅 지원)
npm run start:api      # 프로덕션 API 실행
```

## 향후 (production 전환)
- `data.js` 목업 → 백엔드 API(`api.js`) 연동
- 재무 OCR · 기업가치 평가엔진 · Tranching API
- AI 웰스 어드바이저 → Claude API
- 전자서명 / 캐피탈 콜 → KYC·전자계약·자본집행 인프라
- 폐쇄형 가문 인증(상위 0.1% 초청제) · 종단간 암호화

> 데모용 수치·기관명·딜은 가상 데이터입니다.
