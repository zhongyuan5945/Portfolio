import { Language } from '../contexts/LanguageContext';

export const translations = {
  nav: {
    home: {
      fr: 'Accueil',
      en: 'Home',
      zh: '首页'
    },
    work: {
      fr: 'Travaux',
      en: 'Work',
      zh: '作品'
    },
    about: {
      fr: 'À propos',
      en: 'About',
      zh: '关于'
    },
    contact: {
      fr: 'Contact',
      en: 'Contact',
      zh: '联系'
    }
  },
  home: {
    title: {
      fr: 'ZHONG Yuan',
      en: 'ZHONG Yuan',
      zh: 'ZHONG Yuan'
    },
    subtitle: {
      fr: 'Graphiste basé à Paris',
      en: 'Graphic Designer based in Paris',
      zh: '巴黎平面设计师'
    },
    description: {
      fr: 'Design graphique, narration visuelle et création multimédia',
      en: 'Graphic design, visual storytelling and multimedia creation',
      zh: '平面设计、视觉叙事与多媒体创作'
    }
  },
categories: {
    'projets-graphiques': {
      title: {
        fr: 'Projets graphiques',
        en: 'Graphic Projects',
        zh: '平面项目'
      },
      description: {
        fr: 'Identité de marque, systèmes éditoriaux, typographie et affiches', // 对应 projects.ts 的法语内容描述
        en: 'Brand identity, editorial systems, typography and posters',
        zh: '品牌标识、编辑系统、字体与海报设计'
      }
    },
    'arts-visuels': {
      title: {
        fr: 'Arts visuels',
        en: 'Visual Arts',
        zh: '视觉艺术'
      },
      description: {
        fr: 'Photographie, illustration, bande dessinée et dessin',
        en: 'Photography, illustration, comics and drawing',
        zh: '摄影、插画、漫画与绘画'
      }
    },
    'univers-ludiques': {
      title: {
        fr: 'Univers ludiques',
        en: 'Playful Universes',
        zh: '游戏世界'
      },
      description: {
        fr: 'Pixel art, sprites de personnages et esthétique rétro', // 对应 projects.ts 的法语内容描述
        en: 'Pixel art, character sprites and retro aesthetics',
        zh: '像素艺术、角色精灵与复古美学'
      }
    },
    'creations-video': {
      title: {
        fr: 'Créations vidéos',
        en: 'Video Creations',
        zh: '视频创作'
      },
      description: {
        fr: 'Montage vidéo, motion design et création audiovisuelle',
        en: 'Video editing, motion design and audiovisual creation',
        zh: '视频编辑、动态设计和视听创作'
      }
    }
  },
  portfolio: {
    viewProject: { fr: 'Voir le projet', en: 'View Project', zh: '查看项目' },
    viewSeries: { fr: 'Voir la collection', en: 'View collection', zh: '查看完整系列' },
    showMore: { fr: 'Afficher plus', en: 'Show more', zh: '显示更多' },
    showLess: { fr: 'Afficher moins', en: 'Show less', zh: '收起' },
    playVideo: { fr: 'Charger la vidéo', en: 'Load video', zh: '加载视频' },
    viewSource: { fr: 'Voir la source', en: 'View source', zh: '查看来源' },
    backToVideos: { fr: 'Retour aux vidéos', en: 'Back to videos', zh: '返回视频列表' },
    viewAll: { fr: 'Tout afficher', en: 'View all', zh: '查看全部' },
    collapseGallery: { fr: 'Réduire la galerie', en: 'Collapse gallery', zh: '收起画廊' },
    previousItems: { fr: 'Œuvres précédentes', en: 'Previous items', zh: '上一组作品' },
    nextItems: { fr: 'Œuvres suivantes', en: 'Next items', zh: '下一组作品' },
    previousPage: { fr: 'Page précédente', en: 'Previous page', zh: '上一页' },
    nextPage: { fr: 'Page suivante', en: 'Next page', zh: '下一页' },
    choosePage: { fr: 'Choisir une page', en: 'Choose page', zh: '选择页码' },
    videoPagination: { fr: 'Navigation des vidéos', en: 'Video pagination', zh: '视频分页导航' },
    browseCategories: { fr: 'Explorer les catégories', en: 'Browse categories', zh: '浏览作品分类' },
    independentProjects: { fr: 'Projets indépendants', en: 'Individual projects', zh: '独立项目' },
    drawingAndComics: { fr: 'Dessin, illustration et bande dessinée', en: 'Drawing, illustration and comics', zh: '绘画、插画与漫画' },
    works: { fr: 'œuvres', en: 'works', zh: '件作品' },
    shops: { fr: 'commerces', en: 'shops', zh: '家店铺' },
    series: { fr: 'séries', en: 'series', zh: '个系列' },
    videos: { fr: 'vidéos', en: 'videos', zh: '条视频' },
    closeVideo: { fr: 'Fermer la vidéo', en: 'Close video', zh: '关闭视频' },
    videoUnavailable: { fr: 'Cette vidéo est indisponible.', en: 'This video is unavailable.', zh: '此视频暂时无法播放。' }
  },
  work: {
    title: {
      fr: 'Travaux',
      en: 'Work',
      zh: '作品'
    },
    organizedBy: {
      fr: 'Organisé par catégorie',
      en: 'Organized by category',
      zh: '按类别组织'
    },
    backToHome: {
      fr: 'Retour à l\'accueil',
      en: 'Back to home',
      zh: '返回首页'
    },
    backToCategory: {
      fr: 'Retour à',
      en: 'Back to',
      zh: '返回'
    },
    nextProject: {
      fr: 'Projet suivant',
      en: 'Next project',
      zh: '下一个项目'
    },
    year: {
      fr: 'Année',
      en: 'Year',
      zh: '年份'
    },
    client: {
      fr: 'Client',
      en: 'Client',
      zh: '客户'
    },
    category: {
      fr: 'Catégorie',
      en: 'Category',
      zh: '类别'
    }
  },
  videoReferences: {
    title: {
      fr: 'Créations Vidéos',
      en: 'Video Creations',
      zh: '视频创作'
    },
    description: {
      fr: 'Entre 2022 et 2024, réalisation de vidéos promotionnelles pour des films dans le cadre de collaborations avec l’agence Luckytime.\n\nLe travail comprend la création de contenus de motion design et de vidéos de communication destinées à la promotion cinématographique.',
    
      en: 'Between 2022 and 2024, production of promotional videos for films in collaboration with Luckytime agency.\n\nThe work includes motion design and communication videos for film promotion purposes.',
    
      zh: '2022年至2024年期间，与 Luckytime 机构合作制作电影宣传视频。\n\n工作内容包括动态设计与影视宣传视频制作，用于电影的推广与传播。'
    },
    references: {
      fr: 'vidéos',
      en: 'videos',
      zh: '视频'
    }
  },
  about: {
    title: {
      fr: 'À propos',
      en: 'About',
      zh: '关于'
    },
    bio1: {
      fr: 'ZHONG Yuan est un graphiste basé à Paris, spécialisé en design graphique, narration visuelle et création multimédia.',
      en: 'ZHONG Yuan is a graphic designer based in Paris, specializing in graphic design, visual storytelling and multimedia creation.',
      zh: 'ZHONG Yuan 是一位驻巴黎的平面设计师，专注于平面设计、视觉叙事和多媒体创作。'
    },
    bio2: {
      fr: 'Travaille sur des projets mêlant identité visuelle, édition, illustration, vidéo et supports imprimés. Intérêt particulier pour les systèmes graphiques, les images expérimentales et les formes hybrides entre design et culture visuelle.',
      en: 'Works on projects combining visual identity, editorial, illustration, video and print materials. Particular interest in graphic systems, experimental imagery and hybrid forms between design and visual culture.',
      zh: '从事结合视觉识别、编辑、插画、视频和印刷材料的项目。对图形系统、实验性图像以及设计与视觉文化之间的混合形式特别感兴趣。'
    },
    bio3: {
      fr: 'Diplômé de GOBELINS avec un Mastère Spécialisé en Design d\'Expérience Interactive et Ludique, et du Lycée Jacques Prévert avec un Diplôme Supérieur des Arts Appliqués (DSAA) en Design Graphique et Narration Multimédia.',
      en: 'Graduate from GOBELINS with a Specialized Master\'s in Interactive and Playful Experience Design, and from Lycée Jacques Prévert with a Higher Diploma in Applied Arts (DSAA) in Graphic Design and Multimedia Storytelling.',
      zh: '毕业于 GOBELINS，获得交互式和趣味性体验设计专业硕士学位，以及 Lycée Jacques Prévert 的应用艺术高级文凭（DSAA），专攻平面设计和多媒体叙事。'
    },
    bio4: {
      fr: 'Expérience de travail avec des studios de design, agences de branding, et projets culturels à Paris et Hangzhou.',
      en: 'Work experience with design studios, branding agencies, and cultural projects in Paris and Hangzhou.',
      zh: '曾在巴黎和杭州的设计工作室、品牌代理机构和文化项目工作。'
    },
    skillsTitle: {
      fr: 'Compétences & Outils',
      en: 'Skills & Tools',
      zh: '技能与工具'
    },
    experienceTitle: {
      fr: 'Expérience Professionnelle',
      en: 'Professional Experience',
      zh: '工作经验'
    },
    freelanceTitle: { fr: 'Freelance', en: 'Freelance', zh: '自由职业经历' },
    internshipsTitle: { fr: 'Stages', en: 'Internships', zh: '实习经历' },
    volunteeringTitle: { fr: 'Volontariat', en: 'Volunteering', zh: '志愿经历' },
    downloadCv: { fr: 'Télécharger le CV', en: 'Download CV', zh: '下载简历' },
    cvFormat: { fr: 'PDF · Français', en: 'PDF · French', zh: 'PDF · 法语' },
    educationTitle: {
      fr: 'Formation',
      en: 'Education',
      zh: '教育'
    },
    languagesTitle: {
      fr: 'Langues',
      en: 'Languages',
      zh: '语言'
    }
  },
  contact: {
    title: {
      fr: 'Contact',
      en: 'Contact',
      zh: '联系'
    },
    description: {
      fr: 'Pour les demandes de projet et opportunités de collaboration',
      en: 'For project inquiries and collaboration opportunities',
      zh: '项目咨询与合作机会'
    },
    email: {
      fr: 'Email',
      en: 'Email',
      zh: '邮箱'
    },
    phone: {
      fr: 'Téléphone',
      en: 'Phone',
      zh: '电话'
    },
    follow: {
      fr: 'Suivre',
      en: 'Follow',
      zh: '关注'
    },
    locationLabel: { fr: 'Localisation', en: 'Location', zh: '所在地' },
    opensInNewTab: { fr: 'Ouvre un nouvel onglet', en: 'Opens in a new tab', zh: '在新标签页打开' },
    location: {
      fr: 'Basé à Neuilly-sur-Seine, France',
      en: 'Based in Neuilly-sur-Seine, France',
      zh: '位于法国塞纳河畔讷伊'
    },
    availability: {
      fr: 'Disponible pour des projets freelance',
      en: 'Available for freelance projects',
      zh: '接受自由职业项目'
    },
    portfolio: {
      fr: 'Portfolio',
      en: 'Portfolio',
      zh: '作品集'
    }
  },
  notFound: {
    title: {
      fr: 'Page non trouvée',
      en: 'Page not found',
      zh: '未找到页面'
    },
    returnHome: {
      fr: 'Retour à l\'accueil',
      en: 'Return home',
      zh: '返回首页'
    }
  }
};

export function t(key: string, lang: Language): string {
  const keys = key.split('.');
  let value: any = translations;

  for (const k of keys) {
    value = value[k];
    if (!value) return key;
  }

  return value[lang] || value.en || key;
}
