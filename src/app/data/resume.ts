import type { Language } from '../contexts/LanguageContext';

type LocalizedText = Record<Language, string>;

export const resumeDownload = {
  path: '/cv/cv_yuan_2026.pdf',
  filename: 'cv_yuan_2026.pdf',
  mimeType: 'application/pdf'
};

interface ProfessionalExperience {
  id: string;
  role: LocalizedText;
  company: LocalizedText;
  period: string;
  location: LocalizedText;
}

interface ExperienceGroup {
  id: string;
  titleKey: string;
  entries: ProfessionalExperience[];
}

const paris: LocalizedText = { fr: 'Paris', en: 'Paris', zh: '巴黎' };
const hangzhou: LocalizedText = { fr: 'Hangzhou', en: 'Hangzhou', zh: '杭州' };
const organization = (name: string): LocalizedText => ({ fr: name, en: name, zh: name });

// Roles, dates and grouping follow cv_yuan_2026.pdf. Dates are shared across
// languages; translations describe the same experience without adding duties.
export const resumeExperienceGroups: ExperienceGroup[] = [
  {
    id: 'freelance', titleKey: 'about.freelanceTitle', entries: [
      {
        id: 'picture-box-2026',
        role: { fr: 'Assistant animation', en: 'Animation Assistant', zh: '动画助理' },
        company: organization('Sylvain Chomet’s Picture Box'),
        period: '07/2026', location: paris
      },
      {
        id: 'bonprint-2024',
        role: { fr: 'Graphiste print', en: 'Print Graphic Designer', zh: '印刷平面设计师' },
        company: organization('Bonprint (CX Design)'),
        period: '11/2024 – 05/2026', location: paris
      },
      {
        id: 'luckytime-2022',
        role: { fr: 'Montage vidéo / Création visuelle', en: 'Video Editing / Visual Creation', zh: '视频剪辑 / 视觉创作' },
        company: organization('LuckyTime'),
        period: '03/2022 – 04/2024', location: paris
      },
      {
        id: 'debond-2022',
        role: { fr: 'Illustrateur / Graphiste', en: 'Illustrator / Graphic Designer', zh: '插画师 / 平面设计师' },
        company: organization('Debond'),
        period: '06/2022 – 12/2022', location: paris
      },
      {
        id: 'royalties-2021',
        role: { fr: 'Graphiste branding', en: 'Branding Graphic Designer', zh: '品牌平面设计师' },
        company: organization('Royalties Ecobranding'),
        period: '09/2021 – 12/2021', location: paris
      }
    ]
  },
  {
    id: 'internships', titleKey: 'about.internshipsTitle', entries: [
      {
        id: 'luckytime-2020',
        role: { fr: 'Montage vidéo', en: 'Video Editing', zh: '视频剪辑' },
        company: organization('LuckyTime'),
        period: '08/2020 – 01/2021', location: paris
      },
      {
        id: 'pascal-vanhoecke-2018',
        role: { fr: 'Web Designer', en: 'Web Designer', zh: '网页设计师' },
        company: organization('Galerie Pascal Vanhoecke'),
        period: '04/2018 – 06/2018', location: { fr: 'Cachan, Paris', en: 'Cachan, Paris', zh: '巴黎卡尚' }
      },
      {
        id: 'leying-2016',
        role: { fr: 'Print', en: 'Print Design', zh: '印刷设计' },
        company: { fr: 'LEYING Culturelle et Créative', en: 'LEYING Cultural & Creative', zh: '乐影文创' },
        period: '03/2016 – 06/2016', location: { fr: 'Yuhang, Hangzhou', en: 'Yuhang, Hangzhou', zh: '杭州余杭' }
      },
      {
        id: 'zhirui-2015',
        role: { fr: 'Graphiste', en: 'Graphic Designer', zh: '平面设计师' },
        company: { fr: 'ZHIRUI Médias', en: 'ZHIRUI Media', zh: '智睿传媒' },
        period: '12/2015 – 03/2016', location: hangzhou
      }
    ]
  },
  {
    id: 'volunteering', titleKey: 'about.volunteeringTitle', entries: [
      {
        id: 'art-connexion-2018',
        role: { fr: 'Médiateur culturel', en: 'Cultural Mediator', zh: '文化调解员' },
        company: { fr: 'Art#Connexion (Grand Palais)', en: 'Art#Connexion (Grand Palais)', zh: 'Art#Connexion (巴黎大皇宫)' },
        period: '06/07/2018 – 09/07/2018', location: paris
      },
      {
        id: 'zhejiang-art-museum-2015',
        role: { fr: 'Médiateur culturel', en: 'Cultural Mediator', zh: '文化调解员' },
        company: { fr: 'Musée d’Art du Zhejiang', en: 'Zhejiang Art Museum', zh: '浙江美术馆' },
        period: '06/2015 – 06/2016', location: hangzhou
      }
    ]
  }
];
