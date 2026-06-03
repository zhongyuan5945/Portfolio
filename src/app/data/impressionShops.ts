import type { Shop } from './projects';

// Data for the 36 Impression shop galleries.
// Each shop should have 2-10 images.
// Entries still labeled "Boutique NN" are placeholders awaiting real data.

const PLACEHOLDER_IMAGES = [
  'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?w=1200&auto=format&fit=crop&q=80',
  'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?w=1200&auto=format&fit=crop&q=80',
  'https://images.pexels.com/photos/714258/pexels-photo-714258.jpeg?w=1200&auto=format&fit=crop&q=80',
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?w=1200&auto=format&fit=crop&q=80',
  'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?w=1200&auto=format&fit=crop&q=80',
  'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?w=1200&auto=format&fit=crop&q=80',
  'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?w=1200&auto=format&fit=crop&q=80',
  'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?w=1200&auto=format&fit=crop&q=80',
  'https://images.pexels.com/photos/1051076/pexels-photo-1051076.jpeg?w=1200&auto=format&fit=crop&q=80',
  'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?w=1200&auto=format&fit=crop&q=80',
  'https://images.pexels.com/photos/2698519/pexels-photo-2698519.jpeg?w=1200&auto=format&fit=crop&q=80',
  'https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg?w=1200&auto=format&fit=crop&q=80'
];

const placeholderShop = (index: number): Shop => {
  const shopNumber = String(index + 1).padStart(2, '0');
  const imgCount = 3 + (index % 4); // 3-6 placeholder images
  return {
    id: `shop-${shopNumber}`,
    name: `Boutique ${shopNumber}`,
    address: '',
    year: '',
    description: { fr: '', en: '', zh: '' },
    images: Array.from(
      { length: imgCount },
      (_, j) => PLACEHOLDER_IMAGES[(index * 3 + j) % PLACEHOLDER_IMAGES.length]
    )
  };
};


export const impressionShops: Shop[] = [
  ...Array.from({ length: 0 }, (_, i) => placeholderShop(i)),
  {
    id: 'zouzou',
    name: 'Restaurants chinois',
    year: '202505',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/zouzou%20a4%202p.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/zouzou%20a4%20m.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/zouzou%20af1.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/zouzou%20af2.png'
    ]
  },
  {
    id: 'tutu',
    name: 'Tutu',
    address: '17 Rue de la Pierre Levée, 75011 Paris',
    year: '202605',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/tutu%20a4%201.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/tutu%20a4%202.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/tutu%20af.png'
    ]
  },
  {
    id: 'tasty',
    name: 'Tasty Burger',
    address: '20 Rue Vignon, 75009 Paris',
    year: '202505',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/tasty%20a5%202v.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/tasty%20af.png'
    ]
  },
  {
    id: 'LeStadiumBar',
    name: 'Le StadiumBar',
    address: '77 Pl. Gaston Sanson, 76640 Terres-de-Caux',
    year: '202506',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Le%20StadiumBar%20af.png'
    ]
  },
  {
    id: 'ramenquatresaisons',
    name: 'Ramen Quatre Saisons',
    year: '202605',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/ramen%20quatre%20saisons%20af.png'
    ]
  },
  {
    id: 'pholevallois',
    name: 'Pho Levallois',
    address: '47 Rue Marius Aufan, 92300 Levallois-Perret',
    year: '202603',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/pho%20levallois%20dl%203v.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/pho%20levallois%20cf.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/pho%20levallois%20af%20A0.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/pho%20levallois%20af.png'
    ]
  },
  {
    id: 'PetiteCantine',
    name: 'Petite Cantine',
    address: '47 Rue de Babylone, 75007 Paris',
    year: '202502',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Petite%20Cantine%20A4.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Petite%20Cantine%20DL%202v.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Petite%20Cantine%20CV.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Petite%20Cantine%20st.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Petite%20Cantine%20af1.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Petite%20Cantine%20af2.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Petite%20Cantine%20sign.png'
    ]
  },
  {
    id: 'Petitchef',
    name: 'Petit chef',
    address: '43 Rue Henri Barbusse, 92000 Nanterre',
    year: '202505',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/petit%20chef%20dl%202v.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/petit%20chef%20cf.png'
    ]
  },
  {
    id: 'paradis',
    name: 'Paradis',
    address: 'Rue Théroigne de Méricourt, 95150 Taverny',
    year: '202506',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/paradis%20cv.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/paradis%20a3.png'
    ]
  },
  {
    id: 'pandaking',
    name: 'Panda King',
    address: '15 B BD ISAAC NEWTON 77420 CHAMPS-SUR-MARNE',
    year: '202603',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/PANDA%20KING%20DL%203v.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/PANDA%20KING%20DL%20af.png'
    ]
  },
  {
    id: 'oppa',
    name: 'Oppa',
    address: '580 Av. de Dunkerque, 59160 Lille',
    year: '202505',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/oppa%20a4%206p.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/oppa%20af.png'
    ]
  },
  {
    id: 'NAMIYARAMEN',
    name: 'NAMIYA RAMEN',
    address: '12 Rue Edouard Nieuport, 92150 Suresnes',
    year: '202506',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/NAMIYA%20RAMEN%20a4%208p.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/NAMIYA%20RAMEN%20DL%203v.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/NAMIYA%20RAMEN%20af.png'
    ]
  },
  {
    id: 'Menilmontant',
    name: 'LE VERGER DE MENILMONTANT',
    address: '142 Rue de Ménilmontant 75020 Paris',
    year: '202512',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Menilmontant%20cf.png'
    ]
  },
  {
    id: 'MAISONGUESCLIN',
    name: 'MAISON GUESCLIN',
    address: '14 Pass. du Guesclin, 75015 Paris',
    year: '202605',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/MAISON%20GUESCLIN%20A3.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/MAISON%20GUESCLIN%20cf.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/MAISON%20GUESCLIN%20st.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/MAISON%20GUESCLIN%20la1.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/MAISON%20GUESCLIN%20la2.png'
    ]
  },
  {
    id: 'Maisondor',
    name: 'Maison d’or',
    address: '15 PLACE DARNETAL 77100 MEAUX',
    year: '202503',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Maison%20d_or%20DL%203v.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Maison%20d_or%20af.png'
    ]
  },
  {
    id: 'Maisondesnouillies',
    name: 'Maison des nouillies',
    address: ' 132 Av. de la République, 92120 Montrouge',
    year: '202602',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Maison%20de%20nouillies%20a4%204p.png'
    ]
  },
  {
    id: 'leseoul',
    name: 'Le Seoul',
    address: '80 Av. du Général Leclerc, 92340 Bourg-la-Reine',
    year: '202605',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Le%20Seoul%20dl%203v.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Le%20Seoul%20cv.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Le%20Seoul%20af.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Le%20Seoul%20a4%2012p.png'
    ]
  },
  {
    id: 'lanzhou',
    name: 'Lanzhou',
    address: '40 Rue de Belleville 75020 Paris',
    year: '202512',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Lanzhou%20A48p.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Lanzhou%20dl2v.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Lanzhou%20cf.png'
    ]
  },
  {
    id: 'KOKIO',
    name: 'Kokio',
    address: '25 Rue Saint-Jacques, 75005 Paris',
    year: '202507',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/KOKIO%20af2.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/KOKIO%20af.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/KOKIO%20la.png'
    ]
  },
  {
    id: 'kikimart',
    name: 'Kiki Mart',
    address: '4 Av. Georges Clemenceau 06000 Nice',
    year: '202604',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/kiki%20mart%20A6.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/kiki%20mart%20la.png'
    ]
  },
  {
    id: 'sushilyon',
    name: 'Sushi Lyon',
    address: '10 Rue Passet 69007 Lyon / 21 Rue Vauban 69006 Lyon',
    year: '202604',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/fedelor07%20af.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/sushi6eme%20cf.png'
    ]
  },
  {
    id: 'itakasushi',
    name: 'Itaka Sushi',
    address: '63 Rue de Turbigo, 75003 Paris',
    year: '202510',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/itaka%20sushi%20DL%204v.png'
    ]
  },
  {
    id: 'incha',
    name: 'Incha',
    address: '33 Av. de la Prte de Choisy, 75013 Paris',
    year: '202601',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/INCHA%20af.png'
    ]
  },
  {
    id: 'hibarfondue',
    name: 'Hibar Fondue',
    address: '5 Pl. Fulgence Bienvenue, 77600 Bussy-Saint-Georges',
    year: '202601',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/hibar%20fondue%20DL%206v1.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/hibar%20fondue%20DL%206v2.png'
    ]
  },
  {
    id: 'Fondue9Lyon',
    name: 'Fondue9 Lyon',
    address: '13 Rue Passet, 69007 Lyon',
    year: '202604',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Fondue9%20Lyon%20af.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Fondue9%20Lyon%20105x297%20pc.png'
    ]
  },
  {
    id: 'enlai',
    name: 'En Lai',
    address: '101 Rue de Paris, 94220 Charenton-le-Pont',
    year: '202510',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/En%20lai%20DL%203v.png'
    ]
  },
  {
    id: 'ledynastie',
    name: 'Le Dynastie',
    address: 'CENTRE COMMERCIAL DU GRAND MAIL II 40990 SAINT-PAUL-LES-DAX',
    year: '202511',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/le%20dynastie%20A3.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/le%20dynastie%20cv.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/le%20dynastie%20af.png'
    ]
  },
  {
    id: 'DaeJang',
    name: 'Dae Jang',
    address: '33 Rue Descartes, 75005 Paris',
    year: '202506',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Dae%20Jang%20180x260%206P.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/Dae%20Jang%2090x175%206P.png'
    ]
  },
  {
    id: 'chezyudong',
    name: 'Chez Yu Dong',
    address: '19 RUE DES SERGENTS 80000 AMIENS',
    year: '202601',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/chez%20yudong%20dl%203v.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/chez%20yudong%20af.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/chez%20yudong%20A4.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/chez%20yudong%20cf.png'
    ]
  },
  {
    id: 'cheztran',
    name: 'Chez Tran',
    address: '18 Avenue Gabriel Péri, 91700 Sainte-Geneviève-des-Bois',
    year: '202509',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/chez%20tran%20a6.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/chez%20tran%20af.png'
    ]
  },
  {
    id: 'Cestbon',
    name: 'C’est bon',
    address: '57 rue commandant berge 771100 Meaux',
    year: '202507',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/cest%20bon%20DL%203v.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/cest%20bon%20af.png'
    ]
  },
  {
    id: 'Bobon',
    name: 'Bobon',
    address: '24 Rue des Lombards, 75004 Paris',
    year: '202511',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/bobon%20A3.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/bobon%20pc.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/bobon%20af.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/bobon%20pvc.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/bobon%20af2.png'
    ]
  },
  {
    id: 'BEAUTY-FANE',
    name: 'L’INSTANT BEAUTY FANE',
    address: '1 Rue de Tombouctou, 75018 Paris',
    year: '202604',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/L_INSTANT%20BEAUTY%20FANE%20dl%202v.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/L_INSTANT%20BEAUTY%20FANE%20cf.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/L_INSTANT%20BEAUTY%20FANE%20af.png'
    ]
  },
  {
    id: 'Bar-Raviolis',
    name: 'Bar Raviolis',
    address: '87 Rue de Patay, 75013 Paris',
    year: '202512',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/bar%20raviolis%20A4.png'
    ]
  },
  {
    id: 'Aux-Délices-de-Lili',
    name: 'Aux Délices de Lili',
    address: '38 rue du docteur Duchesne 76220 Gournay-en-Bray',
    year: '202605',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/aux%20d%C3%A9lices%20de%20lili%20DL%202v.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/aux%20d%C3%A9lices%20de%20lili%20cv.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/aux%20d%C3%A9lices%20de%20lili%20af.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/aux%20d%C3%A9lices%20de%20lili%20pvc.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/aux%20d%C3%A9lices%20de%20lili%20af_p.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/aux%20d%C3%A9lices%20de%20lili%20la.png'
    ]
  },
  {
    id: '40-rose-nails',
    name: '40 Rose Nails',
    address: '52 Rue Gabrielle, 94220 Charenton-le-Pont',
    year: '202603',
    description: { fr: '', en: '', zh: '' },
    images: [
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/40rose%20dl%202v.png',
      'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/40rose%20cf.png'
    ]
  }
];
