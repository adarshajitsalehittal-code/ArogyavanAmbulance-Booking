# 🚀 Quick Start Guide - Fix Login Issues

## ✅ Issue: "Login Failed. Please Try Again"

This error means the **backend server is not running**. Here's how to fix it:

---

## 📋 Step-by-Step Solution

### **Step 1: Install Dependencies** (One-time setup)

Open terminal/command prompt and run:

```bash
# Navigate to your project folder
cd arogyavan

# Install required packages
npm install
```

Wait for installation to complete (takes 1-2 minutes).

---

### **Step 2: Start Backend Server** (Every time)

```bash
# Navigate to backend folder
cd backend

# Start the server
node server.js
```

**OR** use npm start from root folder:

```bash
# From arogyavan root folder
npm start
```

---

### **Step 3: Verify Server is Running**

You should see this message:

```
ArogyaVan Backend Server running on http://localhost:3000

Demo Credentials:
Admin - Mobile: 9999999999, Password: admin123
Driver - Mobile: 9876543210, Password: driver123
Patient - Mobile: 9123456789, Password: patient123
```

---

### **Step 4: Open Frontend & Login**

Now open the HTML files in your browser:

- `frontend/patient.html`
- `frontend/admin.html`
- `frontend/driver.html`

**Credentials are already filled!** Just click **"Login Now"** button.

---

## 🎯 Pre-filled Credentials

### **Patient Portal** (`patient.html`)
- ✅ Mobile: **9123456789** (already filled)
- ✅ Password: **patient123** (already filled)
- Just click **"🚀 Login Now"**

### **Driver Portal** (`driver.html`)
Choose any driver by clicking their card:

**Driver 1: Ramesh Kumar**
- ✅ Mobile: **9876543210**
- ✅ Password: **driver123**
- Ambulance: KA-01-AB-1234 (Basic)

**Driver 2: Suresh Babu**
- ✅ Mobile: **9876543211**
- ✅ Password: **driver123**
- Ambulance: KA-01-CD-5678 (Advanced)

**Driver 3: Vijay Singh**
- ✅ Mobile: **9876543212**
- ✅ Password: **driver123**
- Ambulance: KA-01-EF-9012 (ICU)

### **Admin Portal** (`admin.html`)
- ✅ Mobile: **9999999999** (already filled)
- ✅ Password: **admin123** (already filled)
- Just click **"🚀 Login as Admin"**

---

## 🔧 Common Issues & Solutions

### ❌ "Cannot find module 'express'"
**Solution:** Install dependencies
```bash
npm install
```

### ❌ "Port 3000 is already in use"
**Solution:** Stop other server or use different port

**Option 1:** Find and stop the process using port 3000

**Windows:**
```cmd
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Option 2:** Change port in server.js (line 15):
```javascript
const PORT = 3001; // Change from 3000 to 3001
```

Then update API_URL in all HTML files:
```javascript
const API_URL = 'http://localhost:3001/api';
```

### ❌ "CORS Error"
**Solution:** Make sure you're opening HTML files directly (file://) or using a local server, and backend is running with CORS enabled (already configured).

### ❌ Password field shows dots/asterisks
**Solution:** Password fields are now type="text" so you can see the password clearly!

---

## ✅ Success Checklist

Before trying to login, verify:

- [ ] ✅ Node.js is installed (`node --version`)
- [ ] ✅ Dependencies are installed (`npm install`)
- [ ] ✅ Backend server is running (`npm start`)
- [ ] ✅ You see "Server running on http://localhost:3000" message
- [ ] ✅ Browser shows credentials are pre-filled
- [ ] ✅ You clicked the login button

---

## 🎥 Complete Workflow

```
1. Terminal: cd arogyavan
2. Terminal: npm install          (first time only)
3. Terminal: cd backend
4. Terminal: node server.js       (keep this running!)
5. Browser:  Open patient.html
6. Browser:  See credentials filled: 9123456789 / patient123
7. Browser:  Click "🚀 Login Now"
8. Browser:  ✅ You're logged in!
```

---

## 📱 What You Should See

### **Before Login:**
- Green box showing credentials
- Mobile number: **9123456789** (visible, not dots)
- Password: **patient123** (visible, not dots)
- Warning: "Make sure backend server is running"

### **During Login:**
- Yellow box: "⏳ Connecting to server..."

### **After Login (Success):**
- Dashboard with ambulance options
- Welcome message with your name

### **After Login (Error - Server Not Running):**
- Red box with detailed instructions
- Step-by-step guide to start server

---

## 🆘 Still Not Working?

### Check these:

1. **Backend server output** - Should show:
   ```
   Server running on http://localhost:3000
   ```

2. **Browser console** (Press F12) - Should show:
   ```
   POST http://localhost:3000/api/auth/login
   Status: 200 OK
   ```

3. **Firewall** - Make sure port 3000 is not blocked

4. **Network** - localhost should be accessible

---

## 💡 Pro Tips

1. **Keep backend running** - Don't close the terminal window
2. **Refresh page** - If you update code, refresh browser
3. **Clear cache** - Ctrl+Shift+R to hard refresh
4. **Check console** - F12 to see any JavaScript errors
5. **Multiple drivers** - Open driver.html in 3 different browser tabs

---

## 🎉 You're All Set!

Once backend is running, login is instant with pre-filled credentials! 

**No typing needed** - just click the login button! 🚀
