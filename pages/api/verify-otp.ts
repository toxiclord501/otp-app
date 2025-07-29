import type { NextApiRequest, NextApiResponse } from 'next';
import redis from '../../lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, otp } = req.body;
  const savedOtp = await redis.get(phone);

  if (savedOtp === otp) {
    await redis.del(phone); // hapus OTP setelah berhasil
    res.status(200).json({ message: 'OTP valid' });
  } else {
    res.status(400).json({ error: 'OTP tidak cocok atau expired' });
  }
}
