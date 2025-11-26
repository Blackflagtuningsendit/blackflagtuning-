import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleBuy = async (amount, product) => {
  if (!stripePromise) {
    alert('Stripe not loaded — check keys, you madman.');
    return;
  }
  setLoading(true);
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to load');
    
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, product }),
    });
    
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API error: ${response.status} - ${errText}`);
    }
    
    const session = await response.json();
    if (!session.id) throw new Error('No session ID from API');
    
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) throw new Error(result.error.message);
  } catch (error) {
    console.error('Buy error:', error); // Logs to browser console for debug
    alert(`Send failed: ${error.message}. Check console or keys.`);
  } finally {
    setLoading(false); // ALWAYS RESET LOADING, NO MATTER WHAT
  }
};
  };

  return (
    <div style={{ background: 'black', color: 'red', textAlign: 'center', minHeight: '100vh', padding: '20px' }}>
      <div style={{ fontSize: '30vw', filter: 'drop-shadow(0 0 40px red)', animation: 'spin 20s linear infinite' }}>☠️</div>
      <h1 style={{ fontSize: '8vw', letterSpacing: '10px', textShadow: '0 0 30px red' }}>BLACK FLAG TUNING</h1>
      <p style={{ fontSize: '2vw', margin: '20px' }}>Unlock Keys — One Tap To Freedom</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <button 
          onClick={() => handleBuy(7999, 'GM Global B Unlock')} 
          disabled={loading}
          style={{ background: 'red', color: 'black', padding: '20px 40px', fontSize: '1.5em', border: 'none', cursor: 'pointer', borderRadius: '10px' }}
        >
          {loading ? 'SENDING...' : 'GM Unlock - $79.99'}
        </button>
        <button 
          onClick={() => handleBuy(9999, 'Ford PCM Unlock')} 
          disabled={loading}
          style={{ background: 'red', color: 'black', padding: '20px 40px', fontSize: '1.5em', border: 'none', cursor: 'pointer', borderRadius: '10px' }}
        >
          {loading ? 'SENDING...' : 'Ford Unlock - $99.99'}
        </button>
      </div>
      <style jsx global>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
