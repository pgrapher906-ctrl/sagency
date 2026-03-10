require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// 🔍 Connection Tester (Check your terminal when you start)
pool.query('SELECT NOW()', (err) => {
  if (err) console.error("🚨 Neon Connection Failed:", err.message);
  else console.log("✅ Neon Connection Successful!");
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.post('/api/contact', async (req, res) => {

  const { firstName, lastName, email, contactNumber, companyName, message } = req.body;
  console.log({ firstName, lastName, email, contactNumber, companyName, message });

  // Validation Check (trim whitespace)
  if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !contactNumber?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const query = `
      INSERT INTO contacts (first_name, last_name, email, contact_number, company_name, message) 
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [firstName, lastName, email, contactNumber, companyName || '', message];
    
    await pool.query(query, values);
    res.json({ success: true });
  } catch (err) {
    console.error("ACTUAL DB ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));