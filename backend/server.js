// ArogyaVan Backend API Server
// Install dependencies: npm install express cors bcryptjs jsonwebtoken body-parser

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database (replace with MongoDB/PostgreSQL in production)
let users = [
  { id: 1, name: 'Admin User', mobile: '9999999999', password: '$2a$10$xQXg5h5h5h5h5h5h5h5h5e', role: 'admin' },
  { id: 2, name: 'Ramesh Kumar', mobile: '9876543210', password: '$2a$10$xQXg5h5h5h5h5h5h5h5h5e', role: 'driver', ambulanceId: 1 },
  { id: 3, name: 'Suresh Babu', mobile: '9876543211', password: '$2a$10$xQXg5h5h5h5h5h5h5h5h5e', role: 'driver', ambulanceId: 2 },
  { id: 4, name: 'Vijay Singh', mobile: '9876543212', password: '$2a$10$xQXg5h5h5h5h5h5h5h5h5e', role: 'driver', ambulanceId: 3 },
  { id: 5, name: 'Rajesh Kumar', mobile: '9123456789', password: '$2a$10$xQXg5h5h5h5h5h5h5h5h5e', role: 'patient' }
];

let ambulances = [
  { id: 1, type: 'Basic', vehicleNumber: 'KA-01-AB-1234', driverId: 2, status: 'available', features: 'First Aid Kit, Oxygen, Stretcher' },
  { id: 2, type: 'Advanced', vehicleNumber: 'KA-01-CD-5678', driverId: 3, status: 'available', features: 'ICU Equipment, Ventilator, Cardiac Monitor' },
  { id: 3, type: 'ICU', vehicleNumber: 'KA-01-EF-9012', driverId: 4, status: 'available', features: 'Full ICU Setup, Advanced Life Support' }
];

let bookings = [];
let driverLocations = {};

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// ========== AUTH ROUTES ==========

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, mobile, password, role, age, email } = req.body;
    
    // Check if user exists
    if (users.find(u => u.mobile === mobile)) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
      id: users.length + 1,
      name,
      mobile,
      password: hashedPassword,
      role: role || 'patient',
      age,
      email,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    res.json({ message: 'Registration successful', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { mobile, password, role } = req.body;
    
    const user = users.find(u => u.mobile === mobile && u.role === role);
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // For demo, accept any password. In production, use: await bcrypt.compare(password, user.password)
    const validPassword = true; // await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user.id, mobile: user.mobile, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Get ambulance info for drivers
    let ambulanceInfo = null;
    if (user.role === 'driver' && user.ambulanceId) {
      ambulanceInfo = ambulances.find(a => a.id === user.ambulanceId);
    }
    
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        mobile: user.mobile,
        role: user.role,
        ambulance: ambulanceInfo
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// ========== AMBULANCE ROUTES ==========

// Get all ambulances
app.get('/api/ambulances', authenticateToken, (req, res) => {
  const ambulancesWithDrivers = ambulances.map(amb => {
    const driver = users.find(u => u.id === amb.driverId);
    return {
      ...amb,
      driverName: driver ? driver.name : 'Not Assigned',
      driverMobile: driver ? driver.mobile : null
    };
  });
  res.json(ambulancesWithDrivers);
});

// Add ambulance (Admin only)
app.post('/api/ambulances', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  const { type, vehicleNumber, features, driverId } = req.body;
  
  const newAmbulance = {
    id: ambulances.length + 1,
    type,
    vehicleNumber,
    driverId: driverId || null,
    status: 'available',
    features
  };
  
  ambulances.push(newAmbulance);
  res.json(newAmbulance);
});

// Delete ambulance (Admin only)
app.delete('/api/ambulances/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  const id = parseInt(req.params.id);
  ambulances = ambulances.filter(a => a.id !== id);
  res.json({ message: 'Ambulance deleted' });
});

// ========== DRIVER ROUTES ==========

// Get all drivers (Admin only)
app.get('/api/drivers', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  const drivers = users.filter(u => u.role === 'driver').map(d => {
    const ambulance = ambulances.find(a => a.driverId === d.id);
    const location = driverLocations[d.id];
    return {
      id: d.id,
      name: d.name,
      mobile: d.mobile,
      ambulance: ambulance ? ambulance.vehicleNumber : 'Not Assigned',
      status: location ? 'active' : 'inactive',
      location: location || null
    };
  });
  
  res.json(drivers);
});

// Add driver (Admin only)
app.post('/api/drivers', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  const { name, mobile, password, email, ambulanceId } = req.body;
  
  if (users.find(u => u.mobile === mobile)) {
    return res.status(400).json({ error: 'Driver already exists' });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newDriver = {
    id: users.length + 1,
    name,
    mobile,
    password: hashedPassword,
    email,
    role: 'driver',
    ambulanceId: ambulanceId || null
  };
  
  users.push(newDriver);
  res.json({ message: 'Driver added', driverId: newDriver.id });
});

// Delete driver (Admin only)
app.delete('/api/drivers/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: 'Driver deleted' });
});

// Update driver location
app.post('/api/drivers/location', authenticateToken, (req, res) => {
  if (req.user.role !== 'driver') {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  const { latitude, longitude } = req.body;
  
  driverLocations[req.user.id] = {
    latitude,
    longitude,
    timestamp: new Date().toISOString()
  };
  
  res.json({ message: 'Location updated' });
});

// Get driver location (for tracking)
app.get('/api/drivers/location/:driverId', authenticateToken, (req, res) => {
  const driverId = parseInt(req.params.driverId);
  const location = driverLocations[driverId];
  
  if (!location) {
    return res.status(404).json({ error: 'Location not available' });
  }
  
  res.json(location);
});

// ========== BOOKING ROUTES ==========

// Get all bookings
app.get('/api/bookings', authenticateToken, (req, res) => {
  let filteredBookings = bookings;
  
  // Drivers see only their bookings
  if (req.user.role === 'driver') {
    const driver = users.find(u => u.id === req.user.id);
    const ambulance = ambulances.find(a => a.driverId === req.user.id);
    
    filteredBookings = bookings.filter(b => 
      b.driverId === req.user.id || 
      (ambulance && b.ambulanceId === ambulance.id)
    );
  }
  
  // Patients see only their bookings
  if (req.user.role === 'patient') {
    filteredBookings = bookings.filter(b => b.patientId === req.user.id);
  }
  
  res.json(filteredBookings);
});

// Create booking (Patient only)
app.post('/api/bookings', authenticateToken, (req, res) => {
  if (req.user.role !== 'patient') {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  const {
    ambulanceId,
    pickupLocation,
    dropoffLocation,
    bookingDate,
    contactNumber,
    distance
  } = req.body;
  
  const ambulance = ambulances.find(a => a.id === ambulanceId);
  if (!ambulance) {
    return res.status(404).json({ error: 'Ambulance not found' });
  }
  
  const driver = users.find(u => u.id === ambulance.driverId);
  const patient = users.find(u => u.id === req.user.id);
  
  // Calculate price based on ambulance type
  const prices = { Basic: 1500, Advanced: 3000, ICU: 5000 };
  const price = prices[ambulance.type] || 1500;
  
  const newBooking = {
    id: 'BK' + Date.now(),
    patientId: req.user.id,
    patientName: patient.name,
    patientMobile: contactNumber,
    ambulanceId: ambulance.id,
    ambulanceType: ambulance.type,
    ambulanceVehicle: ambulance.vehicleNumber,
    driverId: ambulance.driverId,
    driverName: driver ? driver.name : 'Not Assigned',
    driverMobile: driver ? driver.mobile : null,
    pickupLocation,
    dropoffLocation,
    bookingDate,
    distance,
    price,
    status: 'active',
    paymentStatus: 'pending',
    createdAt: new Date().toISOString()
  };
  
  bookings.push(newBooking);
  
  // Update ambulance status
  ambulance.status = 'busy';
  
  res.json(newBooking);
});

// Update booking status (Driver)
app.patch('/api/bookings/:id/status', authenticateToken, (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;
  
  const booking = bookings.find(b => b.id === bookingId);
  
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  // Only driver of the booking or admin can update
  if (req.user.role !== 'admin' && booking.driverId !== req.user.id) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  booking.status = status;
  
  // If completed, free up ambulance
  if (status === 'completed') {
    const ambulance = ambulances.find(a => a.id === booking.ambulanceId);
    if (ambulance) {
      ambulance.status = 'available';
    }
  }
  
  res.json(booking);
});

// Update payment status
app.patch('/api/bookings/:id/payment', authenticateToken, (req, res) => {
  const bookingId = req.params.id;
  const { paymentStatus, paymentMethod } = req.body;
  
  const booking = bookings.find(b => b.id === bookingId);
  
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  // Only patient who made booking can update payment
  if (req.user.role === 'patient' && booking.patientId !== req.user.id) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  booking.paymentStatus = paymentStatus;
  booking.paymentMethod = paymentMethod;
  
  res.json(booking);
});

// Add feedback to booking
app.patch('/api/bookings/:id/feedback', authenticateToken, (req, res) => {
  const bookingId = req.params.id;
  const { rating, feedback } = req.body;
  
  const booking = bookings.find(b => b.id === bookingId);
  
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  booking.rating = rating;
  booking.feedback = feedback;
  
  res.json(booking);
});

// ========== STATISTICS ==========

app.get('/api/stats', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  const totalAmbulances = ambulances.length;
  const totalDrivers = users.filter(u => u.role === 'driver').length;
  const totalBookings = bookings.length;
  const totalRevenue = bookings
    .filter(b => b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + b.price, 0);
  
  res.json({
    totalAmbulances,
    totalDrivers,
    totalBookings,
    totalRevenue
  });
});

// ========== START SERVER ==========

app.listen(PORT, () => {
  console.log(`ArogyaVan Backend Server running on http://localhost:${PORT}`);
  console.log('\nDemo Credentials:');
  console.log('Admin - Mobile: 9999999999, Password: admin123');
  console.log('Driver - Mobile: 9876543210, Password: driver123');
  console.log('Patient - Mobile: 9123456789, Password: patient123');
});
