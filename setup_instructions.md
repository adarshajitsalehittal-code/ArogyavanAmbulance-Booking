# 🚑 ArogyaVan - Complete Ambulance Booking System

## ✅ All Issues FIXED!

### What Was Changed:
1. ✅ **Background**: Single large red cross (✚) centered on white background
   - Size: 50vw (adjusts to screen size)
   - Color: Red with transparency
   - Visible on all portals
   
2. ✅ **Driver Separation**: Each driver has unique credentials
   - Driver 1: 9876543210 → sees only their bookings
   - Driver 2: 9876543211 → sees only their bookings
   - Driver 3: 9876543212 → sees only their bookings
   
3. ✅ **Live Tracking**: Real GPS location updates
   - Updates every 5 seconds
   - Backend stores coordinates
   - Patient can track driver
   
4. ✅ **File Structure**: Separated frontend and backend
   - 1 backend file (server.js)
   - 3 frontend files (patient/admin/driver.html)

### Issues Resolved:
1. ✅ **Background Design Fixed** - ONE large red cross centered on white background (all pages)
2. ✅ **Separate Driver Panels** - Each driver has unique login and sees only their bookings
3. ✅ **Live Location Tracking** - Real-time GPS location sharing between driver and patient
4. ✅ **Separated Frontend/Backend** - Clean architecture with 6 separate files

---

## 📁 Project Structure

```
arogyavan/
├── backend/
│   └── server.js              # Backend API Server
├── frontend/
│   ├── patient.html           # Patient Portal
│   ├── admin.html             # Admin Portal
│   └── driver.html            # Driver Portal
├── package.json
└── README.md
```

---

## 🚀 Installation & Setup

### Step 1: Install Node.js
Download and install Node.js from [nodejs.org](https://nodejs.org/)

### Step 2: Install Dependencies
```bash
# Create project directory
mkdir arogyavan
cd arogyavan

# Initialize npm
npm init -y

# Install required packages
npm install express cors bcryptjs jsonwebtoken body-parser
```

### Step 3: Create Files
Create the following files in your project:

1. **backend/server.js** - Copy the backend code
2. **frontend/patient.html** - Copy the patient portal code
3. **frontend/admin.html** - Copy the admin portal code
4. **frontend/driver.html** - Copy the driver portal code

---

## 🎯 Running the Application

### 1. Start Backend Server
```bash
# From project root
cd backend
node server.js
```

You should see:
```
ArogyaVan Backend Server running on http://localhost:3000

Demo Credentials:
Admin - Mobile: 9999999999, Password: admin123
Driver - Mobile: 9876543210, Password: driver123
Patient - Mobile: 9123456789, Password: patient123
```

### 2. Open Frontend Applications

Open these HTML files in your browser:

- **Patient Portal**: `frontend/patient.html`
- **Admin Portal**: `frontend/admin.html`
- **Driver Portal**: `frontend/driver.html`

---

## 👥 Demo Credentials

### Admin Portal
- **Mobile**: 9999999999
- **Password**: admin123

### Patient Portal
- **Mobile**: 9123456789
- **Password**: patient123

### Driver Portals (3 Separate Drivers)

#### Driver 1: Ramesh Kumar
- **Mobile**: 9876543210
- **Password**: driver123
- **Ambulance**: KA-01-AB-1234 (Basic)

#### Driver 2: Suresh Babu
- **Mobile**: 9876543211
- **Password**: driver123
- **Ambulance**: KA-01-CD-5678 (Advanced)

#### Driver 3: Vijay Singh
- **Mobile**: 9876543212
- **Password**: driver123
- **Ambulance**: KA-01-EF-9012 (ICU)

---

## 🎮 How to Use

### For Patients:

1. **Register/Login** - Open patient.html and login
2. **Select Ambulance** - Choose Basic, Advanced, or ICU
3. **Book Ambulance** - Fill pickup/dropoff locations
4. **Track Driver** - See live location of your driver
5. **Pay** - Complete payment via Cash/UPI/Card
6. **Rate** - Provide feedback after ride

### For Drivers (PERSONALIZED):

1. **Login** - Each driver logs in with their unique mobile number
2. **See YOUR Bookings** - Only bookings assigned to YOU appear
3. **Share Location** - Click "Share Live Location" to let patients track you
4. **Complete Rides** - Mark rides as completed to get paid
5. **Track Earnings** - See your completed rides and earnings

### For Admins:

1. **Login** - Use admin credentials
2. **View Dashboard** - See all statistics
3. **Manage Ambulances** - Add/delete ambulances
4. **Manage Drivers** - Add/delete drivers
5. **View All Bookings** - See all patient bookings
6. **Track Drivers** - Monitor live locations of all drivers

---

## 🌟 Key Features

### 1. ✅ Fixed Background Design
- **ONE large red cross in center** on white background
- Clean, professional medical theme
- Visible on all pages (Patient, Admin, Driver)
- Mobile responsive design

### 2. ✅ Separate Driver Panels
- Each driver has unique login
- Drivers see ONLY their assigned bookings
- No mixing of bookings between drivers
- Personal dashboard for each driver

### 3. ✅ Live Location Tracking
- Real-time GPS location sharing
- Updates every 5 seconds
- Backend stores driver locations
- Patients can track their driver
- Admins can see all driver locations

### 4. ✅ Separated Architecture
- **Backend**: Node.js + Express REST API
- **Frontend**: Pure HTML/CSS/JavaScript
- Clean separation of concerns
- Easy to maintain and scale

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Ambulances
- `GET /api/ambulances` - Get all ambulances
- `POST /api/ambulances` - Add ambulance (Admin)
- `DELETE /api/ambulances/:id` - Delete ambulance (Admin)

### Drivers
- `GET /api/drivers` - Get all drivers (Admin)
- `POST /api/drivers` - Add driver (Admin)
- `DELETE /api/drivers/:id` - Delete driver (Admin)
- `POST /api/drivers/location` - Update driver location
- `GET /api/drivers/location/:driverId` - Get driver location

### Bookings
- `GET /api/bookings` - Get bookings (filtered by role)
- `POST /api/bookings` - Create booking (Patient)
- `PATCH /api/bookings/:id/status` - Update status (Driver)
- `PATCH /api/bookings/:id/payment` - Update payment
- `PATCH /api/bookings/:id/feedback` - Add feedback

### Statistics
- `GET /api/stats` - Get system statistics (Admin)

---

## 🧪 Testing Each Feature

### Test 1: Background Pattern
✅ Open any portal and verify **ONE large red cross** is visible in the center on white background

### Test 2: Separate Driver Logins
1. Open `driver.html` in 3 different browser tabs
2. Login as Driver 1 (9876543210) in tab 1
3. Login as Driver 2 (9876543211) in tab 2
4. Login as Driver 3 (9876543212) in tab 3
5. ✅ Each driver sees different dashboard with their ambulance info

### Test 3: Personalized Bookings
1. Login as Patient and book an ambulance (e.g., Basic ambulance)
2. Login as Driver 1 (who has Basic ambulance)
3. ✅ Driver 1 sees the booking
4. Login as Driver 2 (who has Advanced ambulance)
5. ✅ Driver 2 does NOT see Driver 1's booking

### Test 4: Live Location
1. Login as Driver 1
2. Click "Share Live Location" and allow GPS access
3. Login as Patient and book Driver 1's ambulance
4. After booking, Patient portal shows "Loading driver location..."
5. ✅ Patient sees Driver 1's live coordinates updating every 5 seconds

### Test 5: Admin Monitoring
1. Login as Admin
2. Go to "Live Tracking" tab
3. ✅ See all drivers and their locations
4. Go to "Bookings" tab
5. ✅ See all bookings from all patients

---

## 🎨 Visual Design Features

- **Single Red Cross Background**: ONE large medical cross symbol on white background
- **Gradient Buttons**: Smooth hover effects
- **Card Shadows**: Professional depth
- **Responsive Design**: Works on mobile and desktop
- **Color-coded Stats**: Different colors for different metrics
- **Status Badges**: Visual indicators for booking/driver status

---

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- Role-based access control
- Token verification for all protected routes
- Each user sees only their data

---

## 📱 Mobile Responsive

All portals are fully responsive:
- Works on phones, tablets, and desktops
- Touch-friendly buttons
- Optimized layouts for small screens

---

## 🚀 Production Deployment

For production use:

1. Replace `JWT_SECRET` in server.js with a strong secret key
2. Use a real database (MongoDB/PostgreSQL) instead of in-memory storage
3. Enable HTTPS
4. Add proper password validation
5. Add rate limiting
6. Deploy backend to Heroku/AWS/DigitalOcean
7. Host frontend on Netlify/Vercel

---

## 🆘 Troubleshooting

### Backend won't start
```bash
# Make sure you're in the backend directory
cd backend
node server.js
```

### Frontend can't connect to backend
- Check if backend is running on `http://localhost:3000`
- Check browser console for CORS errors
- Make sure `API_URL` in frontend matches backend URL

### Location not working
- Allow location access when browser prompts
- Check if HTTPS is enabled (required for geolocation)
- Make sure GPS is enabled on device

### Driver not seeing bookings
- Verify driver is logged in with correct credentials
- Check that ambulance is assigned to driver in backend
- Refresh the page and check bookings tab

---

## 📧 Support

For issues or questions, check the browser console for error messages.

---

## 🎉 Congratulations!

You now have a fully functional ambulance booking system with:
- ✅ Beautiful red cross background design
- ✅ Separate personalized driver panels
- ✅ Real-time location tracking
- ✅ Clean frontend/backend separation

**Happy coding! 🚑**
