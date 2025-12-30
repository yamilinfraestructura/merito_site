import ReactGA from 'react-ga4'

// Configuration
const MEASUREMENT_ID = 'G-XXXXXXXXXX' // Will be replaced with real ID after GA4 setup

let isInitialized = false

/**
 * Initialize Google Analytics 4
 * Only initializes if user has given consent
 */
export const initGA = () => {
  if (isInitialized) return
  
  try {
    ReactGA.initialize(MEASUREMENT_ID, {
      gaOptions: {
        anonymizeIp: true, // Privacy: Anonymize IP addresses
      },
    })
    isInitialized = true
    console.log('✅ Google Analytics initialized')
  } catch (error) {
    console.error('❌ Error initializing Google Analytics:', error)
  }
}

/**
 * Track page view
 * @param path - The page path to track
 */
export const trackPageView = (path?: string) => {
  if (!isInitialized) return
  
  try {
    ReactGA.send({
      hitType: 'pageview',
      page: path || window.location.pathname + window.location.search,
    })
  } catch (error) {
    console.error('❌ Error tracking page view:', error)
  }
}

/**
 * Track custom event
 * @param category - Event category (e.g., 'Video', 'Button', 'Link')
 * @param action - Event action (e.g., 'Play', 'Click', 'Download')
 * @param label - Optional event label
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
) => {
  if (!isInitialized) return
  
  try {
    ReactGA.event({
      category,
      action,
      label,
    })
  } catch (error) {
    console.error('❌ Error tracking event:', error)
  }
}

/**
 * Check if user has accepted analytics cookies
 */
export const hasAnalyticsConsent = (): boolean => {
  const consent = document.cookie
    .split('; ')
    .find((row) => row.startsWith('merito_cookie_consent='))
    ?.split('=')[1]
  
  return consent === 'true'
}

/**
 * Enable Google Analytics if consent is given
 * Should be called after user accepts cookies
 */
export const enableAnalytics = () => {
  if (!isInitialized) {
    initGA()
    trackPageView()
  }
}
