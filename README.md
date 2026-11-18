# NEELAXMI — MEDWORLD

Medical learning platform for NEET, MBBS, BDS, Nursing, allied health sciences and research.

## Included in this P1 foundation
- Responsive landing page and product design system.
- Firebase email/password authentication.
- Firestore user profile creation and learning-stream preference.
- Curriculum-aware learning path selector.
- Membership preview; checkout intentionally disabled.
- Firestore rules with owner-scoped profiles and admin custom-claim authorization.
- Vercel static deployment configuration.

## Firebase setup
1. Enable Email/Password under Firebase Authentication.
2. Create a Cloud Firestore database.
3. Deploy firestore.rules.
4. Set the administrator custom claim admin=true using a trusted Firebase Admin SDK environment. Do not grant admin from client-side code.
5. Add localhost and production domains to Firebase Auth authorized domains.

The Firebase web config is a public client identifier, not a server credential. Never commit service-account JSON, private keys or payment secrets.

The Free plan daily structure quota must be enforced by a trusted backend before 3D launch; browser-only checks are not secure. Membership prices are planned only; no payment is collected. Research submissions require editorial review and are not automatically peer-reviewed.

Serve locally over HTTP (not file protocol) because the app uses JavaScript modules. The project follows the agreed P1, P2 and P3 milestones.