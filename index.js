const express = require('express');
const cors = require('cors');
require('dotenv').config();

const paymentRoutes = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Log les requêtes
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.path}`);
    next();
});

// Route d'accueil
app.get('/', (req, res) => {
    res.json({
        message: 'Serveur Event Manager en ligne',
        status: 'OK'
    });
});

// Routes de paiement
app.use('/api', paymentRoutes);

// Démarrer le serveur
app.listen(PORT, '0.0.0.0', () => {
    console.log('');
    console.log('╔═══════════════════════════════════════╗');
    console.log('║  🚀 SERVEUR DÉMARRÉ                   ║');
    console.log(`║  📍 http://localhost:${PORT}`);
    console.log(`║  📍 http://0.0.0.0:${PORT}`);
    console.log('║  ✅ Prêt pour les requêtes API        ║');
    console.log('╚═══════════════════════════════════════╝');
    console.log('');
});