const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // CORS headers for preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  console.log('API hit with method:', req.method); // DEBUG

  if (req.method === 'POST') {
    try {
      const { amount, product } = req.body;
      console.log('POST body:', { amount, product }); // DEBUG

      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('STRIPE_SECRET_KEY not set in env');
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: product },
            unit_amount: amount,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      res.status(200).json({ id: session.id });
    } catch (err) {
      console.error('Stripe error:', err); // DEBUG
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(405).end('Method Not Allowed');
  }
}
<div className="swag-section">   <h2 style={{ color: '#ff0000', textAlign: 'center', margin: '3rem 0 2rem' }}>     OFFICIAL BLACK FLAG SWAG   </h2>   <div className="grid">     <a href="/shop/patriot-pirate-tee" className="swag-card">Patriot Pirate Tee – $35</a>     <a href="/shop/black-flag-hoodie" className="swag-card">Black Flag Hoodie – $65</a>     <a href="/shop/betsy-ross-skull-hat" className="swag-card">Betsy Ross Skull Hat – $30</a>     <a href="/shop/custom-patch" className="swag-card">Custom Velcro Patch – $15</a>   </div>   <a href="/shop" className="all-swag-btn">SEE FULL STORE →</a> </div> 
