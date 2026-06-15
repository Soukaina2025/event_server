const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Créer un PaymentIntent
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, userId, eventId } = req.body;
        
        console.log(`📝 Création PaymentIntent - Montant: ${amount}`);
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'mad',
            metadata: {
                userId: userId,
                eventId: eventId
            }
        });
        
        console.log(`✅ PaymentIntent créé: ${paymentIntent.id}`);
        
        res.status(200).json({
            status: 'success',
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
        
    } catch (error) {
        console.error('❌ Erreur:', error.message);
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;