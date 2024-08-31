import { z } from 'zod';
export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string({ message: 'Mohon masukan kata sandi Anda.' })
    .min(6, {
      message:
        'Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka',
    })
    .regex(/[a-zA-Z]/, {
      message:
        'Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka',
    })
    .regex(/[0-9]/, {
      message:
        'Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka',
    })
    .trim(),
});
