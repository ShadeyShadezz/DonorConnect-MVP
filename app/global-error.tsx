'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ margin: 0, padding: 20, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ maxWidth: 600, margin: '50px auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Something went wrong!</h2>
          <p style={{ color: '#666', marginBottom: 32 }}>{error.message || 'An unexpected error occurred'}</p>
          <button
            onClick={() => reset()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 16,
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
