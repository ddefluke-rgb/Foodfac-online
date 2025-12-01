Full Food App (static + optional Firebase)

Contents:
- index.html
- admin.html
- vendor.html
- customer.html
- monitor.html
- style.css
- app-firebase.js (module, replace firebaseConfig with your Firebase project values)

Quick start (local):
1. Unzip the package.
2. Run a local server (recommended):
   python -m http.server 8000
   Open http://localhost:8000 in your browser.
3. Admin login: admin / 3601
   - Use Admin page to create stores and set vendor username/password.
4. Vendor: login using vendor username/password (set by Admin), upload QR, add menus.
5. Customer: login using numeric user (1000-10000) with same-number password.

To enable Firebase realtime & cloud storage:
1. Create a Firebase project and enable Firestore + Storage.
2. Replace firebaseConfig in app-firebase.js with your values.
3. Update HTML to import Firebase modules and call initFirebase(...) accordingly.

Notes:
- Data is stored in localStorage by default for immediate use without backend.
- QR uploads are saved in localStorage (data URL). To store on cloud, use Firebase Storage upload.
- Receipt PNG generation uses html2canvas CDN.
