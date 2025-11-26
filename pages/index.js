  return (
    <div style={{ 
      background: 'black', 
      color: 'red', 
      textAlign: 'center', 
      minHeight: '100vh', 
      position: 'relative',
      margin: 0,
      padding: 0 
    }}>
      <div 
        style={{ 
          fontSize: '30vw', 
          filter: 'drop-shadow(0 0 40px red)', 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(0deg)',
          animation: 'spin 20s linear infinite',
          zIndex: 1
        }}
      >
        ☠️
      </div>
      <h1 style={{ 
        fontSize: '8vw', 
        letterSpacing: '10px', 
        textShadow: '0 0 30px red', 
        position: 'absolute', 
        bottom: '10%', 
        left: '50%', 
        transform: 'translateX(-50%)',
        zIndex: 2,
        margin: 0,
        padding: 0
      }}>
        BLACK FLAG TUNING
      </h1>
      <div style={{ 
        position: 'absolute', 
        bottom: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '20px', 
        zIndex: 2 
      }}>
        <p style={{ fontSize: '1.5vw', margin: '0 0 20px 0', zIndex: 2 }}>Unlock Keys — One Tap To Freedom</p>
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
