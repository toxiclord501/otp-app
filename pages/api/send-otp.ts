import type { NextApiRequest, NextApiResponse } from 'next';
import { Twilio } from 'twilio';
import redis from '../../lib/redis';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER!;
const client = new Twilio(accountSid, authToken);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await redis.set(phone, otp, { ex: 300 }); // OTP berlaku 5 menit

  try {
    await client.messages.create({
      body: `Kode OTP kamu: ${otp}`,
      from: twilioNumber,
      to: phone,
    });
    res.status(200).json({ message: 'OTP dikirim' });
  } catch (err) {
    res.status(500).json({ error: 'Gagal kirim SMS' });
  }
}
