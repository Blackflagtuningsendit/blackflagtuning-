import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleBuy = async (amount, product) => {
    console.log('Buy clicked:', { amount, product }); // DEBUG: See in console
    if (!stripePromise) {
      alert('Stripe not loaded — check publishable key env var.');
      return;
    }
    setLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');
      
      console.log('Fetching API...'); // DEBUG
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, product }),
      });
      
      console.log('API response status:', response.status); // DEBUG
      if (!response.ok) {
        const errText = await response.text();
        console.error('API error details:', errText); // DEBUG
        throw new Error(`API error: ${response.status} - ${errText}`);
      }
      
      const session = await response.json();
      console.log('Session ID:', session.id); // DEBUG
      if (!session.id) throw new Error('No session ID from API');
      
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) throw new Error(result.error.message);
    } catch (error) {
      console.error('Full buy error:', error); // DEBUG
      alert(`Send failed: ${error.message}. Check console for details.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      background: 'black', 
      color: 'red', 
      textAlign: 'center', 
      minHeight: '100vh', 
      padding: '20px', 
      position: 'relative' 
    }}>
      <div 
        style={{ 
          fontSize: '30vw', 
          filter: 'drop-shadow(0 0 40px red)', 
          animation: 'spin 20s linear infinite',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        ☠️
      </div>
      <h1 style={{ 
        fontSize: '8vw', 
        letterSpacing: '10px', 
        textShadow: '0 0 30px red', 
        position: 'absolute', 
        bottom: '20%', 
        left: '50%', 
        transform: 'translateX(-50%)',
        zIndex: 2 
      }}>
        BLACK FLAG TUNING
      </h1>
      <p style={{ fontSize: '2vw', margin: '20px', zIndex: 2 }}>Unlock Keys — One Tap To Freedom</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', zIndex: 2 }}>
        <button 
          onClick={() => handleBuy(7999, 'GM Global B Unlock')} 
          disabled={loading}
          style={{ 
            background: 'red', 
            color: 'black', 
            padding: '20px 40px', 
            fontSize: '1.5em', 
            border: 'none', 
            cursor: 'pointer', 
            borderRadius: '10px' 
          }}
        >
          {loading ? 'SENDING...' : 'GM Unlock - $79.99'}
        </button>
        <button 
          onClick={() => handleBuy(9999, 'Ford PCM Unlock')} 
          disabled={loading}
          style={{ 
            background: 'red', 
            color: 'black', 
            padding: '20px 40px', 
            fontSize: '1.5em', 
            border: 'none', 
            cursor: 'pointer', 
            borderRadius: '10px' 
          }}
        >
          {loading ? 'SENDING...' : 'Ford Unlock - $99.99'}
        </button>
      </div>
      <style dangerouslySetInnerHTML={{ __html: '@keyframes spin { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(360deg); } }' }} />
    </div>
  );
}
