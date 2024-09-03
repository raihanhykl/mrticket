import Link from 'next/link';

export const Footer = () => {
  return (
    <div>
      <div className="bg-[#112041] flex text-white justify-center gap-[60px] py-10">
        <div className="grid gap-2">
          <p className="font-semibold text-left">Tentang Loket</p>
          <div className="grid text-left text-sm">
            <Link href="">Masuk</Link>
            <Link href="">Biaya</Link>
            <Link href="">Lihat Event</Link>
            <Link href="">FAQ</Link>
            <Link href="">Syarat dan Ketentuan</Link>
            <Link href="">Laporan Kesalahan</Link>
            <Link href="">Sistem</Link>
          </div>
        </div>
        <div className="grid gap-2">
          <p className="font-semibold text-left">Rayakan Eventmu</p>
          <div className="grid text-left text-sm">
            <Link href="">Cara Mempersiapkan Event</Link>
            <Link href="">Cara membuat Event Lomba</Link>
            <Link href="">Cara membuat Event Lomba</Link>
            <Link href="">Cara membuat Event Lomba</Link>
            <Link href="">Cara membuat Event Lomba</Link>
            <Link href="">Cara membuat Event Lomba</Link>
            <Link href="">Cara membuat Event Lomba</Link>
          </div>
        </div>

        <div className="grid gap-4">
          <p className="font-semibold text-left">Lokasi Event</p>
          <div className="grid text-left text-sm">
            <Link href="">Jakarta</Link>
            <Link href="">Bandung</Link>
            <Link href="">Yogyakarta</Link>
            <Link href="">Surabaya</Link>
            <Link href="">Solo</Link>
            <Link href="">Medan</Link>
            <Link href="">Bali</Link>
            <Link href="">Semua Kota</Link>
          </div>
        </div>

        <div className="grid gap-4">
          <p className="font-semibold text-left">Inspirasi Event</p>
          <div className="grid text-left text-sm">
            <Link href="">Festival</Link>
            <Link href="">Konser</Link>
            <Link href="">Olahraga</Link>
            <Link href="">Workshop & Seminar</Link>
            <Link href="">Teater & Drama</Link>
            <Link href="">Atraksi</Link>
            <Link href="">Semua Kategori</Link>
          </div>
        </div>
      </div>
      <div className="bg-[#1d3976] text-white py-[55px] text-sm">
        <div className="flex gap-5 justify-center">
          <Link href="">Tentang Kami</Link>
          <Link href="">Blog</Link>
          <Link href="">Kebijakan Privasi</Link>
          <Link href="">Kebijakan Cookie</Link>
          <Link href="">Panduan</Link>
          <Link href="">Hubungan Kami</Link>
        </div>
        <div className="pt-10">
          <p>© 2024 Loket (PT Global Loket Sejahtera)</p>
        </div>
      </div>
    </div>
  );
};
