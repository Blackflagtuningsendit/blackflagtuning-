import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleBuy = async (amount, product) => {
    console.log('Buy clicked:', { amount, product });
    if (!stripePromise) {
      alert('Stripe not loaded — check publishable key env var.');
      return;
    }
    setLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');
      
      console.log('Fetching API...');
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, product }),
      });
      
      console.log('API response status:', response.status);
      if (!response.ok) {
        const errText = await response.text();
        console.error('API error details:', errText);
        throw new Error(`API error: ${response.status} - ${errText}`);
      }
      
      const session = await response.json();
      console.log('Session ID:', session.id);
      if (!session.id) throw new Error('No session ID from API');
      
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) throw new Error(result.error.message);
    } catch (error) {
      console.error('Full buy error:', error);
      alert(`Send failed: ${error.message}. Check console for details.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      background: 'black', 
      color: 'red', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      minHeight: '100vh', 
      margin: 0, 
      padding: '20px', 
      fontFamily: 'Impact, sans-serif' 
    }}>
      <div style={{ 
        fontSize: '30vw', 
        filter: 'drop-shadow(0 0 40px red)', 
        animation: 'spin 20s linear infinite',
        maxWidth: '100%',
        maxHeight: '60vh'
      }}>
        ☠️
      </div>
      <div style={{ 
        textAlign: 'center', 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        gap: '20px' 
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2rem, 8vw, 6rem)', 
          letterSpacing: '10px', 
          textShadow: '0 0 30px red', 
          margin: 0 
        }}>
          BLACK FLAG TUNING
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', margin: 0 }}>Unlock Keys — One Tap To Freedom</p>
      </div>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '15px', 
        width: '100%', 
        maxWidth: '400px' 
      }}>
        <button 
          onClick={() => handleBuy(7999, 'GM Global B Unlock')} 
          disabled={loading}
          style={{ 
            background: 'red', 
            color: 'black', 
            padding: '15px 30px', 
            fontSize: '1.2em', 
            border: 'none', 
            cursor: 'pointer', 
            borderRadius: '10px', 
            fontWeight: 'bold' 
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
            padding: '15px 30px', 
            fontSize: '1.2em', 
            border: 'none', 
            cursor: 'pointer', 
            borderRadius: '10px', 
            fontWeight: 'bold' 
          }}
        >
          {loading ? 'SENDING...' : 'Ford Unlock - $99.99'}
        </button>
      </div>
      <style dangerouslySetInnerHTML={{ __html: '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }' }} />
    </div>
  );
      <button 
          onClick={() => handleBuy(8999, 'FCA SGW Unlock')} 
          disabled={loading}
          style={{ 
            background: 'red', 
            color: 'black', 
            padding: '15px 30px', 
            fontSize: '1.2em', 
            border: 'none', 
            cursor: 'pointer', 
            borderRadius: '10px', 
            fontWeight: 'bold' 
          }}
        >
          {loading ? 'SENDING...' : 'FCA Unlock - $89.99'}
        </button>
        <button 
          onClick={() => handleBuy(12999, 'Toyota Denso Gen5 Unlock')} 
          disabled={loading}
          style={{ 
            background: 'red', 
            color: 'black', 
            padding: '15px 30px', 
            fontSize: '1.2em', 
            border: 'none', 
            cursor: 'pointer', 
            borderRadius: '10px', 
            fontWeight: 'bold' 
          }}
        >
          {loading ? 'SENDING...' : 'Toyota Unlock - $129.99'}
        </button>
        <button 
          onClick={() => handleBuy(34900, '5-Key Bundle Unlock')} 
          disabled={loading}
          style={{ 
            background: 'orange', 
            color: 'black', 
            padding: '15px 30px', 
            fontSize: '1.2em', 
            border: 'none', 
            cursor: 'pointer', 
            borderRadius: '10px', 
            fontWeight: 'bold' 
          }}
        >
          {loading ? 'SENDING...' : '5-Key Bundle - $349'}
        </button>
        <button 
          onClick={() => handleBuy(99900, 'Shop License (Unlimited VINs)')} 
          disabled={loading}
          style={{ 
            background: 'purple', 
            color: 'white', 
            padding: '15px 30px', 
            fontSize: '1.2em', 
            border: 'none', 
            cursor: 'pointer', 
            borderRadius: '10px', 
            fontWeight: 'bold' 
          }}
        >
          {loading ? 'SENDING...' : 'Shop License - $999'}
        </button>


