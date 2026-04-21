const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// 1. Landing Page (The "Fancy" Welcome)
app.get('/', (req, res) => {
    res.send(`
        <body style="background: #0f172a; color: #38bdf8; font-family: sans-serif; text-align: center; padding-top: 100px;">
            <h1 style="font-size: 3rem;">Welcome</h1>
            <p style="color: #94a3b8;">Nothing to see here. Move along.</p>
            </body>
    `);
});

// 2. The "About" page (Hidden - ffuf should find /assets or /info)
// Using 'assets' as it is a very common wordlist hit
app.get('/assets', (req, res) => {
    res.send(`
        <div style="font-family: monospace; padding: 20px;">
            <h2>Internal Contact Directory</h2>
            <hr>
            <p>Support: tech_support@lab.internal</p>
            <p>Dev: dev_trent@lab.internal</p>
            <p>Backup Access: <b>temp_visitor</b>@lab.internal</p>
        </div>
    `);
});

// 3. The Login Page (Hidden - ffuf should find /portal or /console)
app.get('/portal', (req, res) => {
    res.send(`
        <body style="font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f3f4f6;">
            <form method="POST" action="/portal" style="background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
                <h2 style="margin-top: 0;">Restricted Access</h2>
                <input name="user" placeholder="Username" required style="display: block; width: 100%; margin-bottom: 10px; padding: 8px;"><br>
                <input name="pass" type="password" placeholder="Password" required style="display: block; width: 100%; margin-bottom: 20px; padding: 8px;"><br>
                <button type="submit" style="width: 100%; background: #2563eb; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer;">Login</button>
            </form>
        </body>
    `);
});

// 4. Password Cracking Logic
app.post('/portal', (req, res) => {
    const { user, pass } = req.body;
    
    // Crackable password: 'password123' or 'superman'
    if (user === 'temp_visitor' && pass === 'password123') {
        res.send(`<h1 style="color: green;">SUCCESS</h1><p>The Flag is: <b>FLAG{FUZZ_AND_CRACK_MASTER}</b></p>`);
    } else {
        // We return a 401 status so Hydra knows the attempt failed
        res.status(401).send("Login failed: Invalid credentials.");
    }
});

app.listen(PORT, () => console.log(`Lab running on port ${PORT}`));