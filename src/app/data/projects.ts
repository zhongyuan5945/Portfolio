export type Category = 'projets-graphiques' | 'arts-visuels' | 'univers-ludiques';

export interface Shop {
  id: string;
  name: string;
  address?: string;
  year?: string;
  description?: {
    fr: string;
    en: string;
    zh: string;
  };
  images: string[];
}

export interface Project {
  id: string;
  title: string;
  year: string;
  author?: string;
  type?: string;
  size?: string;
  client?: string;
  category: Category;
  subcategory?: string;
  coverImage: string;
  imageCount: number;
  images?: string[];
  placeholderImages?: string[];
  shops?: Shop[];
  videoUrl?: string;
  description: {
    fr: string;
    en: string;
    zh: string;
  };
}

import { projectImageUrls } from './projectImageData';
import { impressionShops } from './impressionShops';

const placeholderBaseUrls = [
  'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg',
  'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg',
  'https://images.pexels.com/photos/714258/pexels-photo-714258.jpeg',
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
  'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg',
  'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg',
  'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg',
  'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
  'https://images.pexels.com/photos/1051076/pexels-photo-1051076.jpeg',
  'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
  'https://images.pexels.com/photos/2698519/pexels-photo-2698519.jpeg',
  'https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg'
];

const themedImageUrls: Record<string, string[]> = {
  printDesign: placeholderBaseUrls,
  creativeReinterpretation: placeholderBaseUrls,
  dusk: placeholderBaseUrls,
  ephemeral: placeholderBaseUrls,
  inkSea: placeholderBaseUrls,
  visualIdentity: placeholderBaseUrls,
  dataViz: placeholderBaseUrls,
  typography: placeholderBaseUrls,
  branding: placeholderBaseUrls,
  darkArt: placeholderBaseUrls,
  sketch: placeholderBaseUrls,
  gameRoom: placeholderBaseUrls,
  architecture: placeholderBaseUrls,
  garden: placeholderBaseUrls,
  traffic: placeholderBaseUrls,
  museum: placeholderBaseUrls,
  portrait: placeholderBaseUrls,
  pixel: placeholderBaseUrls,
  micro: placeholderBaseUrls,
  water: placeholderBaseUrls,
  dry: placeholderBaseUrls,
  fantasy: placeholderBaseUrls,
  retro: placeholderBaseUrls,
  futuristic: placeholderBaseUrls,
  dance: placeholderBaseUrls,
  default: placeholderBaseUrls
};

const sampleCoverUrls = [
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&h=1600',
  'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&h=1600',
  'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&h=1600',
  'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&h=1600',
  'https://images.pexels.com/photos/714258/pexels-photo-714258.jpeg?auto=compress&cs=tinysrgb&h=1600',
  'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&h=1600',
  'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&h=1600',
  'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&h=1600',
  'https://images.pexels.com/photos/1051076/pexels-photo-1051076.jpeg?auto=compress&cs=tinysrgb&h=1600',
  'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&h=1600',
  'https://images.pexels.com/photos/2698519/pexels-photo-2698519.jpeg?auto=compress&cs=tinysrgb&h=1600',
  'https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg?auto=compress&cs=tinysrgb&h=1600'
];

function getSampleCoverImage(projectId: string): string {
  const index = Array.from(projectId).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return sampleCoverUrls[index % sampleCoverUrls.length];
}

const projectThemeMap: Record<string, string> = {
  impression: 'printDesign',
  revisite: 'creativeReinterpretation',
  dusk: 'dusk',
  ephemere: 'ephemeral',
  'encre-mer': 'inkSea',
  verrol: 'visualIdentity',
  affiche: 'branding',
  aqi: 'dataViz',
  typo: 'typography',
  'typo-zorigami': 'typography',
  'typo-reflet': 'typography',
  logo: 'branding',
  'bonprint-cxdesign-identity': 'branding',
  'black-cat': 'darkArt',
  dessin: 'sketch',
  'jeu-societe': 'gameRoom',
  'la-tour': 'architecture',
  'photo-jardin': 'garden',
  'photo-cone-traffic': 'traffic',
  'photo-enfants-musee': 'museum',
  'photo-bachique-2017': 'portrait',
  'photo-giuseppe-belvedere': 'portrait',
  'photo-cube-pixel': 'pixel',
  'photo-cellules-cone': 'micro',
  'photo-texture-eau': 'water',
  'photo-sans-lunettes': 'portrait',
  debond: 'visualIdentity',
  dry: 'dry',
  fragment: 'fantasy',
  pico8: 'retro',
  'cigg-z': 'futuristic',
  'dance-battle': 'dance',
  'lost-mountain': 'fantasy'
};

function generateImageUrls(count: number, seed: string, baseUrls: string[]): string[] {
  return Array.from({ length: count }, (_, i) => {
    const urlIndex = (seed.charCodeAt(0) + i) % baseUrls.length;
    return `${baseUrls[urlIndex]}?w=1200&auto=format&fit=crop&q=80`;
  });
}

function generateProjectImages(count: number, projectId: string): string[] {
  const theme = projectThemeMap[projectId] ?? 'default';
  const baseUrls = themedImageUrls[theme] ?? placeholderBaseUrls;
  return generateImageUrls(count, projectId, baseUrls);
}

function generatePlaceholderImages(count: number, projectId: string): string[] {
  return generateImageUrls(count, projectId, placeholderBaseUrls);
}

// Shops use a YYYYMM year format (e.g. '202604'). Parse as an integer for
// straightforward numeric compare; empty/invalid values sort to the end.
function shopYearKey(year: string | undefined): number {
  if (!year) return 0;
  const match = year.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function createProject(project: Omit<Project, 'images' | 'placeholderImages'>): Project {
  const actualImages = projectImageUrls[project.id];
  const sortedShops = project.shops
    ? [...project.shops].sort((a, b) => shopYearKey(b.year) - shopYearKey(a.year))
    : undefined;
  const shopImages = sortedShops?.flatMap((s) => s.images) ?? [];

  let images: string[];
  let finalImageCount: number;

  if (shopImages.length > 0) {
    // Shop-based projects (e.g. Impression): float a random shop image to
    // position 0 so the cover / hero / listing thumbnail all reflect a real
    // sub-page image instead of a generic placeholder.
    const randomIndex = Math.floor(Math.random() * shopImages.length);
    const randomImage = shopImages[randomIndex];
    images = [randomImage, ...shopImages.filter((_, i) => i !== randomIndex)];
    finalImageCount = shopImages.length;
  } else if (actualImages) {
    images = actualImages;
    finalImageCount = actualImages.length;
  } else {
    images = generateProjectImages(project.imageCount, project.id);
    finalImageCount = project.imageCount;
  }

  const coverImage = images.length > 0 ? images[0] : getSampleCoverImage(project.id);

  return {
    ...project,
    imageCount: finalImageCount,
    coverImage,
    images,
    placeholderImages: generatePlaceholderImages(finalImageCount, project.id),
    ...(sortedShops ? { shops: sortedShops } : {})
  };
}

const projectsData: Array<Omit<Project, 'images' | 'placeholderImages'>> = [
  // Projets graphiques
  {
    id: 'impression',
    title: 'Impression',
    year: '2024-2026',
    author: 'CX design - Yuan ZHONG',
    type: 'Print',
    category: 'projets-graphiques',
    imageCount: 36,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Impression/NAMIYA%20RAMEN%20a4%208p.png',
    description: {
      fr: 'Entre 2024 et 2026, collaboration avec l’agence Bonprint – CX Design sur la conception et la production de supports imprimés destinés à des commerces et entreprises à travers la France.\n\nLes réalisations couvrent une large variété de supports : menus, flyers publicitaires, cartes de visite, affiches, autocollants, enseignes, lettrages adhésifs et autres éléments de communication visuelle. Le projet implique l’ensemble du processus graphique, de la mise en page à la préparation des fichiers pour l’impression et la fabrication.',
  
      en: 'Between 2024 and 2026, collaboration with Bonprint – CX Design on the design and production of printed materials for businesses across France.\n\nThe work covers a wide range of media, including menus, promotional flyers, business cards, posters, stickers, signage, adhesive lettering, and various communication materials. The project involved the complete graphic production process, from layout design to print-ready file preparation and manufacturing.',
  
      zh: '2024 至 2026 年期间，与 Bonprint – CX Design 合作，为法国各地商铺与企业设计和制作各类印刷传播物料。\n\n项目涵盖菜单、宣传单页、名片、海报、贴纸、店铺招牌、贴字（lettrage adhésif）以及其他视觉传播载体，并参与从版式设计到印前文件制作与落地生产的完整流程。'
    },
    shops: impressionShops
  },
  {
    id: 'revisite',
    title: 'Revisite',
    year: '2017',
    author: 'Alida A. ELELOUE – Yuan ZHONG',
    type: 'Sérigraphie',
    size: '30 × 103 cm / 15 × 21 cm',
    category: 'projets-graphiques',
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Revisite/IMG_6653_edited.jpg',
    imageCount: 10,
    description: {
      fr: 'Projet de sérigraphies réalisé à partir des Jardins du Ruisseau (Paris 18e), un espace construit sur les vestiges de la Petite Ceinture où se rencontrent végétation spontanée et traces industrielles.\n\nLa série développe une lecture fragmentée du paysage à travers trois formats allongés inspirés des proportions du lieu. Motifs floraux et structures mécaniques y sont recomposés dans un même langage visuel, entre mémoire industrielle et réinterprétation organique.',
    
      en: 'Silkscreen project inspired by the Jardins du Ruisseau in Paris, a site built on the remains of the former Petite Ceinture railway where vegetation and industrial traces coexist.\n\nThe series proposes a fragmented reading of the landscape through three elongated formats inspired by the proportions of the site. Floral motifs and mechanical structures are recomposed into a shared visual language, between industrial memory and organic reinterpretation.',
    
      zh: '该丝网版画项目取材于巴黎18区的 Jardins du Ruisseau。这片建造于“小环线铁路”遗址上的空间，将自然植被与工业痕迹并置于同一景观之中。\n\n系列通过三种受场地比例启发的长幅形式，对景观进行碎片化重构。植物纹样与机械结构被重新组合于同一视觉语言中，在工业记忆与有机形态之间建立联系。'
    }
  },
  {
    id: 'dusk',
    title: 'Dusk',
    year: '2019',
    author: 'Alexandra NAUDET – Arthur COUSSEAU – David BERREBI – Lola EL KOUBI – Yuan ZHONG',
    type: 'Projection interactive',
    category: 'projets-graphiques',
    coverImage: "https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Dusk/1.png",
    imageCount: 12,
    description: {
      fr: 'Dans la société actuelle, l’omniprésence des smartphones et des écrans réduit progressivement le temps de sommeil. La lumière bleue émise par les appareils électroniques perturbe les rythmes biologiques en donnant au cerveau l’illusion qu’il fait encore jour.\n\nDUSK est un simulateur de crépuscule holographique connecté à un oreiller interactif. Le dispositif analyse différentes données de l’utilisateur — pression, rythme cardiaque ou chaleur corporelle — afin d’adapter l’intensité lumineuse, l’environnement sonore et les animations projetées. Plus l’utilisateur s’endort, plus l’expérience devient calme, lente et hypnotique. Par un jeu de projection immersive, DUSK invite à éloigner le smartphone pour accompagner progressivement l’endormissement.',
    
      en: 'In contemporary society, the omnipresence of smartphones and screens increasingly reduces sleep time. The blue light emitted by electronic devices disrupts biological rhythms by making the brain believe it is still daytime.\n\nDUSK is a holographic twilight simulator connected to an interactive pillow. The device monitors several user variables — pressure, heart rate, and body heat — in order to adjust light intensity, sound environment, and projected animations. As the user falls asleep, the experience becomes calmer, slower, and more hypnotic. Through immersive projection, DUSK encourages users to put their smartphones aside and gradually drift into sleep.',
    
      zh: '在当代社会中，智能手机与电子屏幕的普及不断压缩人们的睡眠时间。电子设备释放的蓝光会扰乱人体生物节律，使大脑误以为仍处于白天。\n\nDUSK 是一套连接互动枕头的全息黄昏模拟装置。系统通过监测用户的压力、心率与体温等数据，实时调节手机投射出的光线强度、声音环境与动画内容。随着用户逐渐入睡，投影体验也会变得更加平静、缓慢且具有催眠感。通过沉浸式投影机制，DUSK 鼓励用户放下手机，逐步进入睡眠状态。'
    }
  },
  {
    id: 'ephemere',
    title: 'Éphémère',
    year: '2018',
    author: 'Quentin LE GARREC – Yuan ZHONG',
    type: 'Application interactive',
    category: 'projets-graphiques',
    coverImage: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&auto=format&fit=crop',
    imageCount: 8,
    description: {
      fr: 'Éphémère est une application interactive imaginée pour la Fondation Louis Vuitton, permettant aux visiteurs de laisser une trace poétique de leur passage à travers la création de constellations dans un ciel virtuel.\n\nChaque interaction génère une nouvelle composition lumineuse, transformant les présences individuelles en une cartographie collective et évolutive. Le projet interroge la mémoire des lieux, la trace numérique et la dimension éphémère de l’expérience muséale.',
    
      en: 'Éphémère is an interactive application designed for the Fondation Louis Vuitton, allowing visitors to leave a poetic trace of their presence through the creation of constellations within a virtual sky.\n\nEach interaction generates a new luminous composition, transforming individual presences into a collective and evolving cartography. The project explores spatial memory, digital traces, and the ephemeral dimension of the museum experience.',
    
      zh: 'Éphémère 是为 Fondation Louis Vuitton 构想的一款互动应用，访客可以通过在虚拟天空中生成星座的方式，留下自己到访的痕迹。\n\n每一次互动都会形成新的光点组合，将个体行为转化为不断演化的集体星图。项目围绕场所记忆、数字痕迹与博物馆体验的短暂性展开思考。'
    }
  },
  {
    id: 'encre-mer',
    title: 'Encré dans la mer',
    year: '2018',
    author: 'Camille PELARD – Yuan ZHONG',
    type: 'Édition (augmentation)',
    size: '15 × 11 cm',
    category: 'projets-graphiques',
    imageCount: 27,
    coverImage: "https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/L'encre dans la mer/IMG_4931.JPG",
    description: {
      fr: 'Encré dans la mer raconte l’histoire d’une bouteille jetée à la mer, portée par des eaux tantôt calmes, tantôt agitées, sans certitude d’atteindre une destination ni d’être lue.\n\nLes mots fragiles affrontent les mouvements de l’océan comme les émotions traversent les turbulences de la vie. L’affect, lui aussi, dérive et peut se fragiliser malgré les protections mises en place.',
    
      en: 'Encré dans la mer tells the story of a message in a bottle drifting across seas that are sometimes calm, sometimes turbulent, without knowing whether it will ever reach a destination or be read.\n\nFragile words endure the movements of the ocean just as emotions endure the turbulence of life. Affect itself drifts and can become vulnerable despite any form of protection.',
    
      zh: '《Encré dans la mer》讲述了一只漂流瓶被投入海中，在时而平静、时而动荡的海面上漂流，却无法确定是否能抵达目的地或被阅读的故事。\n\n脆弱的文字如同情绪一样，在海浪与人生的起伏中承受冲击。情感本身也在漂流，即使被包裹与保护，也可能逐渐失去稳定性。'
    }
  },
  {
    id: 'verrol',
    title: 'Verrol',
    year: '2021',
    author: 'Yuan ZHONG',
    type: 'Manuel du produit',
    size: 'A4',
    category: 'projets-graphiques',
    imageCount: 19,
    coverImage: "https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Verrol/verrol_1.png",
    description: {
      fr: 'Verrol est un projet d’illustration réalisé pour une entreprise allemande, destiné à accompagner un catalogue produit.\n\nLe travail se concentre sur la création d’un univers visuel illustré, venant enrichir des contenus techniques par un langage graphique plus narratif et sensible. L’illustration devient ici un outil de médiation, permettant de rendre plus lisibles et expressifs des éléments industriels.',
    
      en: 'Verrol is an illustration project created for a German company to accompany a product catalogue.\n\nThe work focuses on building a visual illustrated universe that enriches technical content through a more narrative and sensitive graphic language. Illustration acts here as a mediating tool, making industrial elements more readable and expressive.',
    
      zh: 'Verrol 是为一家德国公司完成的插画项目，用于辅助产品手册的视觉呈现。\n\n项目通过构建插画化的视觉世界，为技术性内容引入更具叙事性与感知性的图形语言。插画在此成为一种媒介，使工业信息更易理解并具有表达性。'
  },
  },
  {
    id: 'affiche',
    title: 'Affiche NO LIMIT',
    year: '2017',
    author: 'Yuan ZHONG',
    type: 'Affiches',
    size: 'A3',
    category: 'projets-graphiques',
    imageCount: 7,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Affiche/no%20limit.png',
    description: {
      fr: 'Projet d’affiches réalisé dans le cadre de l’E-ART Campus à Hangzhou, en collaboration avec des artistes invités.\n\nLa série comprend des affiches pour des expositions, des conférences et des workshops. Chaque visuel traduit le contexte de l’événement et les contenus artistiques associés à travers la typographie, la hiérarchie et la composition, afin de construire un ensemble cohérent adapté aux différents formats.',
    
      en: 'Poster series designed for E-ART Campus in Hangzhou, in collaboration with invited artists.\n\nThe project includes posters for exhibitions, lectures, and workshops. Each visual translates the event context and associated artistic content through typography, hierarchy, and composition, building a coherent system adapted to different formats.',
    
      zh: '该项目为杭州 E-ART Campus 创作的一系列海报设计，与受邀艺术家合作完成。\n\n作品涵盖展览、讲座与工作坊海报设计。每一张视觉都将活动语境与艺术内容转化为视觉表达，通过字体层级、构图与版式结构建立统一且适配不同格式的视觉体系。'
    },
  },
  {
    id: 'aqi',
    title: 'Air Quality Index',
    year: '2017',
    author: 'Yuan ZHONG',
    type: 'Infographie',
    size: 'A3',
    category: 'projets-graphiques',
    imageCount: 4,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/AQI/air1-01.jpg',
    description: {
      fr: 'En 2017, la question de la pollution de l’air en Chine était particulièrement critique. À partir de données publiques officielles, ce projet présente une infographie de la qualité de l’air à Hangzhou pour l’année 2016.\n\nLe travail consiste à traduire des données environnementales en une lecture visuelle claire et structurée, afin de rendre perceptible l’évolution des niveaux de pollution et leurs variations dans le temps.',
    
      en: 'In 2017, air pollution in China was a major concern. Based on official public data, this project presents an infographic of air quality in Hangzhou for the year 2016.\n\nThe work translates environmental data into a clear and structured visual reading, making the evolution of pollution levels and their variations over time more perceptible.',
    
      zh: '2017年中国空气污染问题非常严峻。本项目基于官方公开数据，整理并可视化了2016年杭州空气质量指数。\n\n作品将环境数据转化为清晰的视觉信息结构，使污染水平及其时间变化得以直观呈现与阅读。'
    }
  },
  {
    id: 'typo',
    title: 'Typo Code',
    year: '2017',
    author: 'Yuan ZHONG',
    type: 'Font',
    category: 'projets-graphiques',
    imageCount: 7,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Typo/ASCII-01.jpg',
    description: {
      fr: 'Projet de création typographique basé sur les structures visuelles du QR code, du code-barres et du morse. Cette police ASCII explore les frontières entre lecture humaine et lecture machinique.\n\nÀ travers un système de signes inspiré des langages de codage et d’identification automatisée, le projet interroge la manière dont l’information circule, se traduit et devient lisible selon différents modes de perception visuelle.',
    
      en: 'Typographic project based on the visual structures of QR codes, barcodes, and Morse code. This ASCII typeface explores the boundaries between human and machine vision.\n\nThrough a system of signs inspired by coding and automated identification languages, the project questions how information circulates, translates, and becomes readable through different visual perception systems.',
    
      zh: '该字体项目基于二维码、条形码与摩尔斯码的视觉结构，构建了一套 ASCII 字体系统，探索机器视觉与人类视觉之间的边界。\n\n项目通过借鉴编码与自动识别语言中的符号逻辑，讨论信息如何在不同感知机制中被传递、转译与阅读。'
    }
  },
  {
    id: 'typo-zorigami',
    title: 'Typo Zorigami',
    year: '2023',
    author: 'Yuan ZHONG',
    type: 'Font',
    category: 'projets-graphiques',
    imageCount: 2,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Typo/zorigami.png',
    description: {
      fr: 'Zorigami est une police de caractères inspirée des principes visuels et structurels de l’origami.\n\nLe projet explore la transformation du pli en langage typographique, à travers des formes géométriques construites par tension, découpe et déploiement spatial. Chaque caractère évoque un volume potentiel, oscillant entre surface plane et construction tridimensionnelle.\n\nPolice disponible sur Gumroad:https://zo5945.gumroad.com/l/Zorigami',
    
      en: 'Zorigami is a typeface inspired by the visual and structural principles of origami.\n\nThe project explores the transformation of folding into typographic language through geometric forms shaped by tension, cuts, and spatial deployment. Each character suggests a potential volume, oscillating between flat surface and three-dimensional construction.\n\nTypeface available on Gumroad: https://zo5945.gumroad.com/l/Zorigami',
    
      zh: 'Zorigami 是一套以折纸结构与视觉逻辑为灵感设计的字体。\n\n项目尝试将“折叠”转化为字体语言，通过几何切分、张力与空间展开构建字形。每个字符都介于二维平面与三维结构之间，呈现出一种具有体积感的视觉状态。\n\n字体已发布于 Gumroad：https://zo5945.gumroad.com/l/Zorigami'
    }
  },
  {
    id: 'typo-reflet',
    title: 'Typo Reflet',
    year: '2017',
    author: 'Yuan ZHONG',
    type: 'Font',
    category: 'projets-graphiques',
    imageCount: 7,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Typo/REFLET-01.jpg',
    description: {
      fr: 'Reflet est une police de caractères inspirée par les variations de lumière traversant une fenêtre.\n\nLe projet traduit les phénomènes de réflexion, de diffusion et de fragmentation lumineuse en formes typographiques. Les caractères jouent sur des contrastes subtils, des découpes et des superpositions évoquant les déplacements de la lumière sur une surface intérieure.',
    
      en: 'Reflet is a typeface inspired by the variations of light passing through a window.\n\nThe project transforms phenomena such as reflection, diffusion, and light fragmentation into typographic forms. The characters explore subtle contrasts, cuts, and overlays that evoke the movement of light across interior surfaces.',
    
      zh: 'Reflet 是一套以穿过窗户的光线变化为灵感设计的字体。\n\n项目将反射、扩散与光线碎裂等现象转化为字体结构，通过细微的对比、切割与叠加关系，呈现光线在室内表面流动时的视觉状态。'
    }
  },
  {
    id: 'logo',
    title: 'Galerie Pascal Vanhoecke',
    year: '2018',
    author: 'Yuan ZHONG',
    type: 'Logo',
    category: 'projets-graphiques',
    imageCount: 8,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Logo/PV_loft.jpg',
    description: {
      fr: 'Conception du logo pour la Galerie Pascal Vanhoecke.\n\nLe projet développe une identité visuelle sobre et contemporaine, pensée pour s’adapter aux différents supports de communication de la galerie. Le travail typographique et la construction du signe cherchent un équilibre entre présence institutionnelle et sensibilité artistique.',
    
      en: 'Logo design for Galerie Pascal Vanhoecke.\n\nThe project develops a minimal and contemporary visual identity designed to adapt across the gallery’s communication materials. The typographic work and symbol construction seek a balance between institutional presence and artistic sensitivity.',
    
      zh: '为 Galerie Pascal Vanhoecke 设计的品牌标识。\n\n项目围绕画廊的视觉识别展开，构建简洁而当代的 logo 系统，以适配不同传播媒介。字体与符号结构在机构感与艺术气质之间寻求平衡。'
    }
  },
  {
    id: 'bonprint-cxdesign-identity',
    title: 'Bonprint',
    year: '2024–2025',
    author: 'Yuan ZHONG',
    type: 'Logo',
    category: 'projets-graphiques',
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Logo/qcg_logo_1.png',
    imageCount: 9,
    description: {
      fr: 'Entre fin 2024 et début 2025, refonte de l’identité visuelle de Bonprint – CX Design.\n\nLe projet comprend la création d’un nouveau logo ainsi qu’une série d’icônes et d’éléments graphiques destinés à enrichir les supports de communication de l’entreprise. L’ensemble vise à renforcer la cohérence visuelle de la marque tout en améliorant sa lisibilité sur les différents supports imprimés et numériques.',

      en: 'Between late 2024 and early 2025, redesign of the visual identity for Bonprint – CX Design.\n\nThe project includes the creation of a new logo along with a series of icons and graphic elements developed for the company’s communication materials. The identity system was designed to strengthen brand consistency and improve legibility across both print and digital media.',

      zh: '2024 年底至 2025 年初，为 Bonprint – CX Design 重新设计品牌视觉识别系统。\n\n项目包括全新 logo 的设计，以及一系列用于企业传播的图标与辅助图形开发。整体视觉系统旨在提升品牌一致性，并增强其在印刷与数字媒介中的识别度与适用性。'
    }
  },

  // Arts visuels
  {
    id: 'black-cat',
    title: 'Black Cat',
    year: '2018',
    author: 'Yuan ZHONG',
    type: 'Bande dessinée',
    category: 'arts-visuels',
    imageCount: 41,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Black Cat/IMG_3421.png',
    videoUrl: 'https://www.youtube.com/embed/Jy1hhjniywc',
    description: {
      fr: 'MIAOU.',
      en: 'meow.',
      zh: '喵。'
    }
  },
  {
    id: 'dessin',
    title: 'Dessins',
    year: '2017-2026',
    author: 'Yuan ZHONG',
    type: 'Dessins',
    category: 'arts-visuels',
    imageCount: 67,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Dessin/tree.png',
    description: {
      fr: 'Dessins',
      en: 'Drawings',
      zh: '绘画'
    }
  },
  {
    id: 'jeu-societe',
    title: 'Jeu de société',
    year: '2019',
    author: 'Yuan ZHONG',
    type: 'Illustration',
    category: 'arts-visuels',
    imageCount: 38,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Jeu Societe/Piscine-01.png',
    description: {
      fr: 'Série d’illustrations réalisée en 2019 pour un jeu de société inspiré des situations de la vie quotidienne.\n\nLe projet développe un univers visuel en style flat design, fondé sur des formes simplifiées, des couleurs franches et une lecture immédiate des scènes. Les illustrations accompagnent les mécaniques du jeu tout en mettant en scène des activités ordinaires et des interactions familières.',
    
      en: 'Series of illustrations created in 2019 for a board game based on everyday life situations.\n\nThe project develops a flat-design visual language built on simplified shapes, bold colors, and immediate readability. The illustrations support the game mechanics while depicting ordinary activities and familiar social interactions.',
    
      zh: '2019年为一款以日常生活场景为主题的桌游创作的插画系列。\n\n项目采用扁平化视觉风格，通过简化的造型、鲜明的色彩与清晰的信息层级构建画面。插画服务于游戏机制，同时描绘人们熟悉的生活场景与日常互动。'
    }
  },
  {
    id: 'la-tour',
    title: 'La Tour',
    year: '2016',
    author: 'Yuan ZHONG',
    type: 'Bande dessinée',
    category: 'arts-visuels',
    imageCount: 38,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/La Tour/IMG_3427.png',
    description: {
      fr: 'Bande dessinée expérimentale réalisée en 2016, inspirée des récits visuels de Warja Lavater.\n\nLe projet explore une narration construite à partir de formes, de couleurs et de signes abstraits plutôt que par la représentation figurative traditionnelle. À travers un système graphique réduit à l’essentiel, La Tour interroge la capacité des symboles à produire du récit et à guider la lecture.',
    
      en: 'Experimental comic created in 2016, inspired by the visual narratives of Warja Lavater.\n\nThe project explores storytelling through abstract shapes, colors, and signs rather than traditional figurative representation. Using a reduced graphic language, La Tour investigates the ability of symbols to generate narrative and guide the reader.',
    
      zh: '2016年创作的实验漫画，灵感来源于Warja Lavater的视觉叙事作品。\n\n项目尝试以抽象的形状、色彩与符号代替传统具象绘画进行叙事，通过极简图形语言探索符号生成故事与引导阅读的可能性。'
    }
  },
  {
    id: 'dry_bd',
    title: 'Dry',
    year: '2018',
    category: 'arts-visuels',
    author: 'Yuan ZHONG',
    type: 'Bande dessinée',
    imageCount: 43,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Dry/IMG_3424.png',
    description: {
      fr: 'Bande dessinée réalisée en 2018 autour des notions de recherche, d’attente et de transformation.\n\nÀ travers un univers graphique mêlant éléments aquatiques et formes organiques, le projet développe une narration poétique où le déplacement devient un état de réflexion. Le récit progresse par l’image, privilégiant l’atmosphère et le symbole à l’explication directe.',
    
      en: 'Comic created in 2018 exploring themes of searching, waiting, and transformation.\n\nThrough a visual universe combining aquatic elements and organic forms, the project develops a poetic narrative in which movement becomes a state of reflection. The story unfolds primarily through images, favoring atmosphere and symbolism over direct explanation.',
    
      zh: '2018年创作的漫画作品，围绕寻找、等待与变化等主题展开。\n\n项目以水体元素与有机形态构建视觉世界，通过图像而非文字推动叙事，在诗意氛围与象征表达之间展开对时间、过程与目标的思考。'
    }
  },
  // Photo series (subcategory of Arts visuels)
  {
    id: 'photo-jardin',
    title: 'Jardin',
    year: '2016',
    author: 'Yuan ZHONG',
    type: 'Photographie',
    category: 'arts-visuels',
    subcategory: 'photo',
    imageCount: 12,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Photo/Jardin/img192_edited.jpg',
  description: {
    fr: 'Série photographique réalisée en 2016 à l’aide d’un appareil à sténopé dans un jardin.\n\nLe sténopé permet d’enregistrer de manière directe les variations de la lumière dans le temps. Les images ont ensuite été retravaillées sous forme pixelisée afin de rendre visible le passage entre les zones noires et blanches, traduisant seize niveaux de gradation issus de ces deux pôles chromatiques.\n\nSténopé : f/256, ISO 100, diamètre 0,4 mm.',
    
    en: 'Photographic series created in 2016 using a pinhole camera in a garden.\n\nThe pinhole process directly records changes in light over time. The images were then reworked in a pixelated form to reveal transitions between black and white, expressing sixteen levels of gradation derived from these two chromatic extremes.\n\nPinhole: f/256, ISO 100, d = 0.4 mm.',
    
    zh: '2016年使用针孔相机在花园中完成的摄影系列。\n\n针孔成像能够直接记录光线在时间中的变化。随后图像被转化为像素化处理，以呈现黑与白之间的过渡关系，并在两种极端色阶之间表达出十六级渐变。\n\n针孔参数：f/256，ISO 100，孔径0.4mm。'
  }
  },
  {
    id: 'photo-cone-traffic',
    title: 'Cone Invaders',
    year: '2017-2026',
    category: 'arts-visuels',
    author: 'Yuan ZHONG',
    type: 'Photographie',
    subcategory: 'photo',
    imageCount: 40,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Photo/Cone%20Traffic/IMG_4975.JPG',
    description: {
    fr: 'Première observation documentée de Cone Invaders dans l’espace public européen en 2017. Le premier spécimen apparaît dans des conditions de forte chaleur, présentant des signes de déformation inhabituelle.\n\nLes cônes de signalisation sont ici interprétés comme une forme de camouflage artificiel, une entité capable d’adopter une apparence utilitaire pour s’intégrer à l’environnement urbain humain.\n\nCone Invaders est une série photographique au long cours documentant leur présence et leur propagation progressive dans l’espace public. Observés comme une forme d’organisme invasif, ils colonisent la ville par des manifestations répétitives, silencieuses et parfois instables. Le projet constitue une archive visuelle d’une infiltration discrète du paysage contemporain.',
    
    en: 'First documented observation of Cone Invaders in European public space in 2017. The first specimen appears under extreme heat conditions, showing unusual signs of deformation.\n\nTraffic cones are interpreted here as a form of artificial camouflage, an entity capable of adopting a utilitarian appearance in order to integrate into the human urban environment.\n\nCone Invaders is a long-term photographic series documenting their presence and gradual propagation within public space. Observed as an invasive organism, they colonize the city through repetitive, silent, and sometimes unstable manifestations. The project forms a visual archive of a subtle infiltration of the contemporary landscape.',
    
    zh: '2017年，在欧洲公共空间首次记录到 Cone Invaders 的存在。首个样本在高温环境下出现，呈现出异常的变形迹象。\n\n交通路锥在此被视为一种伪装形态，是能够以功能性外观融入人类城市环境的人工存在体。\n\n《Cone Invaders》是一组长期摄影项目，记录其在公共空间中的出现与逐渐扩散。它们被观察为一种入侵性生命体，通过重复、安静且偶尔不稳定的方式占据城市空间。该项目构成了一份关于当代城市被缓慢渗透的视觉档案。'
    }
  },
  {
    id: 'photo-enfants-musee',
    title: 'Enfants au musée',
    year: '2018',
    author: 'Yuan ZHONG',
    type: 'Photographie',
    category: 'arts-visuels',
    subcategory: 'photo',
    imageCount: 4,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Photo/Enfants%20au%20musee/IMG_0825.JPG',
    description: {
      fr: 'Série photographique réalisée dans des espaces muséaux en 2018, centrée sur la présence des enfants dans le musée.\n\nLe projet observe les interactions entre les corps en mouvement et l’architecture institutionnelle, où l’espace d’exposition devient à la fois un lieu de découverte, de jeu et de contrainte. À travers ces scènes, les images interrogent la manière dont les enfants s’approprient silencieusement les codes du musée.',
    
      en: 'Photographic series created in museum spaces in 2018, focusing on the presence of children within the museum environment.\n\nThe project observes interactions between moving bodies and institutional architecture, where exhibition spaces become places of discovery, play, and constraint. Through these scenes, the images question how children quietly appropriate the codes of the museum.',
    
      zh: '2018年在美术馆空间中拍摄的摄影系列，以儿童在博物馆中的存在状态为核心。\n\n项目观察身体运动与机构性建筑之间的关系，使展览空间同时成为探索、游戏与约束之地。这些画面试图呈现儿童如何在无声中重新使用并理解美术馆的规则与秩序。'
  }
  },
  {
    id: 'photo-bachique-2017',
    title: 'Académie Fratellini',
    year: '2017',
    author: 'Yuan ZHONG',
    type: 'Photographie',
    category: 'arts-visuels',
    subcategory: 'photo',
    imageCount: 8,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Photo/Bachique%202017/academie_fratellini_1.png',
    description: {
    fr: 'Série photographique réalisée à l’Académie Fratellini en 2017.\n\nÀ travers l’observation des espaces, des corps en mouvement et des moments de répétition, le projet documente l’univers du cirque contemporain. Les images cherchent à saisir l’équilibre entre discipline, performance et fragilité, tout en révélant la dimension humaine derrière l’entraînement et la représentation.',
    
    en: 'Photographic series produced at Académie Fratellini in 2017.\n\nThrough the observation of spaces, moving bodies, and rehearsal moments, the project documents the world of contemporary circus. The images capture the balance between discipline, performance, and vulnerability while revealing the human dimension behind training and performance.',
    
    zh: '2017 年于 Académie Fratellini 拍摄的摄影系列。\n\n项目通过记录空间、运动中的身体与排练瞬间，呈现当代马戏艺术的训练与创作环境。照片试图捕捉纪律、表演与脆弱性之间的平衡，并展现舞台背后更具人性的一面。'
    }
  },
  {
    id: 'photo-giuseppe-belvedere',
    title: 'Giuseppe Belvedere',
    year: '2017',
    author: 'Yuan ZHONG',
    type: 'Photographie',
    category: 'arts-visuels',
    subcategory: 'photo',
    imageCount: 1,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Photo/Giuseppe Belvedere/Giuseppe Belvedere 27102017.JPG',
    description: {
    fr: 'Photographié le 27 octobre 2017 devant le Centre Pompidou, Giuseppe Belvedere est une figure connue du lieu, notamment pour son habitude de nourrir les pigeons sur la place.\n\nIl est décédé le 11 janvier 2022.',
    
    en: 'Photographed on October 27, 2017, in front of the Centre Pompidou, Giuseppe Belvedere was a well-known local figure, particularly recognized for feeding pigeons in the square.\n\nHe passed away on January 11, 2022.',
    
    zh: '2017年10月27日于蓬皮杜中心前拍摄的Giuseppe Belvedere，是该地点的知名人物，以在广场喂鸽子而被人熟知。\n\n其于2022年1月11日去世。'
    }
  },
  {
    id: 'photo-cube-pixel',
    title: 'Cube Pixel',
    year: '2017',
    author: 'Yuan ZHONG',
    type: 'Photographie',
    category: 'arts-visuels',
    subcategory: 'photo',
    imageCount: 10,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Photo/Cube%20Pixel/IMG_1207.JPG',
    videoUrl: 'https://www.youtube.com/embed/yibz5sksr5s',
    description: {
    fr: 'Série de photographies expérimentales réalisées en 2017 à l’aide d’un projecteur et d’un prisme de séparation optique.\n\nLe dispositif permet de fragmenter et de décomposer la lumière projetée, générant des images instables où la frontière entre projection, reflet et capture photographique devient incertaine. Le projet explore les distorsions optiques comme matière visuelle, en mettant en évidence les accidents et transformations produits par le système de capture lui-même.',
    
    en: 'Experimental photographic series created in 2017 using a projector and an optical beam-splitting prism.\n\nThe setup fragments and decomposes projected light, producing unstable images where the boundary between projection, reflection, and photographic capture becomes uncertain. The project explores optical distortions as visual material, highlighting the accidents and transformations generated by the capture system itself.',
    
    zh: '2017年使用投影仪与分光镜完成的一组实验性摄影作品。\n\n装置将投射光线进行分解与拆散，生成不稳定的图像，使投影、反射与摄影记录之间的界限变得模糊。项目将光学畸变作为视觉材料进行探索，并呈现成像系统自身所产生的偶然性与变形。'
    }
  },
  {
    id: 'photo-cellules-cone',
    title: 'Cellules à cône',
    year: '2017',
    author: 'Yuan ZHONG',
    type: 'Photographie',
    category: 'arts-visuels',
    subcategory: 'photo',
    imageCount: 18,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Photo/Cellules%20%C3%A0%20c%C3%B4ne/IMG_1548.JPG',
    description: {
      fr: 'Série photographique expérimentale réalisée en 2017 à l’aide de billes de verre.\n\nEn exploitant les propriétés de réfraction et de déformation optique des surfaces sphériques, le projet génère des compositions lumineuses instables où le paysage se fragmente et se recompose à travers des structures en forme de cellules. Les images oscillent entre abstraction et représentation, transformant la lumière en matière structurée.',
    
      en: 'Experimental photographic series created in 2017 using glass beads.\n\nBy exploiting the refractive and optical distortion properties of spherical surfaces, the project produces unstable light compositions in which landscapes fragment and reassemble through cell-like structures. The images oscillate between abstraction and representation, transforming light into structured visual matter.',
    
      zh: '2017年使用玻璃珠创作的实验摄影系列。\n\n通过利用球形表面的折射与光学畸变特性，项目生成不稳定的光影构成，使景观在类似“细胞”结构中被分解与重组。画面在抽象与再现之间游移，将光转化为具有结构性的视觉物质。'
    }
  },
  {
    id: 'photo-texture-eau',
    title: "Texture de l'eau",
    year: '2017',
    author: 'Yuan ZHONG',
    type: 'Photographie',
    category: 'arts-visuels',
    subcategory: 'photo',
    imageCount: 10,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Photo/Texture%20de%20l_eau/IMG_0582.JPG',
    description: {
    fr: 'Série photographique réalisée en 2017 autour des textures de surface de l’eau.\n\nLe projet observe les variations de lumière, les reflets du ciel et les mouvements imperceptibles de l’eau. Entre surface et profondeur, les images capturent des instants où le paysage se recompose à travers le miroir liquide, transformant l’eau en un espace de projection et de déformation visuelle.',
    
    en: 'Photographic series created in 2017 focusing on water surface textures.\n\nThe project observes variations of light, sky reflections, and subtle water movements. Between surface and depth, the images capture moments where the landscape is reconfigured through a liquid mirror, turning water into a space of projection and visual distortion.',
    
    zh: '2017年创作的摄影系列，聚焦水面纹理的视觉变化。\n\n项目记录光影、天空倒影与水体微妙运动之间的关系。在表面与深度之间，画面捕捉景观通过液态镜面被重新建构的瞬间，使水面成为一个投射与扭曲现实的视觉空间。'
    }
  },
  {
    id: 'photo-sans-lunettes',
    title: 'Sans lunettes',
    year: '2017',
    author: 'Yuan ZHONG',
    type: 'Photographie',
    category: 'arts-visuels',
    subcategory: 'photo',
    imageCount: 3,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Photo/Sans lunettes/QQ截图20170324151120.jpg',
    videoUrl: 'https://www.youtube.com/embed/bXauwmzhbUY?si=Kcl5RH6Apg4XbDbf',
    description: {
      fr: 'Série de photographies autoportrait réalisée en 2017, construite à partir d’images volontairement floues et répétitives.\n\nEn simulant une vision sans lunettes, le projet explore un état de perception altérée où le sujet se reconstruit à travers l’incertitude du regard. L’autoportrait devient un processus instable, interrogeant la manière dont l’identité se forme lorsque la netteté disparaît et que la reconnaissance de soi devient fragmentaire.',
    
      en: 'Autoportrait photographic series created in 2017 using intentionally blurred and repetitive images.\n\nBy simulating vision without glasses, the project explores a state of altered perception where the subject reconstructs itself through visual uncertainty. The self-portrait becomes an unstable process, questioning how identity is formed when clarity disappears and self-recognition becomes fragmented.',
    
      zh: '2017年创作的自画像摄影系列，通过刻意失焦与重复拍摄构建视觉状态。\n\n项目模拟未佩戴眼镜时的视觉体验，在模糊与不确定的感知中重构自我。自画像在此成为一个不稳定的过程，当清晰度消失时，身份的认知也随之变得碎片化与可变。'
    }
  },

  // Univers ludiques
  {
    id: 'debond',
    title: 'Debond',
    year: '2022',
    author: 'Yuan ZHONG',
    type: 'illustration',
    category: 'univers-ludiques',
    imageCount: 22,
    coverImage: 'https://images.unsplash.com/photo-1605106325682-3482f7c1c9c4?w=800&auto=format&fit=crop',
    description: {
      fr: 'Illustrations réalisées en 2022 pour Debond, développées dans un style pixel art.\n\nLe projet explore un langage visuel inspiré des esthétiques numériques primitives, jouant sur la simplification des formes, la grille du pixel et la contrainte de résolution comme outil graphique.',
    
      en: 'Illustrations created in 2022 for Debond in a pixel art style.\n\nThe project explores a visual language inspired by early digital aesthetics, using simplified forms, pixel grids, and resolution constraints as a graphic tool.',
    
      zh: '2022年为 Debond 创作的像素风格插画项目。\n\n项目探索早期数字视觉语言，通过简化造型、像素网格与分辨率限制，将技术约束转化为视觉表达手段。'
    }
  },
  {
    id: 'dry',
    title: 'Dry',
    year: '2019',
    author: 'Yuan ZHONG',
    type: 'Vidéo interactive',
    category: 'univers-ludiques',
    imageCount: 16,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Dry/1test.gif',
    videoUrl: 'https://www.youtube.com/embed/Jz6f4C0AwOM?si=zMz7KGZiIlGbbZZY',
    description: {
      fr: 'Vidéo interactive réalisée en 2019, construite à partir de gameplays de jeux vidéo classiques utilisés comme structure narrative.\n\nLe projet simule un jeu vidéo fictif en hommage aux esthétiques et mécaniques du jeu vidéo classique. Chaque scène emprunte aux codes du gameplay pour raconter une histoire visuelle issue d’une bande dessinée existante. Le récit suit un personnage composé d’os de poisson et d’eau, dont les textures évoluent selon les situations.\n\nL’interaction repose sur une structure web en boucles successives, proposant trois fins possibles : GAME OVER, un bug de jeu, puis une résolution finale où le personnage atteint une rose sur la lune.',
    
      en: 'Interactive video created in 2019, built from gameplay footage of classic video games used as a narrative structure.\n\nThe project simulates a fictional video game as an homage to classic game aesthetics and mechanics. Each scene borrows from gameplay codes to tell a visual story derived from an existing comic. The narrative follows a character made of fish bones and water, whose textures change according to different situations.\n\nInteraction is based on a web loop structure with three possible endings: GAME OVER, a game glitch, and a final resolution where the character finds a rose on the moon.',
    
      zh: '2019年创作的互动视频作品，以经典电子游戏的 gameplay 片段作为叙事结构。\n\n项目模拟一个虚构的电子游戏系统，向经典游戏的视觉与机制致敬。每个场景借用游戏操作语言进行叙事，故事来源于一部既有漫画。主角由鱼骨与水构成，其材质在不同情境下发生变化。\n\n交互结构基于网页循环机制，共有三种结局：GAME OVER、游戏 Bug，以及最终角色在月球上找到玫瑰的结局。'
  }
  },
  {
    id: 'fragment',
    title: 'Fragment',
    year: '2019',
    author: 'Yuan ZHONG',
    type: 'fanzine',
    size: '120 × 80 mm',
    category: 'univers-ludiques',
    imageCount: 85,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Fragment/IMG_3416.png',
    description: {
      fr: 'Projet visuel inspiré de “Fragments d’un discours amoureux” de Roland Barthes.\n\nL’œuvre ne cherche pas à illustrer le discours amoureux, mais à explorer la manière dont il se construit par fragments, figures et résonances. En référence à la structure non narrative et alphabétique du texte, le projet déconstruit et réorganise des blocs de couleur issus de pigments traditionnels, produisant des effets variables selon la distance et la matière.\n\nL’imaginaire du motif en mosaïque prolonge cette logique fragmentaire, créant une lecture instable et non linéaire, où les scènes fonctionnent comme des unités autonomes de perception.',
    
      en: 'Visual project inspired by Roland Barthes’ “A Lover’s Discourse: Fragments”.\n\nRather than illustrating romantic discourse, the work explores how it is constructed through fragments, figures, and resonances. Referencing the non-linear, alphabetical structure of the text, the project deconstructs and rearranges blocks of color derived from traditional pigments, producing varying effects depending on distance and material.\n\nThe mosaic-like imagery extends this fragmentary logic, creating an unstable, non-linear reading in which scenes function as autonomous units of perception.',
    
      zh: '受罗兰·巴特《恋人絮语》启发的视觉项目。\n\n作品并不试图再现爱情叙事，而是关注其如何通过碎片、语气与意象被构建。参考文本的非叙事与字母排序结构，项目将传统颜料色块进行拆解与重组，并在不同距离与材质下产生不同视觉效果。\n\n马赛克式的图像想象延续了这种碎片逻辑，使画面呈现出不稳定、非线性的阅读方式，各个场景成为独立的感知单元。'
  },
  },
  {
    id: 'pico8',
    title: 'PICO-8',
    year: '2018',
    author: 'Yuan ZHONG',
    type: 'Jeu Vidéo',
    category: 'univers-ludiques',
    imageCount: 2,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/PICO8/graphique_pixels_yuan.png',
    videoUrl: 'https://www.youtube.com/embed/xXTF9UnGcSA?si=-Byxfe6_0-DFKY97', 
    description: {
      fr: 'Projet expérimental réalisé en 2018 autour de l’environnement PICO-8, une console virtuelle développée par Lexaloffle Games.\n\nLe travail explore les contraintes extrêmes d’un système limité à 128×128 pixels et 16 couleurs, en utilisant le code, les sprites, les cartes, la musique et des démos pour questionner le langage visuel du jeu vidéo minimal.\n\nL’ensemble du projet s’intéresse à la construction de formes graphiques sous contrainte et à la manière dont la limitation technique devient un moteur de création.',
    
      en: 'Experimental project created in 2018 using the PICO-8 virtual console developed by Lexaloffle Games.\n\nThe work explores the extreme constraints of a system limited to 128×128 pixels and 16 colors, using code, sprites, maps, music, and demos to question the visual language of minimal video game design.\n\nThe project focuses on the construction of graphic forms under constraint and how technical limitation becomes a creative driver.',
    
      zh: '2018年围绕 PICO-8 虚拟游戏机进行的实验性项目，该平台由 Lexaloffle Games 开发。\n\n项目在128×128像素与16色限制的极端条件下展开，通过代码、精灵图、地图、音乐与演示等形式，探索极简电子游戏的视觉语言。\n\n作品关注在技术约束下图形结构的生成方式，以及限制如何转化为创作动力。'
  }
  },
  {
    id: 'cigg-z',
    title: 'CIGG-Z',
    year: '2020',
    author: 'Arthur COUSSEAU - Léo IMPERIAL - Lauriane GRANMAGNAT - Alexandre GOMY - Yuan ZHONG',
    type: 'Jeu vidéo',
    category: 'univers-ludiques',
    imageCount: 16,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/CIGG-Z/CIGG-Z_202020_1_12_2021_46_41_edited.jpg',
    description: {
      fr: 'Jeu vidéo narratif développé en 2020 dans un contexte de science-fiction.\n\nEn 2280, le vaisseau-monde LAYLA transporte 5000 passagers vers la planète CIGG-Z. Le joueur incarne Eleanor, chef de bord, confrontée à une situation de crise provoquée au début du voyage. Le vaisseau entre en état d’urgence et les compartiments sont verrouillés, séparant l’équipage.\n\nLe jeu repose sur un système de choix en temps limité, où le joueur dispose de 5 minutes avant l’atterrissage pour tenter de reprendre le contrôle du vaisseau et assurer la survie du plus grand nombre.',
    
      en: 'Narrative video game developed in 2020 in a science fiction setting.\n\nIn 2280, the generation ship LAYLA carries 5000 passengers toward the planet CIGG-Z. The player takes the role of Eleanor, the ship’s captain, who faces a crisis triggered at the beginning of the journey. The ship enters emergency mode and its compartments are locked, separating the crew.\n\nThe game is based on a time-limited choice system, where the player has 5 minutes before landing to regain control of the ship and ensure the survival of as many passengers as possible.',
    
      zh: '2020年开发的叙事类电子游戏，设定于科幻背景。\n\n2280年，世代飞船 LAYLA 载有5000名乘客前往行星 CIGG-Z。玩家扮演舰长 Eleanor，在航行初期意外引发危机。飞船进入紧急状态，各舱段被封锁，船员被分隔。\n\n游戏基于限时选择机制，玩家需在5分钟内尝试恢复飞船控制，并尽可能保证更多乘员的生存与安全。'
  }
  },
  {
    id: 'dance-battle',
    title: 'Dance Battle',
    year: '2020',
    author: 'Arthur COUSSEAU - David BERREBI - Pierre BOUVY - Raphaël LEVACHER - Yuan ZHONG',
    type: 'Jeu vidéo',
    category: 'univers-ludiques',
    imageCount: 28,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/Dance Battle/DB_CNC1.0_页面_01.png',
    description: {
      fr: 'Jeu vidéo multijoueur développé en 2020 autour de l’univers des battles de danse.\n\nLe projet propose une expérience compétitive de 2 à 4 joueurs, où chaque joueur incarne un danseur issu de différents styles chorégraphiques. Le jeu met en scène des affrontements rythmiques où la performance visuelle et le timing sont essentiels pour impressionner le jury et influencer le déroulement de la partie.\n\nDEMO TEST : https://echoingthesound.itch.io/dance-battle',
    
     en: 'Multiplayer video game developed in 2020 based on the world of dance battles.\n\nThe project offers a 2 to 4 player competitive experience, where each player embodies a dancer from various choreographic styles. The game stages rhythmic confrontations in which visual performance and timing are essential to impress the jury and influence the outcome of the match.\n\nDEMO TEST: https://echoingthesound.itch.io/dance-battle',
    
      zh: '2020年开发的多人电子游戏，以街舞对决（Dance Battle）为主题。\n\n项目支持2至4人对战，每位玩家可选择不同舞蹈风格的角色。游戏通过节奏与视觉表现进行对抗，玩家需通过动作表现与节奏控制来打动评审并影响比赛结果。\n\nDEMO TEST：https://echoingthesound.itch.io/dance-battle'
    }
  },
  {
    id: 'lost-mountain',
    title: 'The Lost Mountain',
    year: '2019',
    author: 'Camille BOYER - Lauriane GRANMAGNAT - Pierre BOUVY - Raphaël LEVACHER - Yuan ZHONG',
    type: 'Jeu vidéo',
    category: 'univers-ludiques',
    imageCount: 17,
    coverImage: 'https://ik.imagekit.io/ZHONGyuan/ZHONGyuan/The Lost Mountain/lost_mountain.png',
    description: {
      fr: 'Jeu vidéo développé en 2019, construit autour d’une progression procédurale de niveaux.\n\nLe joueur entreprend l’ascension d’une montagne perdue, dont les environnements évoluent de manière générative au fil de la progression. Le parcours est rythmé par des énigmes et des labyrinthes qui ralentissent la montée et sollicitent la réflexion et l’observation.',
    
      en: 'Video game developed in 2019 based on procedurally generated level progression.\n\nThe player climbs a lost mountain whose environments evolve dynamically throughout the journey. The ascent is structured around puzzles and mazes that slow down progression and challenge observation and problem-solving skills.',
    
      zh: '2019年开发的电子游戏，以程序化关卡生成机制为核心。\n\n玩家需要攀登一座“失落之山”，其环境在过程中不断变化与生成。攀登途中穿插谜题与迷宫结构，以减缓进程并考验玩家的观察力与逻辑能力。'
    }
  }
];

export const projects: Project[] = projectsData.map(createProject);

export const categoryInfo = {
  'projets-graphiques': {
    title: { fr: 'Projets graphiques', en: 'Graphic Design', zh: '平面设计' },
    description: {
      fr: 'Identité de marque, systèmes éditoriaux, typographie et affiches',
      en: 'Brand identity, editorial systems, typography and posters',
      zh: '品牌标识、编辑系统、字体与海报设计'
    },
    coverImage: 'https://images.unsplash.com/photo-1713873010288-c4617fc2b15b?w=1600'
  },
  'arts-visuels': {
    title: { fr: 'Arts visuels', en: 'Visual Arts', zh: '视觉艺术' },
    description: {
      fr: 'Photographie, illustration, bande dessinée et dessin',
      en: 'Photography, illustration, comics and drawing',
      zh: '摄影、插画、漫画与绘画'
    },
    coverImage: 'https://images.unsplash.com/photo-1490013616775-3ca8865fb129?w=1600'
  },
  'univers-ludiques': {
    title: { fr: 'Univers ludiques', en: 'Game Worlds', zh: '游戏世界' },
    description: {
      fr: 'Pixel art, sprites de personnages et esthétique rétro',
      en: 'Pixel art, character sprites and retro aesthetics',
      zh: '像素艺术、角色精灵与复古美学'
    },
    coverImage: 'https://images.unsplash.com/photo-1605106325682-3482f7c1c9c4?w=1600'
  }
};

export function getProjectImages(project: Project): string[] {
  return project.images ?? generateProjectImages(project.imageCount, project.id);
}

export function getProjectImagePlaceholders(project: Project): string[] {
  return project.placeholderImages ?? generatePlaceholderImages(project.imageCount, project.id);
}

// Extracts the most recent 4-digit year mentioned in a year string.
// Handles plain years ('2024'), ranges ('2024-2026', '2024–2025'), and empty values.
function latestYear(year: string | undefined): number {
  if (!year) return 0;
  const matches = year.match(/\d{4}/g);
  if (!matches) return 0;
  return Math.max(...matches.map(Number));
}

function byYearDesc(a: Project, b: Project): number {
  return latestYear(b.year) - latestYear(a.year);
}

export function getProjectsByCategory(category: Category): Project[] {
  return projects
    .filter((p) => p.category === category && !p.subcategory)
    .sort(byYearDesc);
}

export function getPhotoSeries(): Project[] {
  return projects.filter((p) => p.subcategory === 'photo').sort(byYearDesc);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}
