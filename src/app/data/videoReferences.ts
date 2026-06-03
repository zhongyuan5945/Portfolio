export interface VideoReference {
  id: string;
  title: string;
  platform: 'TikTok' | 'YouTube' | 'Instagram';
  url: string;
  thumbnail: string;
  aspectRatio: number; // height/width ratio for masonry layout
  publishedAt: string;
}

export const videoReferences: VideoReference[] = [
  {
    id: 'ref-01',
    title: 'Video 01',
    platform: 'YouTube',
    publishedAt: '2021-11-19T05:01:59-08:00',
    url: 'https://youtu.be/tWvNqEyUgB4?si=SFeCznrSsnXJxS3O',
    thumbnail: 'https://img.youtube.com/vi/tWvNqEyUgB4/hqdefault.jpg',
    aspectRatio: 1.2
  },
  {
    id: 'ref-02',
    title: 'Video 02',
    platform: 'YouTube',
    publishedAt: '2021-11-23T04:13:27-08:00',
    url: 'https://youtu.be/-TB3FNOxbXw?si=WZUAO45B1emH-ULm',
    thumbnail: 'https://img.youtube.com/vi/-TB3FNOxbXw/hqdefault.jpg',
    aspectRatio: 0.8
  },
  {
    id: 'ref-03',
    title: 'Video 03',
    platform: 'YouTube',
    publishedAt: '2023-03-13T05:37:13-07:00',
    url: 'https://youtu.be/ntjzWwf2sG8?si=CgYjA0lmEmfxo31v',
    thumbnail: 'https://img.youtube.com/vi/ntjzWwf2sG8/hqdefault.jpg',
    aspectRatio: 1.5
  },
  {
    id: 'ref-04',
    title: 'Video 04',
    platform: 'YouTube',
    publishedAt: '2023-05-30T07:59:44-07:00',
    url: 'https://youtu.be/buplLJyQpPU?si=jf1eOpQmrk5C5JrK',
    thumbnail: 'https://img.youtube.com/vi/buplLJyQpPU/hqdefault.jpg',
    aspectRatio: 1.1
  },
  {
    id: 'ref-05',
    title: 'Video 05',
    platform: 'YouTube',
    publishedAt: '2023-06-26T04:20:47-07:00',
    url: 'https://youtu.be/tzrCIwRFwJw?si=w4MlxyKL9n8iULIe',
    thumbnail: 'https://img.youtube.com/vi/tzrCIwRFwJw/hqdefault.jpg',
    aspectRatio: 0.9
  },
  {
    id: 'ref-06',
    title: 'Video 06',
    platform: 'YouTube',
    publishedAt: '2023-12-29T06:05:25-08:00',
    url: 'https://youtu.be/QWEEhLIi3Zc?si=BC6b06UcnaoodwXl',
    thumbnail: 'https://img.youtube.com/vi/QWEEhLIi3Zc/hqdefault.jpg',
    aspectRatio: 1.3
  },
  {
    id: 'ref-07',
    title: 'Video 07',
    platform: 'YouTube',
    publishedAt: '2023-01-17T01:02:32-08:00',
    url: 'https://youtu.be/Y0ljiUNN8xg?si=uaCJMHf6I2xOUm-U',
    thumbnail: 'https://img.youtube.com/vi/Y0ljiUNN8xg/hqdefault.jpg',
    aspectRatio: 1.4
  },
  {
    id: 'ref-08',
    title: 'Video 08',
    platform: 'YouTube',
    publishedAt: '2025-07-18T05:11:43-07:00',
    url: 'https://youtu.be/yKtzfrGxmM0?si=IbMvM9b8ByoBKAB1',
    thumbnail: 'https://img.youtube.com/vi/yKtzfrGxmM0/hqdefault.jpg',
    aspectRatio: 0.7
  },
  {
    id: 'ref-09',
    title: 'Video 09',
    platform: 'YouTube',
    publishedAt: '2022-03-18T07:58:41-07:00',
    url: 'https://youtu.be/DhSpd4hB3DY?si=AXYaDS2iIYocm51c',
    thumbnail: 'https://img.youtube.com/vi/DhSpd4hB3DY/hqdefault.jpg',
    aspectRatio: 1.6
  },
  {
    id: 'ref-10',
    title: 'Video 10',
    platform: 'YouTube',
    publishedAt: '2023-04-03T05:01:43-07:00',
    url: 'https://youtu.be/o27lUbpEI7o?si=lc_kZKDGSS3xcQBw',
    thumbnail: 'https://img.youtube.com/vi/o27lUbpEI7o/hqdefault.jpg',
    aspectRatio: 0.85
  },
  {
    id: 'ref-11',
    title: 'Video 11',
    platform: 'YouTube',
    publishedAt: '2023-11-13T09:12:04-08:00',
    url: 'https://youtu.be/ZK9nD-Wx-lc?si=D7wrf-KDS726Vple',
    thumbnail: 'https://img.youtube.com/vi/ZK9nD-Wx-lc/hqdefault.jpg',
    aspectRatio: 1.25
  },
  {
    id: 'ref-12',
    title: 'Video 12',
    platform: 'YouTube',
    publishedAt: '2024-04-02T02:02:09-07:00',
    url: 'https://youtu.be/qaRuT4dt3Kg?si=aXCw-T2-A40aRg8g',
    thumbnail: 'https://img.youtube.com/vi/qaRuT4dt3Kg/hqdefault.jpg',
    aspectRatio: 1.35
  },
  {
    id: 'ref-13',
    title: 'Video 13',
    platform: 'YouTube',
    publishedAt: '2021-05-21T05:33:35-07:00',
    url: 'https://youtu.be/eJe18bbUsb8?si=V26RXJ3gBzmMPGII',
    thumbnail: 'https://img.youtube.com/vi/eJe18bbUsb8/hqdefault.jpg',
    aspectRatio: 0.95
  },
  {
    id: 'ref-14',
    title: 'Video 14',
    platform: 'YouTube',
    publishedAt: '2021-07-21T07:04:00-07:00',
    url: 'https://youtu.be/hJ35ltdi0pI?si=bjtsrInPv38NTX6_',
    thumbnail: 'https://img.youtube.com/vi/hJ35ltdi0pI/hqdefault.jpg',
    aspectRatio: 1.15
  },
  {
    id: 'ref-15',
    title: 'Video 15',
    platform: 'YouTube',
    publishedAt: '2022-05-09T02:25:45-07:00',
    url: 'https://youtu.be/ADh-aq6g7Pk?si=58kpg3pe8_1sTdz8',
    thumbnail: 'https://img.youtube.com/vi/ADh-aq6g7Pk/hqdefault.jpg',
    aspectRatio: 1.45
  },
  {
    id: 'ref-16',
    title: 'Video 16',
    platform: 'YouTube',
    publishedAt: '2022-07-18T08:35:20-07:00',
    url: 'https://youtu.be/P9i5-u1nAas?si=ddQKkC03f3tBZpwK',
    thumbnail: 'https://img.youtube.com/vi/P9i5-u1nAas/hqdefault.jpg',
    aspectRatio: 0.75
  },
  {
    id: 'ref-17',
    title: 'Video 17',
    platform: 'YouTube',
    publishedAt: '2023-02-07T05:35:06-08:00',
    url: 'https://youtu.be/802FWCUkYbA?si=Pal3d-zG9pXLbf6q',
    thumbnail: 'https://img.youtube.com/vi/802FWCUkYbA/hqdefault.jpg',
    aspectRatio: 1.55
  },
  {
    id: 'ref-18',
    title: 'Video 18',
    platform: 'YouTube',
    publishedAt: '2023-11-30T08:22:31-08:00',
    url: 'https://youtu.be/BUvoI933vTQ?si=MrNxo6nvLFEvfzTQ',
    thumbnail: 'https://img.youtube.com/vi/BUvoI933vTQ/hqdefault.jpg',
    aspectRatio: 1.05
  },
  {
    id: 'ref-19',
    title: 'Video 19',
    platform: 'YouTube',
    publishedAt: '2024-01-22T03:35:12-08:00',
    url: 'https://youtu.be/Uha8Z_JOx5A?si=uAUv-vueOyIfJ7WC',
    thumbnail: 'https://img.youtube.com/vi/Uha8Z_JOx5A/hqdefault.jpg',
    aspectRatio: 0.88
  },
  {
    id: 'ref-20',
    title: 'Video 20',
    platform: 'YouTube',
    publishedAt: '2021-05-12T01:42:06-07:00',
    url: 'https://youtu.be/dMe3Ftf_af4?si=h-OYYCFrhnhx464w',
    thumbnail: 'https://img.youtube.com/vi/dMe3Ftf_af4/hqdefault.jpg',
    aspectRatio: 1.22
  },
  {
    id: 'ref-21',
    title: 'Video 21',
    platform: 'YouTube',
    publishedAt: '2021-01-18T05:42:29-08:00',
    url: 'https://youtu.be/ZoGfyNCCVf4?si=hRsPar8TCb0cdprS',
    thumbnail: 'https://img.youtube.com/vi/ZoGfyNCCVf4/hqdefault.jpg',
    aspectRatio: 1.38
  },
  {
    id: 'ref-22',
    title: 'Video 22',
    platform: 'YouTube',
    publishedAt: '2020-12-02T06:35:27-08:00',
    url: 'https://youtu.be/OozcS6LvZIk?si=_0oEy0b1vZFcESk-',
    thumbnail: 'https://img.youtube.com/vi/OozcS6LvZIk/hqdefault.jpg',
    aspectRatio: 0.82
  },
  {
    id: 'ref-23',
    title: 'Video 23',
    platform: 'YouTube',
    publishedAt: '2023-04-20T02:03:42-07:00',
    url: 'https://youtu.be/Axl9xr9E9A8?si=3Zf_K1PAB8twgsti',
    thumbnail: 'https://img.youtube.com/vi/Axl9xr9E9A8/hqdefault.jpg',
    aspectRatio: 0.92
  },
  {
    id: 'ref-24',
    title: 'Video 24',
    platform: 'YouTube',
    publishedAt: '2024-03-08T09:21:40-08:00',
    url: 'https://youtu.be/xR-iwVoRyas?si=wzkrYxsxbIB5UBtE',
    thumbnail: 'https://img.youtube.com/vi/xR-iwVoRyas/hqdefault.jpg',
    aspectRatio: 1.18
  },
  {
    id: 'ref-25',
    title: 'Video 25',
    platform: 'YouTube',
    publishedAt: '2024-03-15T08:31:39-07:00',
    url: 'https://youtu.be/O1GKH6ZyIQU?si=tFG3SHRwHn6GdvyZ',
    thumbnail: 'https://img.youtube.com/vi/O1GKH6ZyIQU/hqdefault.jpg',
    aspectRatio: 1.42
  },
  {
    id: 'ref-26',
    title: 'Video 26',
    platform: 'YouTube',
    publishedAt: '2022-04-08T08:44:21-07:00',
    url: 'https://youtu.be/carr_0va31M?si=g0SMLF65NZa5U5xK',
    thumbnail: 'https://img.youtube.com/vi/carr_0va31M/hqdefault.jpg',
    aspectRatio: 0.78
  },
  {
    id: 'ref-27',
    title: 'Video 27',
    platform: 'YouTube',
    publishedAt: '2023-11-30T08:12:12-08:00',
    url: 'https://youtu.be/wt84T15_dds?si=PUj89QxFoucOt7Mw',
    thumbnail: 'https://img.youtube.com/vi/wt84T15_dds/hqdefault.jpg',
    aspectRatio: 1.32
  },
  {
    id: 'ref-28',
    title: 'Video 28',
    platform: 'YouTube',
    publishedAt: '2024-02-01T04:02:51-08:00',
    url: 'https://youtu.be/rXKrfAEXl8Y?si=SDxJDXl3Lo4l4JAy',
    thumbnail: 'https://img.youtube.com/vi/rXKrfAEXl8Y/hqdefault.jpg',
    aspectRatio: 1.08
  },
  {
    id: 'ref-29',
    title: 'Video 29',
    platform: 'YouTube',
    publishedAt: '2022-12-14T09:24:16-08:00',
    url: 'https://youtu.be/es3TQ0wjAuU?si=llyuwNiX7EeXS-o3',
    thumbnail: 'https://img.youtube.com/vi/es3TQ0wjAuU/hqdefault.jpg',
    aspectRatio: 0.68
  },
  {
    id: 'ref-30',
    title: 'Video 30',
    platform: 'YouTube',
    publishedAt: '2021-05-12T01:41:53-07:00',
    url: 'https://youtu.be/7QG5flf0OJM?si=0www0iTATSeBr4xc',
    thumbnail: 'https://img.youtube.com/vi/7QG5flf0OJM/hqdefault.jpg',
    aspectRatio: 1.52
  },
  {
    id: 'ref-31',
    title: 'Video 31',
    platform: 'YouTube',
    publishedAt: '2023-09-07T10:08:35-07:00',
    url: 'https://youtu.be/gSwUONLI4-o?si=4d4T2c4KMUpjDN7Y',
    thumbnail: 'https://img.youtube.com/vi/gSwUONLI4-o/hqdefault.jpg',
    aspectRatio: 1.28
  },
  {
    id: 'ref-32',
    title: 'Video 32',
    platform: 'YouTube',
    publishedAt: '2023-01-30T05:14:16-08:00',
    url: 'https://youtu.be/cUn28pizwnk?si=a7b3pcSLQVIPhzXn',
    thumbnail: 'https://img.youtube.com/vi/cUn28pizwnk/hqdefault.jpg',
    aspectRatio: 0.72
  },
  {
    id: 'ref-33',
    title: 'Video 33',
    platform: 'YouTube',
    publishedAt: '2023-05-11T08:35:03-07:00',
    url: 'https://youtu.be/SR7vNJ0dges?si=G7mwNGNPV6f7W_n8',
    thumbnail: 'https://img.youtube.com/vi/SR7vNJ0dges/hqdefault.jpg',
    aspectRatio: 1.62
  },
  {
    id: 'ref-34',
    title: 'Video 34',
    platform: 'YouTube',
    publishedAt: '2023-12-08T04:33:26-08:00',
    url: 'https://youtu.be/AyisZrdyKzE?si=UPrQZwBpl1-YnTns',
    thumbnail: 'https://img.youtube.com/vi/AyisZrdyKzE/hqdefault.jpg',
    aspectRatio: 0.98
  },
  {
    id: 'ref-35',
    title: 'Video 35',
    platform: 'YouTube',
    publishedAt: '2024-03-11T11:13:31-07:00',
    url: 'https://youtu.be/va8oYrfkAn8?si=MtLFM78tRopTSzt5',
    thumbnail: 'https://img.youtube.com/vi/va8oYrfkAn8/hqdefault.jpg',
    aspectRatio: 0.86
  },
  {
    id: 'ref-36',
    title: 'Video 36',
    platform: 'YouTube',
    publishedAt: '2024-01-22T03:38:27-08:00',
    url: 'https://youtu.be/06CpsiUS4JA?si=tdlQ_nLBkyRv5I2R',
    thumbnail: 'https://img.youtube.com/vi/06CpsiUS4JA/hqdefault.jpg',
    aspectRatio: 1.58
  },
  {
    id: 'ref-37',
    title: 'Video 37',
    platform: 'YouTube',
    publishedAt: '2024-01-18T07:20:41-08:00',
    url: 'https://youtu.be/ODjXGAHw0yU?si=PgXZHQzJK-feWrph',
    thumbnail: 'https://img.youtube.com/vi/ODjXGAHw0yU/hqdefault.jpg',
    aspectRatio: 1.02
  },
  {
    id: 'ref-38',
    title: 'Video 38',
    platform: 'YouTube',
    publishedAt: '2023-11-30T08:23:49-08:00',
    url: 'https://youtu.be/O6AwZMnGOaU?si=1OyNf8OW1uMm5i4k',
    thumbnail: 'https://img.youtube.com/vi/O6AwZMnGOaU/hqdefault.jpg',
    aspectRatio: 0.74
  },
  {
    id: 'ref-39',
    title: 'Video 39',
    platform: 'YouTube',
    publishedAt: '2022-04-27T05:36:19-07:00',
    url: 'https://youtu.be/hl9dli6naHE?si=O5c9o5h6fMnTej3a',
    thumbnail: 'https://img.youtube.com/vi/hl9dli6naHE/hqdefault.jpg',
    aspectRatio: 1.46
  },
  {
    id: 'ref-40',
    title: 'Short 40',
    platform: 'YouTube',
    publishedAt: '2023-04-07T04:12:40-07:00',
    url: 'https://youtube.com/shorts/_lXOK_KLbB0?si=aAdGaWVGFzLK2d-N',
    thumbnail: 'https://img.youtube.com/vi/_lXOK_KLbB0/hqdefault.jpg',
    aspectRatio: 1.36
  },
  {
    id: 'ref-41',
    title: 'Short 41',
    platform: 'YouTube',
    publishedAt: '2023-04-05T04:21:35-07:00',
    url: 'https://youtube.com/shorts/-sZLMbfzMqc?si=e_zsjBu21rjsor-k',
    thumbnail: 'https://img.youtube.com/vi/-sZLMbfzMqc/hqdefault.jpg',
    aspectRatio: 0.96
  },
  {
    id: 'ref-42',
    title: 'Short 42',
    platform: 'YouTube',
    publishedAt: '2023-02-23T02:37:06-08:00',
    url: 'https://youtube.com/shorts/VfmeANGipSM?si=giErgW2tvV8JE6Px',
    thumbnail: 'https://img.youtube.com/vi/VfmeANGipSM/hqdefault.jpg',
    aspectRatio: 1.66
  },
  {
    id: 'ref-43',
    title: 'Short 43',
    platform: 'YouTube',
    publishedAt: '2022-12-28T01:47:18-08:00',
    url: 'https://youtube.com/shorts/kBIsu_J_CTw?si=8cUPO_0Mmm_wW8K9',
    thumbnail: 'https://img.youtube.com/vi/kBIsu_J_CTw/hqdefault.jpg',
    aspectRatio: 1.14
  }
];
