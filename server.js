const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files (HTML/CSS/JS)
app.use(express.static(path.join(__dirname, '../public')));

// 1. Auth Endpoint (Login Credentials Check)
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    // Assessment Test Credentials
    if (username === 'admin' && password === 'Admin@123') { //
        return res.json({ success: true, token: 'mock-jwt-token-123', message: 'Login Successful' });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials' }); //
});

// 2. Leads Endpoints (Dummy Data / Database logic)
app.get('/api/leads', (req, res) => {
    // Lead listing data response
    res.json({
        success: true,
        leads: [
            {
                id: 1,
                lead_name: 'Rahul Sharma', //
                company_name: 'TechCorp', //
                mobile: '9876543210', //
                email: 'rahul@techcorp.com', //
                service_required: 'Web Application', //
                lead_source: 'LinkedIn', //
                status: 'New', //
                assigned_to: 'Admin' //
            }
        ]
    });
});

// 3. Dashboard Analytics Endpoint
app.get('/api/dashboard/stats', (req, res) => {
    // Visual / Summary stats
    res.json({
        totalLeads: 12,
        newLeads: 4,
        proposalSent: 3,
        won: 2,
        lost: 3,
        potentialValue: 150000 //
    });
});

// Netlify Functions Routing Helper
app.use('/.netlify/functions/api', (req, res, next) => {
    // Routing prefix adjustment for Netlify
    next();
});

// Local development support (npm run start ke liye)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running locally on port ${PORT}`));
}

module.exports = app;