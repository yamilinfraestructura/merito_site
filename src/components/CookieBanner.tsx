import { useEffect } from 'react'
import CookieConsent from 'react-cookie-consent'
import { enableAnalytics } from '../utils/analytics'

export const CookieBanner = () => {
    useEffect(() => {
        // Check if user already accepted cookies and enable analytics
        const consent = document.cookie
            .split('; ')
            .find((row) => row.startsWith('merito_cookie_consent='))
            ?.split('=')[1]

        if (consent === 'true') {
            enableAnalytics()
        }
    }, [])

    const handleAccept = () => {
        // Enable Google Analytics
        enableAnalytics()
    }

    const handleDecline = () => {
        // User declined, no analytics tracking
        console.log('🍪 Cookies de análisis rechazadas')
    }

    return (
        <CookieConsent
            location="bottom"
            buttonText="Aceptar todas"
            declineButtonText="Rechazar"
            cookieName="merito_cookie_consent"
            expires={365}
            enableDeclineButton
            onAccept={handleAccept}
            onDecline={handleDecline}
            containerClasses="cookie-banner"
            buttonClasses="cookie-banner__button cookie-banner__button--accept"
            declineButtonClasses="cookie-banner__button cookie-banner__button--decline"
            contentClasses="cookie-banner__content"
            style={{
                background: 'rgba(0, 42, 58, 0.98)',
                backdropFilter: 'blur(10px)',
                padding: '1.5rem 2rem',
                alignItems: 'center',
                boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.2)',
            }}
            buttonStyle={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                color: '#002a3a',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                margin: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
            }}
            declineButtonStyle={{
                background: 'transparent',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: '500',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                margin: '0.5rem',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
            }}
        >
            <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🍪</span>
                    <strong style={{ fontSize: '1.1rem', color: '#d4af37', display: 'inline' }}>
                        Usamos cookies para mejorar tu experiencia
                    </strong>
                </div>
                <p style={{
                    margin: '0 0 0.5rem',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.9)',
                    textAlign: 'center'
                }}>
                    Este sitio utiliza cookies para analizar el tráfico y mejorar
                    nuestros servicios. Consulta nuestra{' '}
                    <a
                        href="#politica-cookies"
                        style={{ color: '#d4af37', textDecoration: 'underline', fontWeight: '500' }}
                        onClick={(e) => {
                            e.preventDefault()
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                            setTimeout(() => {
                                window.location.hash = 'politica-cookies'
                            }, 500)
                        }}
                    >
                        Política de Cookies
                    </a>{' '}
                    para más información.
                </p>
            </div>
        </CookieConsent>
    )
}
