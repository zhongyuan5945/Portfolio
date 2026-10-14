import { ArrowUpRight, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import { contactDetails } from '../data/contact';
import '../../styles/contact.css';

export function Contact() {
  const { language } = useLanguage();

  return (
    <div className="contact-page">
      <section className="contact-content" aria-labelledby="contact-title">
        <div className="contact-masthead">
          <Mail size={18} strokeWidth={1.5} className="contact-masthead-icon" aria-hidden="true" />
          <p className="contact-availability">{t('contact.availability', language)}</p>
        </div>

        <header className="contact-header">
          <h1 id="contact-title" className="contact-title">{t('contact.title', language)}</h1>
          <p className="contact-introduction">{t('contact.description', language)}</p>
        </header>

        <div className="contact-grid">
          <section className="contact-block contact-block-email" aria-labelledby="contact-email-heading">
            <div className="contact-block-label">
              <span className="contact-block-number" aria-hidden="true">01</span>
              <h2 id="contact-email-heading">{t('contact.email', language)}</h2>
            </div>
            <a href={`mailto:${contactDetails.email}`} className="contact-link contact-email-link">
              <span className="contact-link-value">{contactDetails.email}</span>
              <ArrowUpRight className="contact-link-arrow" size={24} aria-hidden="true" />
            </a>
          </section>

          <section className="contact-block contact-block-phone" aria-labelledby="contact-phone-heading">
            <div className="contact-block-label">
              <span className="contact-block-number" aria-hidden="true">02</span>
              <h2 id="contact-phone-heading">{t('contact.phone', language)}</h2>
            </div>
            <a href={`tel:${contactDetails.phoneNumber}`} className="contact-link contact-phone-link">
              <span className="contact-link-value">{contactDetails.phoneDisplay}</span>
              <ArrowUpRight className="contact-link-arrow" size={20} aria-hidden="true" />
            </a>
          </section>

          <section className="contact-block contact-block-social" aria-labelledby="contact-social-heading">
            <div className="contact-block-label">
              <span className="contact-block-number" aria-hidden="true">03</span>
              <h2 id="contact-social-heading">{t('contact.follow', language)}</h2>
            </div>
            <div className="contact-social-links">
              {contactDetails.socialLinks.map((social) => (
                <a key={social.id} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="contact-link contact-social-link" aria-label={`${social.label} — ${t('contact.opensInNewTab', language)}`}>
                  <span className="contact-link-value">{social.label}</span>
                  <ArrowUpRight className="contact-link-arrow" size={20} aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>

          <section className="contact-block contact-block-location" aria-labelledby="contact-location-heading">
            <div className="contact-block-label">
              <span className="contact-block-number" aria-hidden="true">04</span>
              <h2 id="contact-location-heading">{t('contact.locationLabel', language)}</h2>
            </div>
            <address className="contact-address">
              <p>{t('contact.location', language)}</p>
              <p>{contactDetails.address}</p>
            </address>
            <dl className="contact-business">
              <div>
                <dt>SIRET</dt>
                <dd>{contactDetails.siret}</dd>
              </div>
            </dl>
          </section>
        </div>
      </section>
    </div>
  );
}
