import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendOtp = async () => {
    setLoading(true);
    const res = await fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
    setLoading(false);
    if (res.ok) router.push(`/verify?phone=${encodeURIComponent(phone)}`);
    else alert('Gagal mengirim OTP');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Kirim OTP</h1>
      <input
        type="text"
        placeholder="Masukkan nomor HP"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={sendOtp} disabled={loading}>
        {loading ? 'Mengirim...' : 'Kirim OTP'}
      </button>
    </div>
  );
}
