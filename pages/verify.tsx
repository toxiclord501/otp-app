import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Verify() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const phone = router.query.phone as string;

  const verifyOtp = async () => {
    setLoading(true);
    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp }),
    });
    setLoading(false);
    if (res.ok) alert('OTP valid!');
    else alert('OTP salah atau expired');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Verifikasi OTP</h1>
      <p>Nomor: {phone}</p>
      <input
        type="text"
        placeholder="Masukkan OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp} disabled={loading}>
        {loading ? 'Memverifikasi...' : 'Verifikasi'}
      </button>
    </div>
  );
}
