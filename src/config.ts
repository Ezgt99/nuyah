// ============================================================
//  MEMORY ALBUM — EDITABLE CONFIG
//  Change everything here. You do not need to touch the code.
// ============================================================

export const config = {
  // The name shown in the hero and ending sections
  name: 'Nuyah',

  // Countdown target. Before this date the site only shows the countdown.
  // Format: "YYYY-MM-DDTHH:mm:ss"
  // Set a future date to see the countdown, or a past date to skip straight to the album.
  targetDate: '2026-11-27T00:00:00',

  // Background music (royalty-free ambient). Host your own file and paste the URL here,
  // or use null to disable music entirely.
  musicUrl:
    'https://dn721809.ca.archive.org/0/items/the-1975-about-you/The%201975%20-%20About%20You.mp3',
  musicVolume: 0.3,

  // Theme accent colors (used by inline styles / particles)
  theme: {
    bg: ['#050505', '#0B0B0F', '#11111A'],
    gold: '#E8C77A',
    blush: '#E8B4C4',
    lavender: '#C9B6E4',
    warm: '#F5EFE6',
  },

  // Scrapbook photos. Each: image, title, date, message, rotation, side.
  // `side` controls which direction the photo slides in on scroll: 'left' | 'right'
  photos: [
    {
      image:
        'https://files.catbox.moe/pbjl5r.jpg',
      title: '',
      date: ' ',
      message: '',
      rotate: -6,
      side: 'left',
    },
    {
      image:
        'https://files.catbox.moe/p191fs.jpeg',
      title: '',
      date: '',
      message: '',
      rotate: 4,
      side: 'right',
    },
    {
      image:
        'https://files.catbox.moe/4d4h56.png',
      title: '',
      date: '',
      message: '',
      rotate: -3,
      side: 'left',
    },
    {
      image:
        'https://files.catbox.moe/rpb45m.png',
      title: '',
      date: '',
      message: '',
      rotate: 5,
      side: 'right',
    },
    {
      image:
        'https://files.catbox.moe/do4l7p.png',
      title: '',
      date: '',
      message: '',
      rotate: -5,
      side: 'left',
    },
    {
      image:
        'https://files.catbox.moe/gg6c57.png',
      title: '',
      date: '',
      message: '',
      rotate: 3,
      side: 'right',
    },
  ],

  // Timeline of the journey
  timeline: [
    {
      image:
        'https://files.catbox.moe/qd022b.jpeg',
      title: 'Foto masa kecil',
      date: '',
      story: 'Foto masa kecil nuyah >_<. Katanya, waktu foto itu diambil, dia baru habis nangis karena temannya. Terus dibeliin minuman sama ibunya. Hahaha.',
    },
    {
      image:
        'https://files.catbox.moe/el80z2.jpeg',
      title: 'Foto Remaja',
      date: '',
      story: 'Foto dia waktu remaja. Wkwkwk, polos banget mukanya',
    },
    {
      image:
        'https://files.catbox.moe/sz9tgw.jpeg',
      title: 'Foto  Dewasa',
      date: '',
      story: 'Foto di tempat yang sama seperti foto kedua. Bedanya, dia sudah nggak seceria dulu. Ayo, ceria lagi ya, Nuyah ^⁠_⁠^',
    },
    {
      image:
        'https://files.catbox.moe/oq6f0e.jpeg',
      title: 'Foto Liburan Eeee... Mungkin enggak deh wkwk',
      date: '',
      story: 'Foto dia pas di suruh ikut camping (Lebih tepatnya jadi supir pribadi haha). Nggak kebagian tempat, jadi nginep semalaman di mobil. Jadinya nyuruh aku nemenin dia di Discord. Wkwkw',
    },
    {
      image:
        'https://files.catbox.moe/yn1k2o.jpeg',
      title: 'Random Foto',
      date: '',
      story: 'Foto dia pas baru sampai di tujuan setelah seharian perjalanan. Parah banget, aku ditinggal main Roblox sendirian. T_T',
    },
  ],

  // The final / ending photo (slightly larger, still printed-photo style)
  endingPhoto:
    'https://files.catbox.moe/kpnrba.jpeg',
};

export type MemoryPhoto = (typeof config.photos)[number];
export type TimelineItem = (typeof config.timeline)[number];
