# 🔐 ChatApp — Auth & Code Flow Reference

A complete reference for how authentication, routing, and profile management works in this React + Node.js + JWT app.

---

## 📁 Every File's Job

| File | Job |
|---|---|
| `App.jsx` | Route protection, renders pages |
| `useGetCurrentUser.js` | Fetches user on every app load/refresh |
| `userSlice.js` | Stores `userData` + `loading` in Redux |
| `isAuth.js` | Verifies JWT cookie on every protected route |
| `auth.controllers.js` | Handles login / signup / logout |
| `user.controllers.js` | Gets and updates user profile |
| `multer.js` | Temporarily saves uploaded image to `/public` |
| `cloudinary.js` | Uploads image to cloud, deletes local copy |

---

## 🔐 Authentication Flow (Login/Signup)

```
User submits login form
        ↓
React sends POST /api/auth/login
        ↓
Node finds user in MongoDB
        ↓
bcrypt compares password
        ↓
JWT token generated → saved in cookie
        ↓
User data sent back to React
        ↓
Redux stores userData
        ↓
React redirects to Home
```

---

## 🔄 App Startup / Refresh Flow

```
User opens or refreshes the app
        ↓
App.jsx renders
        ↓
useGetCurrentUser() hook fires
        ↓
Redux loading = true (routes wait)
        ↓
Axios calls GET /api/user/current
        ↓
Cookie automatically sent with request
        ↓
isAuth middleware reads cookie
        ↓
JWT verified → userId attached to req
        ↓
getCurrentUser controller finds user in DB
        ↓
User data sent back to React
        ↓
Redux stores userData, loading = false
        ↓
Routes render correctly
```

---

## 👤 Profile Update Flow

```
User changes name/image → clicks Save
        ↓
handleProfile() fires
        ↓
FormData created (name + image file)
        ↓
Axios sends PUT /api/user/profile
        ↓
isAuth middleware verifies cookie
        ↓
multer saves image to /public folder
        ↓
cloudinary uploads image → returns URL
        ↓
multer deletes local file from /public
        ↓
MongoDB updated with new name + image URL
        ↓
Updated user sent back to React
        ↓
Redux updates userData
        ↓
UI updates instantly
```

---

## 🛡️ Route Protection Flow

```
User tries to visit a page
        ↓
App.jsx checks userData from Redux
        ↓
        ├── loading = true?
        │       ↓
        │   Show "Loading..." (wait, don't redirect yet)
        │
        ├── userData exists?
        │       ↓
        │   Allow access to protected pages (Home, Profile)
        │
        └── userData is null?
                ↓
            Redirect to /login
```

---

## 🗄️ Redux Store Flow

```
Initial State:
{ userData: null, loading: true }
        ↓
useGetCurrentUser fires
        ↓
setLoading(true) → loading = true
        ↓
API call succeeds?
    ├── YES → setUserData(user) → userData = user
    └── NO  → setUserData(null) → userData = null
        ↓
setLoading(false) → loading = false
        ↓
Routes now render based on userData
```

---

## 🌐 Backend Request Flow

Every request follows this exact path:

```
Any request comes in
        ↓
Middleware (CORS → express.json() → cookieParser())
        ↓
index.js          ← FIRST STOP (checks URL prefix)
        ↓
authRouter        ← SECOND STOP (checks exact path)
or
userRouter
        ↓
isAuth middleware  ← THIRD STOP (protected routes only)
        ↓
Controller        ← FINAL STOP (handles logic & sends response)
```

### Example Requests

```
POST /api/auth/login
        ↓
index.js → "/api/auth" ✅ → authRouter
        ↓
authRouter → "/login" ✅ → login controller
        ↓
login controller → checks password, sets cookie, sends response

---

GET /api/user/current
        ↓
index.js → "/api/user" ✅ → userRouter
        ↓
userRouter → "/current" ✅ → isAuth → getCurrentUser controller
        ↓
getCurrentUser → finds user in DB, sends response
```

---

#



## 🔑 Key Rules to Always Remember

1. **Always have a `loading` state** — never redirect while auth is still being checked
2. **Every controller must send a response** — a missing `res.json()` hangs the request forever
3. **Use `{ returnDocument: "after" }`** in Mongoose to get the updated document back
4. **Name all hooks starting with `use`** — React enforces this rule
5. **Use `sameSite: "lax"`** for cookies during local development
6. **Auto-create upload folders** — never assume they exist
7. **Sanitize filenames** — spaces and special characters break file paths on Windows
8. **Call `dotenv.config()` first** — before any imports that need env variables
9. **Middleware order matters** — CORS → json → cookieParser → routes
10. **`withCredentials: true`** — always required when sending cookies with Axios