import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import { Download } from 'lucide-react';
import { resumeDownload, resumeExperienceGroups } from '../data/resume';

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
      'Toon Boom Harmony',
      'Clip Studio Paint',
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
      'Toon Boom Harmony',
      'Clip Studio Paint',
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
      'Toon Boom Harmony',
      'Clip Studio Paint',
      'Aseprite',
      '中国书法',
      '中国绘画'
    ]
  };

  const education = {
    fr: [
      { degree: 'Mastère Spécialisé – Designer d\'Expérience Interactive et Ludique', school: 'GOBELINS, l\'école de l\'image', period: '10/2019 – 05/2021' },
      { degree: 'Diplôme Supérieur des Arts Appliqués (DSAA) – Design Graphique et Narration Multimédia', school: 'Lycée Jacques Prévert, Boulogne-Billancourt', period: '09/2017 – 06/2019' },
      { degree: 'Workshops d\'Artistes', school: 'E-ART campus, Hangzhou', period: '07/2016 – 07/2017' }, // 补充了这一段艺术工作坊经历
      { degree: 'Bachelor – Automatisation', school: 'Université des Sciences et Techniques du Zhejiang', period: '09/2012 – 06/2016' }
    ],
    en: [
      { degree: 'Specialized Master\'s – Interactive and Playful Experience Design', school: 'GOBELINS, l\'école de l\'image', period: '10/2019 – 05/2021' },
      { degree: 'Higher Diploma in Applied Arts (DSAA) – Graphic Design and Multimedia Storytelling', school: 'Lycée Jacques Prévert, Boulogne-Billancourt', period: '09/2017 – 06/2019' },
      { degree: 'Artist Workshops', school: 'E-ART campus, Hangzhou', period: '07/2016 – 07/2017' },
      { degree: 'Bachelor – Automation', school: 'Zhejiang Sci-Tech University', period: '09/2012 – 06/2016' }
    ],
    zh: [
      { degree: '专业硕士 – 交互式和趣味性体验设计', school: 'GOBELINS, l\'école de l\'image', period: '10/2019 – 05/2021' },
      { degree: '应用艺术高级文凭（DSAA） – 平面设计和多媒体叙事', school: 'Lycée Jacques Prévert, Boulogne-Billancourt', period: '09/2017 – 06/2019' },
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
          <div className="mb-16 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="text-5xl md:text-6xl tracking-tight">
              {t('about.title', language)}
            </h1>
            <div className="flex flex-col items-start gap-2">
              <a href={resumeDownload.path} download={resumeDownload.filename} type={resumeDownload.mimeType}
                className="inline-flex min-h-12 items-center gap-3 border border-black/25 px-5 py-3 text-sm tracking-tight cursor-pointer hover:bg-black hover:text-white motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4">
                {t('about.downloadCv', language)}
                <Download size={18} aria-hidden="true" />
              </a>
              <p className="text-xs text-black/50">{t('about.cvFormat', language)}</p>
            </div>
          </div>

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
              <div className="space-y-10 text-black/70">
                {resumeExperienceGroups.map((group) => (
                  <section key={group.id} aria-labelledby={`experience-${group.id}`}>
                    <h3 id={`experience-${group.id}`} className="text-sm tracking-wide uppercase text-black/60 mb-5">
                      {t(group.titleKey, language)}
                    </h3>
                    <ol className="space-y-6">
                      {group.entries.map((exp) => (
                        <li key={exp.id} data-experience-id={exp.id}>
                          <h4 style={{ fontFamily: 'inherit' }} className="text-base tracking-tight font-medium text-black/90">
                            {exp.role[language]}
                          </h4>
                          <p className="text-sm tracking-tight [overflow-wrap:anywhere]">
                            {exp.company[language]} — {exp.location[language]}
                          </p>
                          <p className="text-xs tracking-tight text-black/50 mt-1">
                            {exp.period}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </section>
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
