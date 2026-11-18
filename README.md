# NEELAXMI — MEDWORLD

Medical learning platform for NEET, MBBS, BDS, Nursing, allied health sciences and research.

## P1 foundation
- Responsive landing page and design system.
- Firebase email/password authentication and learner profile.
- Learning stream selector and membership preview.
- Admin custom-claim based Firestore authorization.

## P2 implementation branch
- `learning.html`: Learning Place with NEET, MBBS/BDS, Nursing, allied-health and postgraduate/research pathways.
- `heart.html`: interactive Three.js GLB-based heart anatomy workspace with selectable source meshes, orbit controls, zoom, structure details and a camera-led 3D physiology lab.
- `research.html`: research topic collections, medical discovery timeline and evidence standards.
- `api/mcp.js`: Streamable HTTP MCP endpoint with Firebase ID-token authentication; read published learning content/curricula and create admin-only drafts.
- Expanded Firestore rules for content, curricula, research papers, submissions and audit records.

## Setup before production
1. Enable Email/Password in Firebase Authentication.
2. Create/verify the Firestore database.
3. Deploy `firestore.rules` using Firebase CLI after reviewing in the Firebase Emulator.
4. Set an administrator custom claim `admin: true` only from a trusted Admin SDK environment.
5. Add Vercel environment variable `FIREBASE_SERVICE_ACCOUNT_JSON` containing the Firebase service-account JSON. Never commit this value.
6. Configure Claude's MCP client to call `https://<production-domain>/api/mcp` with a short-lived Firebase ID token in `Authorization: Bearer <token>`. This initial endpoint uses Firebase ID-token auth; a proper OAuth onboarding flow is still required for a public multi-user Claude integration.
7. Run `npm install` and `npm run check`.

## Important limitations
- The current heart asset is a curated 11-group GLB model. The cinematic lab animates camera focus and illustrative blood particles along mapped mesh-centre waypoints. It is not a validated haemodynamic simulation. Valve leaflets, fine coronary branches, conduction fibres/nodes and independently deforming myocardium are not yet supplied as segmented animated meshes. The cardiac-cycle pulse effect is a subtle whole-model visual cue, not a physiological ventricular contraction. It is for education only and not diagnosis.
- Research topic/timeline entries are introductory editorial content, not a live PubMed feed or verified paper catalogue.
- MCP currently provides read-only published-content search/list tools and admin-only draft creation; publish/delete, user management, quiz operations, audit review and granular permissions need subsequent implementation and testing.
- Firestore rules in Git are not automatically deployed to Firebase. Deploy and test them separately.
- Free daily structure quota must be enforced by a trusted backend before the 3D experience is opened to all users. Planned prices are not purchasable until secure payment integration is implemented.
