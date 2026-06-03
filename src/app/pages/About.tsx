import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

export function About() {
  const { language } = useLanguage();

  const skills = {
    fr: [
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Adobe InDesign',
      'Adobe Premiere Pro',
      'Adobe After Effects',
      'HTML / CSS',
      'Figma',
      'Unity',
      'Blender',
      'Aseprite',
      'Calligraphie chinoise',
      'Peinture chinoise'
    ],
    en: [
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Adobe InDesign',
      'Adobe Premiere Pro',
      'Adobe After Effects',
      'HTML / CSS',
      'Figma',
      'Unity',
      'Blender',
      'Aseprite',
      'Chinese Calligraphy',
      'Chinese Painting'
    ],
    zh: [
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Adobe InDesign',
      'Adobe Premiere Pro',
      'Adobe After Effects',
      'HTML / CSS',
      'Figma',
      'Unity',
      'Blender',
      'Aseprite',
      '中国书法',
      '中国绘画'
    ]
  };

const experience = {
    fr: [
      { role: 'Graphiste print freelance', company: 'Bonprint (CX Design)', period: '11/2024 – 2026', location: 'Paris' },
      { role: 'Création visuelle / Montage vidéo', company: 'LuckyTime', period: '03/2022 – 04/2024', location: 'Paris' },
      { role: 'Illustrateur / Graphiste', company: 'Debond', period: '06/2022 – 12/2022', location: 'Paris' },
      { role: 'Graphiste branding freelance', company: 'Royalties Ecobranding', period: '09/2021 – 12/2021', location: 'Paris' },
      { role: 'Montage Vidéo (Stage)', company: 'LuckyTime', period: '08/2020 – 01/2021', location: 'Paris' },
      { role: 'Médiateur culturel (Volontaire)', company: 'Art#Connexion (Grand Palais)', period: '06/07/2018 – 09/07/2018', location: 'Paris' },
      { role: 'Web Designer (Stage)', company: 'Galerie Pascal Vanhoecke', period: '04/2018 – 06/2018', location: 'Cachan, Paris' },
      { role: 'Print (Stage)', company: 'LEYING Culturelle et Créative', period: '03/2016 – 06/2016', location: 'Yuhang, Hangzhou' },
      { role: 'Médiateur culturel (Volontaire)', company: 'Musée d\'Art du Zhejiang', period: '06/2015 – 06/2016', location: 'Hangzhou' },
      { role: 'Graphiste (Stage)', company: 'ZHIRUI Médias', period: '12/2015 – 03/2016', location: 'Hangzhou' }
    ],
    en: [
      { role: 'Freelance Print Graphic Designer', company: 'Bonprint (CX Design)', period: '11/2024 – 05/2026', location: 'Paris' },
      { role: 'Visual Creation / Video Editing', company: 'LuckyTime', period: '03/2022 – 04/2024', location: 'Paris' },
      { role: 'Illustrator / Graphic Designer', company: 'Debond', period: '06/2022 – 12/2022', location: 'Paris' },
      { role: 'Freelance Branding Graphic Designer', company: 'Royalties Ecobranding', period: '09/2021 – 12/2021', location: 'Paris' },
      { role: 'Video Editing (Internship)', company: 'LuckyTime', period: '08/2020 – 01/2021', location: 'Paris' },
      { role: 'Cultural Mediator (Volunteer)', company: 'Art#Connexion (Grand Palais)', period: '06/07/2018 – 09/07/2018', location: 'Paris' },
      { role: 'Web Designer (Internship)', company: 'Galerie Pascal Vanhoecke', period: '04/2018 – 06/2018', location: 'Cachan, Paris' },
      { role: 'Print Designer (Internship)', company: 'LEYING Cultural & Creative', period: '03/2016 – 06/2016', location: 'Yuhang, Hangzhou' },
      { role: 'Cultural Mediator (Volunteer)', company: 'Zhejiang Art Museum', period: '06/2015 – 06/2016', location: 'Hangzhou' },
      { role: 'Graphic Designer (Internship)', company: 'ZHIRUI Media', period: '12/2015 – 03/2016', location: 'Hangzhou' }
    ],
    zh: [
      { role: '自由平面设计师（印刷）', company: 'Bonprint (CX Design)', period: '11/2024 – 2026', location: '巴黎' },
      { role: '视觉创作 / 视频编辑', company: 'LuckyTime', period: '03/2022 – 04/2024', location: '巴黎' },
      { role: '插画师 / 平面设计师', company: 'Debond', period: '06/2022 – 12/2022', location: '巴黎' },
      { role: '自由品牌平面设计师', company: 'Royalties Ecobranding', period: '09/2021 – 12/2021', location: '巴黎' },
      { role: '视频剪辑（实习）', company: 'LuckyTime', period: '08/2020 – 01/2021', location: '巴黎' },
      { role: '文化调解员（志愿者）', company: 'Art#Connexion (巴黎大皇宫)', period: '06/07/2018 – 09/07/2018', location: '巴黎' },
      { role: '网页设计师（实习）', company: 'Galerie Pascal Vanhoecke', period: '04/2018 – 06/2018', location: '巴黎卡尚' },
      { role: '印刷设计（实习）', company: '乐影文创', period: '03/2016 – 06/2016', location: '杭州余杭' },
      { role: '文化调解员（志愿者）', company: '浙江美术馆', period: '06/2015 – 06/2016', location: '杭州' },
      { role: '平面设计师（实习）', company: '智睿传媒', period: '12/2015 – 03/2016', location: '杭州' }
    ]
  };

  const education = {
    fr: [
      { degree: 'Mastère Spécialisé – Designer d\'Expérience Interactive et Ludique', school: 'GOBELINS, l\'école de l\'image', period: '10/2019 – 05/2021' },
      { degree: 'DSAA – Design Graphique et Narration Multimédia', school: 'Lycée Jacques Prévert, Boulogne-Billancourt', period: '09/2017 – 06/2019' },
      { degree: 'Workshops d\'Artistes', school: 'E-ART campus, Hangzhou', period: '07/2016 – 07/2017' }, // 补充了这一段艺术工作坊经历
      { degree: 'Bachelor – Automatisation', school: 'Université des Sciences et Techniques du Zhejiang', period: '09/2012 – 06/2016' }
    ],
    en: [
      { degree: 'Specialized Master\'s – Interactive and Playful Experience Design', school: 'GOBELINS, l\'école de l\'image', period: '10/2019 – 05/2021' },
      { degree: 'DSAA – Graphic Design and Multimedia Storytelling', school: 'Lycée Jacques Prévert, Boulogne-Billancourt', period: '09/2017 – 06/2019' },
      { degree: 'Artist Workshops', school: 'E-ART campus, Hangzhou', period: '07/2016 – 07/2017' },
      { degree: 'Bachelor – Automation', school: 'Zhejiang Sci-Tech University', period: '09/2012 – 06/2016' }
    ],
    zh: [
      { degree: '专业硕士 – 交互式和趣味性体验设计', school: 'GOBELINS, l\'école de l\'image', period: '10/2019 – 05/2021' },
      { degree: 'DSAA – 平面设计和多媒体叙事', school: 'Lycée Jacques Prévert, Boulogne-Billancourt', period: '09/2017 – 06/2019' },
      { degree: '艺术家工作坊经历', school: 'E-ART 杭州校区', period: '07/2016 – 07/2017' },
      { degree: '学士 – 自动化', school: '浙江理工大学', period: '09/2012 – 06/2016' }
    ]
  };

  const languages = {
    fr: [
      { language: 'Chinois', level: 'Langue maternelle' },
      { language: 'Français', level: 'Courant' },
      { language: 'Anglais', level: 'Courant' }
    ],
    en: [
      { language: 'Chinese', level: 'Native' },
      { language: 'French', level: 'Fluent' },
      { language: 'English', level: 'Fluent' }
    ],
    zh: [
      { language: '中文', level: '母语' },
      { language: '法语', level: '流利' },
      { language: '英语', level: '流利' }
    ]
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <section className="pt-40 pb-20 px-8 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-5xl md:text-6xl tracking-tight mb-16">
            {t('about.title', language)}
          </h1>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-black/80 leading-relaxed tracking-tight">
                {t('about.bio1', language)}
              </p>
              <p className="text-base md:text-lg text-black/60 leading-relaxed tracking-tight">
                {t('about.bio2', language)}
              </p>
              <p className="text-base md:text-lg text-black/60 leading-relaxed tracking-tight">
                {t('about.bio3', language)}
              </p>
              <p className="text-base md:text-lg text-black/60 leading-relaxed tracking-tight">
                {t('about.bio4', language)}
              </p>
            </div>

            <div>
              <h2 className="text-2xl tracking-tight mb-8">
                {t('about.skillsTitle', language)}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {skills[language].map((skill, index) => (
                  <div
                    key={index}
                    className="text-sm text-black/70 tracking-tight border-l-2 border-black pl-4 py-2"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 md:px-12 pb-20">
        <div className="max-w-[1400px] mx-auto border-t border-black/10 pt-20">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl tracking-tight mb-8">
                {t('about.experienceTitle', language)}
              </h2>
              <div className="space-y-6 text-black/70">
                {experience[language].map((exp, index) => (
                  <div key={index}>
                    <p className="text-base tracking-tight font-medium text-black/90">
                      {exp.role}
                    </p>
                    <p className="text-sm tracking-tight">
                      {exp.company} {exp.location && `— ${exp.location}`}
                    </p>
                    <p className="text-xs tracking-tight text-black/50 mt-1">
                      {exp.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl tracking-tight mb-8">
                {t('about.educationTitle', language)}
              </h2>
              <div className="space-y-6 text-black/70">
                {education[language].map((edu, index) => (
                  <div key={index}>
                    <p className="text-base tracking-tight font-medium text-black/90">
                      {edu.degree}
                    </p>
                    <p className="text-sm tracking-tight">
                      {edu.school}
                    </p>
                    <p className="text-xs tracking-tight text-black/50 mt-1">
                      {edu.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 md:px-12 pb-32">
        <div className="max-w-[1400px] mx-auto border-t border-black/10 pt-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl tracking-tight mb-8">
              {t('about.languagesTitle', language)}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {languages[language].map((lang, index) => (
                <div key={index} className="text-black/70">
                  <p className="text-base tracking-tight font-medium text-black/90">
                    {lang.language}
                  </p>
                  <p className="text-sm tracking-tight">
                    {lang.level}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
