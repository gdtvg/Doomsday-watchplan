# Security Specification & Threat Model for Firestore Security Rules

## 1. Data Invariants & Access Control Policy
1. **User Identity Boundary**: A user document at `/users/{userId}` can strictly only be read and written by the authenticated user whose `request.auth.uid == userId`.
2. **Watchlist Isolation**: Subcollection documents at `/users/{userId}/watchlist/{titleId}` can strictly only be read, created, updated, or deleted by the owner `userId` where `request.auth.uid == userId`.
3. **Data Integrity & Immutability**:
   - `userId` within the document body must match `request.auth.uid`.
   - `createdAt` on user profile is immutable once created.
   - `titleId` and `userId` in watchlist items cannot be changed or reassigned during update operations.
4. **Volumetric & Type Bounds**:
   - String fields enforce `.size()` bounds (e.g. `notes` max 2000 chars, IDs max 128 chars, names max 128 chars).
   - Document ID path variables must satisfy `isValidId(id)`.
   - Ratings must be numerical values between 1 and 10.
5. **No Blanket Reads**:
   - Default deny catch-all `match /{document=**} { allow read, write: if false; }`.
   - No cross-user scraping or public data leaks.

---

## 2. The "Dirty Dozen" Attack Payloads (Must Return PERMISSION_DENIED)

1. **Unauthenticated Read Attack**: Anonymous / unauthenticated request attempting to read `/users/victimUser123`.
2. **Cross-Tenant ID Spoofing Write**: User `attacker456` attempting to write a profile to `/users/victimUser123`.
3. **Ghost Field / Shadow Injection**: User `user1` attempting to insert an unauthorized `{ isAdmin: true, role: 'superadmin' }` field into `/users/user1`.
4. **Watchlist Subcollection Hijack**: User `attacker456` attempting to create `/users/victimUser123/watchlist/avengers-1`.
5. **ID Poisoning / Denial of Wallet**: An attacker sending a 2KB junk character string as the document ID path `{userId}` or `{titleId}`.
6. **Denial of Wallet Huge Payload**: An attacker attempting to submit a 10MB payload into the `notes` field.
7. **Identity Mutation Attack**: An attacker attempting to update an existing watchlist item by mutating `userId` to point to a different victim.
8. **Rating Value Poisoning**: An attacker sending `{ userRating: "NaN" }` or `{ userRating: 99999 }`.
9. **WatchStatus Enum Violation**: An attacker submitting `{ watchStatus: "HACKED_STATUS" }`.
10. **Timestamp Forgery**: Submitting client-generated forged timestamps bypassing `request.time`.
11. **Blanket Collection Scrape**: Querying all users `/users` without scoping to `request.auth.uid`.
12. **Unverified Email Spoofing**: Attempting to escalate permissions via unverified email claims.
