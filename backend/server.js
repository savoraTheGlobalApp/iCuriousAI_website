import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

// Waitlist Signup Endpoint
app.post('/api/waitlist-signup', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        // Insert into Supabase
        const supabaseRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/waitlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": process.env.SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
                "Prefer": "return=representation"
            },
            body: JSON.stringify({ name, email, message })
        });

        if (!supabaseRes.ok) {
            const errorText = await supabaseRes.text();
            console.error("Supabase error:", errorText);
            return res.status(500).json({ error: "Failed to join waitlist" });
        }

        const data = await supabaseRes.json();

        // Return JSON success (React friendly)
        return res.status(200).json({
            message: "Successfully joined waitlist",
            data,
            redirect: "/thank-you.html" // Optional: for frontend to handle redirect
        });

    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Contact Form Endpoint
app.post('/api/submit-contact', async (req, res) => {
    try {
        const { name, email, role, message } = req.body;
        const recaptchaToken = req.body['g-recaptcha-response'];

        // Verify reCAPTCHA
        const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                secret: process.env.RECAPTCHA_SECRET_KEY,
                response: recaptchaToken
            })
        });

        const captchaData = await captchaRes.json();

        if (!captchaData.success) {
            return res.status(400).json({ error: "Invalid CAPTCHA" });
        }

        // Insert into Supabase
        const supabaseRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/contact_form`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": process.env.SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
                "Prefer": "return=representation"
            },
            body: JSON.stringify({ name, email, role, message })
        });

        if (!supabaseRes.ok) {
            const errorText = await supabaseRes.text();
            console.error("Supabase insert failed:", errorText);
            return res.status(500).json({ error: "Failed to submit contact form" });
        }

        const data = await supabaseRes.json();

        // Return JSON success
        return res.status(200).json({
            message: "Contact form submitted successfully",
            data,
            redirect: "/thank-you.html"
        });

    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
