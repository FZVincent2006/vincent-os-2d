import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import colors from '../../constants/colors';
import { useLanguage } from '../../i18n/LanguageProvider';
import ResumeDownload from './ResumeDownload';

export interface ContactProps {}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const createSubmissionId = (): string => {
    const browserCrypto = window.crypto as
        | (Crypto & {
              randomUUID?: () => string;
              getRandomValues?: (array: Uint8Array) => Uint8Array;
          })
        | undefined;

    if (browserCrypto?.randomUUID) {
        return browserCrypto.randomUUID();
    }

    const bytes = browserCrypto?.getRandomValues
        ? browserCrypto.getRandomValues(new Uint8Array(16))
        : Uint8Array.from({ length: 16 }, () =>
              Math.floor(Math.random() * 256),
          );
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0'));

    return [
        hex.slice(0, 4).join(''),
        hex.slice(4, 6).join(''),
        hex.slice(6, 8).join(''),
        hex.slice(8, 10).join(''),
        hex.slice(10, 16).join(''),
    ].join('-');
};

const Contact: React.FC<ContactProps> = () => {
    const { t } = useLanguage();
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [website, setWebsite] = useState('');
    const [status, setStatus] = useState<FormStatus>('idle');
    const [formMessage, setFormMessage] = useState('');

    const isFormValid = useMemo(
        () =>
            validateEmail(email) &&
            name.trim().length > 0 &&
            name.trim().length <= 100 &&
            company.trim().length <= 120 &&
            message.trim().length > 0 &&
            message.trim().length <= 5000,
        [company, email, message, name],
    );

    const isLoading = status === 'sending';

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!isFormValid || isLoading) {
            return;
        }

        setStatus('sending');
        setFormMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    company,
                    email,
                    name,
                    message,
                    website,
                    submissionId: createSubmissionId(),
                }),
            });
            const data = (await response.json()) as { success?: boolean };

            if (!response.ok || data.success !== true) {
                throw new Error('Contact request failed');
            }

            const submittedName = name.trim();
            setCompany('');
            setEmail('');
            setName('');
            setMessage('');
            setWebsite('');
            setStatus('success');
            setFormMessage(
                t('showcase.contact.success').replace(
                    '{name}',
                    submittedName,
                ),
            );
        } catch {
            setStatus('error');
            setFormMessage(t('showcase.contact.error'));
        }
    }

    useEffect(() => {
        if (!formMessage) {
            return undefined;
        }

        const timeoutId = window.setTimeout(() => {
            setFormMessage('');
            setStatus('idle');
        }, 4000);

        return () => window.clearTimeout(timeoutId);
    }, [formMessage]);

    return (
        <div className="site-page-content">
            <div style={styles.header}>
                <h1>{t('showcase.contact.title')}</h1>
            </div>
            <div className="text-block">
                <p>{t('showcase.contact.intro')}</p>
                <br />
                <p>
                    <b>{t('showcase.contact.directEmailLabel')} </b>
                    <a href="mailto:15070654315@163.com">
                        15070654315@163.com
                    </a>
                </p>

                <form style={styles.form} onSubmit={submitForm}>
                    <label htmlFor="contact-name">
                        <p>
                            {!name.trim() && (
                                <span aria-hidden="true" style={styles.star}>
                                    *
                                </span>
                            )}
                            <b>{t('showcase.contact.nameLabel')}</b>
                        </p>
                    </label>
                    <input
                        id="contact-name"
                        style={styles.formItem}
                        type="text"
                        name="name"
                        maxLength={100}
                        autoComplete="name"
                        placeholder={t('showcase.contact.namePlaceholder')}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <label htmlFor="contact-email">
                        <p>
                            {!validateEmail(email) && (
                                <span aria-hidden="true" style={styles.star}>
                                    *
                                </span>
                            )}
                            <b>{t('showcase.contact.emailLabel')}</b>
                        </p>
                    </label>
                    <input
                        id="contact-email"
                        style={styles.formItem}
                        type="email"
                        name="email"
                        maxLength={254}
                        autoComplete="email"
                        placeholder={t('showcase.contact.emailPlaceholder')}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="contact-company">
                        <p>
                            <b>{t('showcase.contact.companyLabel')}</b>
                        </p>
                    </label>
                    <input
                        id="contact-company"
                        style={styles.formItem}
                        type="text"
                        name="company"
                        maxLength={120}
                        autoComplete="organization"
                        placeholder={t('showcase.contact.companyPlaceholder')}
                        value={company}
                        onChange={(event) => setCompany(event.target.value)}
                    />
                    <label htmlFor="contact-message">
                        <p>
                            {!message.trim() && (
                                <span aria-hidden="true" style={styles.star}>
                                    *
                                </span>
                            )}
                            <b>{t('showcase.contact.messageLabel')}</b>
                        </p>
                    </label>
                    <textarea
                        id="contact-message"
                        name="message"
                        maxLength={5000}
                        placeholder={t('showcase.contact.messagePlaceholder')}
                        style={styles.formItem}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <div style={styles.honeypot} aria-hidden="true">
                        <label htmlFor="contact-website">Website</label>
                        <input
                            id="contact-website"
                            name="website"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={website}
                            onChange={(event) => setWebsite(event.target.value)}
                        />
                    </div>
                    <div style={styles.buttons}>
                        <button
                            className="site-button"
                            style={styles.button}
                            type="submit"
                            disabled={!isFormValid || isLoading}
                        >
                            {isLoading
                                ? t('showcase.contact.sending')
                                : t('showcase.contact.send')}
                        </button>
                        <div style={styles.formInfo}>
                            <p
                                role={status === 'error' ? 'alert' : 'status'}
                                aria-live="polite"
                                style={{
                                    color:
                                        status === 'success'
                                            ? colors.blue
                                            : colors.red,
                                }}
                            >
                                <b>
                                    <sub>{formMessage || '\u00a0'}</sub>
                                </b>
                            </p>
                            <p>
                                <sub>
                                    {!isFormValid ? (
                                        <span>
                                            <b style={styles.star}>*</b>
                                            {t('showcase.contact.required')}
                                        </span>
                                    ) : (
                                        '\u00a0'
                                    )}
                                </sub>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
            <ResumeDownload altText={t('showcase.contact.resumePrompt')} />
        </div>
    );
};

const styles: StyleSheetCSS = {
    form: {
        flexDirection: 'column',
        marginTop: 32,
    },
    formItem: {
        marginTop: 4,
        marginBottom: 16,
    },
    buttons: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    formInfo: {
        textAlign: 'right',
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingLeft: 24,
    },
    star: {
        paddingRight: 4,
        color: 'red',
    },
    button: {
        minWidth: 184,
        height: 32,
    },
    header: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    honeypot: {
        position: 'absolute',
        left: -10000,
        width: 1,
        height: 1,
        overflow: 'hidden',
    },
};

export default Contact;
