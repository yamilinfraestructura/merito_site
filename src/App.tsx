import { useEffect, useRef, useState } from 'react'
import { MobileNavbar } from './components/MobileNavbar'
import { VideoModal } from './components/VideoModal'
import { CookieBanner } from './components/CookieBanner'
import { PoliticaCookies } from './components/PoliticaCookies'

const navLinks = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Reconocimiento', href: '#socios' },
  { label: 'Empresas', href: '#premiados' },
  { label: 'Contacto', href: '#contacto' },
]

const categories = ['Minería', 'Automotores', 'Comunicaciones', 'Seguridad', 'Gastronomía', 'Comercio', 'Salud', 'Belleza', 'Industria', 'Vinos y Licores', 'Transporte', 'Regalos', 'Recreación', 'Alimentos', 'Construcción', 'Empresas y Negocios', 'Eventos', 'Hogar', 'Indumentaria', 'Educación', 'Turismo']

const companiesByCategory: Record<string, Array<{ name: string; logo: string; url: string }>> = {
  Gastronomía: [
    { name: 'Restaurante El Sabor', logo: 'https://via.placeholder.com/150x80?text=El+Buen+Sabor', url: 'https://example.com' },
    { name: 'Café Central', logo: 'https://via.placeholder.com/150x80?text=Cafe+Central', url: 'https://example.com' },
    { name: 'La Parrilla del Valle', logo: 'https://via.placeholder.com/150x80?text=Parrilla+Valle', url: 'https://example.com' },
    { name: 'Panadería Emi', logo: '/gastronomia/panaderia_emi_logo.webp', url: 'https://www.instagram.com/panaderiaemilen/?hl=es-la' },
  ],
  Comercio: [
    { name: 'Grupo A2', logo: '/comercio/A2_logo.webp', url: 'https://www.instagram.com/grupoa2.mdp/' },
    { name: 'Zini & Cía', logo: '/comercio/zini_cia_logo.webp', url: 'http://mariozini.com/site/' },
    { name: 'Hidrotécnica', logo: '/comercio/hidrotecnica_logo.webp', url: 'https://www.facebook.com/hidrotecnica.sanjuan/' },
    { name: 'Oleohidráulica Eugenio Sulic', logo: '/comercio/oleohidraulica_logo.webp', url: 'https://www.facebook.com/OleohidraulicaEugenioSulic/' },
    { name: 'G&A Eléctricos', logo: '/comercio/gya_electricos_logo.webp', url: 'https://www.facebook.com/gyamatelecferrelec/' },
  ],
  Salud: [
    { name: 'Clínica Santa Clara', logo: '/salud/santaclara_logo.webp', url: 'https://redsantaclara.com.ar/clinica-santa-clara-san-juan/' },
    { name: 'Clínica San Juan', logo: 'https://via.placeholder.com/150x80?text=Clinica+San+Juan', url: 'https://example.com' },
    { name: 'Laboratorio Médico', logo: 'https://via.placeholder.com/150x80?text=Lab+Medico', url: 'https://example.com' },
    { name: 'Farmacia Central', logo: 'https://via.placeholder.com/150x80?text=Farmacia+Central', url: 'https://example.com' },
  ],
  Belleza: [
    { name: 'Salón de Belleza Elegance', logo: 'https://via.placeholder.com/150x80?text=Elegance', url: 'https://example.com' },
    { name: 'Spa Relax', logo: 'https://via.placeholder.com/150x80?text=Spa+Relax', url: 'https://example.com' },
    { name: 'Estética Moderna', logo: 'https://via.placeholder.com/150x80?text=Estetica+Moderna', url: 'https://example.com' },
  ],
  Industria: [
    { name: 'Industrias Reina', logo: '/industria/industria_reina_logo.webp', url: 'https://www.instagram.com/industriasreina/' },
    { name: 'Maquinarias Ya Hoy', logo: '/industria/yahoy_logo.jpg', url: 'https://www.instagram.com/maquinariasya.hoy?igsh=MWtxa29kNmNxemkxbg%3D%3D' },
  ],
  Minería: [
    { name: 'Yamana Gold', logo: '/mineria/yamana_logo.webp', url: 'https://yamana2021rd.q4web.com/English/home/default.aspx' },
    { name: 'Acer', logo: '/mineria/acer_logo.webp', url: 'https://acersrl.com/' },
  ],
  Automotores: [
    { name: 'F1 Neumáticos', logo: '/automotores/F1_logo.webp', url: 'https://f1-neumaticos2.webnode.page/' },
    { name: 'Motores Balderramo', logo: '/automotores/motores_balderramo_logo.webp', url: 'https://redbalderramo.com/' },
  ],
  Comunicaciones: [
    { name: '101.5 Radio del Sur', logo: '/comunicacion/101_logo.webp', url: 'https://www.delsurdiario.com/radio-vivo/' },
    { name: 'Canal 8 San Juan', logo: '/comunicacion/canal8_logo.webp', url: 'https://www.canal8sanjuan.com.ar/' },
    { name: 'Canal 13 San Juan (Delsur TV)', logo: '/comunicacion/delsur_logo.webp', url: 'https://www.instagram.com/delsurtv/' },
  ],
  Seguridad: [
    { name: 'Huarpe Seguridad', logo: '/seguridad/huarpe_logo.webp', url: 'https://huarpeseguridad.com/oficial/?url=index.php' },
  ],
  'Vinos y Licores': [
    { name: 'Clapton Café y Vinos', logo: '/vinos/claptom_logo.webp', url: 'https://claptoncafeyvinos.shop/' },
    { name: 'La Pampa Gin', logo: '/vinos/lapampa_logo.webp', url: 'https://www.facebook.com/p/La-Pampa-Gin-100089682007871/' },
  ],
  Transporte: [
    { name: '20 de Junio', logo: '/transporte/20junio_logo.webp', url: 'https://la20.com.ar/' },
    { name: 'Del Bono', logo: '/transporte/delbono_logo.webp', url: 'https://example.com' },
    { name: 'Del Bono Remis', logo: '/transporte/delbono_remis_logo.webp', url: 'https://www.facebook.com/remisdelbono/' },
    { name: 'Puertas de Cuyo', logo: '/transporte/puertasdecuyo_logo.webp', url: 'https://www.instagram.com/puertasdecuyo.srl/' },
  ],
  Regalos: [
    { name: 'Diversa Mayorista', logo: '/regalos/diversa_logo.webp', url: 'https://www.diversamayorista.com.ar/?srsltid=AfmBOootlEXjUFMdaq_BZvalnRIPIuXg3WLjMFrrCuTsrKMGDDqikNNb' },
  ],
  Recreación: [],
  Alimentos: [
    { name: 'Frigorífico y Avícola Soles', logo: '/alimentos/soles_logo.webp', url: 'https://www.instagram.com/frigorificoyavicolasoles/?hl=es-la' },
    { name: 'Rey del Copetín', logo: '/alimentos/rey_copetin_logo.webp', url: 'https://reydelcopetin.com.ar/' },
    { name: 'Miriam', logo: '/alimentos/miriam_logo.webp', url: 'https://www.instagram.com/myriamsanjuanarg/?hl=es' },
    { name: 'América Mayorista', logo: '/alimentos/america_mayorista_logo.webp', url: 'https://www.americamayorista.com/' },
    { name: 'Cabral Mayorista', logo: '/alimentos/cabral_logo.webp', url: 'https://www.instagram.com/cabralmayorista/?hl=es' },
  ],
  Construcción: [
    { name: 'MP Construcciones', logo: '/construccion/mp_logo.webp', url: '#' },
  ],
  'Empresas y Negocios': [],
  Eventos: [
    { name: 'Estudiarte Creativos', logo: '/eventos/estudiarte_logo.webp', url: 'https://www.estudiartecreativos.com/' },
    { name: 'MOA Eventos', logo: '/eventos/moa_logo.webp', url: 'https://www.instagram.com/moa_eventos/?hl=es' },
    { name: 'De Colores', logo: '/eventos/de_colores_logo.webp', url: 'https://example.com' },
    { name: 'Fernando Alamino Eventos', logo: '/eventos/fernando_logo.webp', url: 'https://www.instagram.com/explore/locations/411571012269889/fer-alamino-eventos-rental-viajes/' },
  ],
  Hogar: [
    { name: 'Ambiente', logo: '/hogar/ambiente_logo.webp', url: '#' },
  ],
  Indumentaria: [
    { name: 'Girasol', logo: '/indumentaria/girasol_logo.webp', url: 'https://example.com' },
  ],
  Educación: [
    { name: 'Universidad Nacional de San Juan', logo: '/educacion/universidad_logo.webp', url: 'https://www.unsj.edu.ar/' },
    { name: 'Instituto Aconcagua', logo: '/educacion/aconcagua_logo.webp', url: 'https://institutoaconcagua.com.ar/' },
  ],
  Turismo: [
    { name: 'Turismo Bacur', logo: '/turismo/bacur_logo.webp', url: 'http://turismobacur.tur.ar/' },
  ],
}

const recognitionHighlights = [
  {
    title: 'EXCELENCIA EMPRESARIAL',
    quote: '"Cuatro ediciones premiando la excelencia Empresarial"',
    copy:
      'Cada año elevamos la vara junto a las empresas sanjuaninas que impulsan empleo, innovación y desarrollo sostenible para la provincia.',
    images: [
      'https://images.unsplash.com/photo-1497561813398-8fcc7a37b567?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      '/premios1.webp',
    ],
  },
  {
    title: '¿Por qué lo hacemos?',
    quote: '"Los Empresarios Celebran el Reconocimiento en la Cena de Gala"',
    copy:
      'Acompañamos a líderes que inspiran con buenas prácticas, impacto social y visión de futuro. El premio es una plataforma para amplificar su voz al esfuerzo, trabajo y dedicación.',
    images: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
]

const partnerLogos = [
  { name: 'Soft Tech Solutions', logo: '/logo_soft.png', url: 'https://www.instagram.com/soft_tech_solutions?igsh=MTdyejZzZG0wenF1bQ%3D%3D' },
  { name: 'Estudiarte Creativos', logo: '/eventos/estudiarte_logo.webp', url: 'https://www.instagram.com/estudiartecreativos/' },
  { name: 'Universidad Nacional de San Juan', logo: '/educacion/universidad_logo.webp', url: 'https://www.unsj.edu.ar/' },
]

const ceremonyImages = [
  '/banner1.webp',
  '/banner2.webp',
  '/banner3.webp',
]

const smoothScrollTo = (target: HTMLElement, duration = 1400) => {
  const start = window.scrollY
  const end =
    target.getBoundingClientRect().top + window.scrollY - (window.innerWidth < 768 ? 80 : 140)
  const distance = end - start
  let startTime: number | null = null

  const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

  const loop = (currentTime: number) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    window.scrollTo(0, start + distance * easeInOut(progress))
    if (timeElapsed < duration) requestAnimationFrame(loop)
  }

  requestAnimationFrame(loop)
}

function App() {
  // Inicializar isMobile correctamente desde el inicio para evitar delay
  const [isCompactNav, setIsCompactNav] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeImages, setActiveImages] = useState(recognitionHighlights.map(() => 0))
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [ceremonyImageIndex, setCeremonyImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showCookiePolicy, setShowCookiePolicy] = useState(false)
  const [isMobile, setIsMobile] = useState(() => {
    // Inicializar correctamente desde el inicio, incluso en SSR
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768
    }
    return false
  })
  const highlightRefs = useRef<(HTMLElement | null)[]>([])
  const swappedRef = useRef<boolean[]>(recognitionHighlights.map(() => false))
  const imageTimers = useRef<number[]>([])
  const ceremonyTimer = useRef<number | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verificar inmediatamente al montar
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) {
      // En mobile, limpiar observer y resetear estado
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      setIsCompactNav(false)
      return
    }

    // Limpiar observer anterior si existe
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    let timeoutId: number | null = null

    const setupObserver = () => {
      const trigger = document.getElementById('nav-trigger')
      if (!trigger) {
        timeoutId = window.setTimeout(setupObserver, 50)
        return
      }

      // Verificar estado inicial inmediatamente (importante para Firefox)
      const rect = trigger.getBoundingClientRect()
      const isTriggerVisible = rect.top < window.innerHeight - 80
      setIsCompactNav(!isTriggerVisible)

      // Crear y configurar observer
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsCompactNav(!entry.isIntersecting)
        },
        {
          threshold: 0,
          rootMargin: '-80px 0px 0px 0px',
        },
      )

      observer.observe(trigger)
      observerRef.current = observer
    }

    // Intentar setup inmediatamente, luego con timeout si es necesario
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // DOM ya está listo
      setupObserver()
    } else {
      // Esperar a que el DOM esté listo
      const handleDOMReady = () => {
        setupObserver()
      }
      document.addEventListener('DOMContentLoaded', handleDOMReady)
      // También intentar inmediatamente por si acaso
      setupObserver()

      return () => {
        document.removeEventListener('DOMContentLoaded', handleDOMReady)
        if (timeoutId) clearTimeout(timeoutId)
        if (observerRef.current) {
          observerRef.current.disconnect()
          observerRef.current = null
        }
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [isMobile])

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 420)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setActiveImages(recognitionHighlights.map(() => 1))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement
          const idxAttr = target.dataset.highlightIndex
          const highlightIndex = idxAttr ? Number(idxAttr) : -1
          if (highlightIndex < 0) return

          if (entry.isIntersecting && !swappedRef.current[highlightIndex]) {
            swappedRef.current[highlightIndex] = true
            imageTimers.current[highlightIndex] = window.setTimeout(() => {
              setActiveImages((prev) =>
                prev.map((value, idx) => (idx === highlightIndex ? 1 : value)),
              )
            }, 1000)
          }
        })
      },
      { threshold: 0.5 },
    )

    highlightRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      observer.disconnect()
      imageTimers.current.forEach((timer) => clearTimeout(timer))
    }
  }, [])

  useEffect(() => {
    ceremonyTimer.current = window.setInterval(() => {
      setCeremonyImageIndex((prev) => (prev === 0 ? 1 : 0))
    }, 4000)

    return () => {
      if (ceremonyTimer.current) clearInterval(ceremonyTimer.current)
    }
  }, [])

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault()

    // Handle cookie policy link specially
    if (href === '#politica-cookies') {
      setShowCookiePolicy(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const target = document.querySelector<HTMLElement>(href)
    if (!target) return
    smoothScrollTo(target, 1500)
  }

  // Effect to handle cookie policy visibility and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#politica-cookies') {
        setShowCookiePolicy(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setShowCookiePolicy(false)
      }
    }

    handleHashChange() // Check on mount
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Render cookie policy page if active
  if (showCookiePolicy) {
    return (
      <div className="site-shell">
        <header className="top-nav top-nav--desktop top-nav--compact">
          <div className="top-nav__inner">
            <div className="top-nav__logo">
              <img src="/logo_prestigio2.png" alt="Fundación Mérito" className="top-nav__logo-img" />
              <span className="top-nav__org-name">PREMIO MÉRITO EMPRESARIAL</span>
            </div>
            <nav className="top-nav__links">
              <a
                href="#inicio"
                onClick={(e) => {
                  e.preventDefault()
                  setShowCookiePolicy(false)
                  window.location.hash = ''
                }}
              >
                Volver al Inicio
              </a>
            </nav>
          </div>
        </header>
        <MobileNavbar
          navLinks={[
            {
              label: 'Volver al Inicio',
              href: '#inicio',
            },
          ]}
          onNavClick={(e) => {
            e.preventDefault()
            setShowCookiePolicy(false)
            window.location.hash = ''
          }}
        />
        <PoliticaCookies />
        <CookieBanner />
      </div>
    )
  }

  return (
    <div className="site-shell">
      {/* Navbar Desktop - Solo visible en pantallas grandes */}
      <header className={`top-nav top-nav--desktop ${isCompactNav ? 'top-nav--compact' : ''}`}>
        <div className="top-nav__inner">
          <div className="top-nav__logo">
            <img src="/logo_prestigio2.png" alt="Fundación Mérito" className="top-nav__logo-img" />
            <span className="top-nav__org-name">PREMIO MÉRITO EMPRESARIAL</span>
          </div>
          <nav className="top-nav__links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Navbar Mobile - Solo visible en pantallas pequeñas */}
      <MobileNavbar navLinks={navLinks} onNavClick={handleNavClick} />

      <section className="hero" id="inicio">
        <div className="hero__inner">
          <p className="hero__eyebrow">Premio provincial a la excelencia</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}>Mérito Empresarial 2026 - 2027</h1>
          <div className="hero__actions">
            <button className="btn btn--primary" onClick={() => setIsModalOpen(true)}>
              Aprende más sobre el Premio Mérito Empresarial
            </button>
          </div>
        </div>
      </section>

      {/* 🔥 Trigger que controla el cambio de nav */}
      <div id="nav-trigger" style={{ height: '1px' }}></div>

      <section className="trust">
        <img src="/inpi_refacto.png" alt="INPI - Instituto Nacional de la Propiedad Industrial" className="trust__logo" />
      </section>

      {/* Video Excellence Section */}
      <section className="video-excellence">
        <video
          className="video-excellence__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80"
        >
          <source src="/video_720.webm" type="video/webm" />
        </video>
        <div className="video-excellence__overlay"></div>
        <div className="video-excellence__content">
          <h2>Máximo reconocimiento Empresarial</h2>
        </div>
      </section>


      <main>

        {recognitionHighlights.map((highlight, index) => (
          <section
            key={highlight.title}
            className={`highlight ${index === 0 ? 'highlight--dark highlight--fullwidth' : ''}`}
            id={index === 0 ? 'nosotros' : 'socios'}
            data-highlight-index={index}
            ref={(element) => {
              highlightRefs.current[index] = element
            }}
          >

            <div className="highlight__text">
              <p className="highlight__eyebrow">{highlight.title}</p>
              <h2>{highlight.quote}</h2>
              <p>{highlight.copy}</p>
              <div className="divider" />
              <span className="highlight__meta">Máximo reconocimiento Empresarial</span>
            </div>
            <div className="highlight__image">
              {highlight.images.map((image, imageIndex) => (
                <img
                  key={image}
                  src={image}
                  alt={`${highlight.title} - Empresas destacadas ${index === 0 ? '2026' : '2025'}`}
                  loading="lazy"
                  className={activeImages[index] === imageIndex ? 'is-active' : ''}
                />
              ))}

            </div>
          </section>
        ))}







        <section className="ceremony-banner">
          {ceremonyImages.map((image, idx) => (
            <img
              key={image}
              src={image}
              alt={`Ceremonia de premiación Mérito Empresarial - Acto ${idx + 1}`}
              className={ceremonyImageIndex === idx ? 'is-active' : ''}
            />
          ))}
        </section>

        <section className="categories" id="premiados">
          <div className="categories__header">
            <p className="categories__eyebrow">Sectores premiados</p>
            <h3>Reconocemos el talento empresarial en toda la provincia</h3>
            <p>
              Cada comité está integrado por académicos, periodistas
              especializados y referentes de la industria, garantizando
              transparencia y rigor en la selección.
            </p>
          </div>
          <div className="categories__tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={`categories__tab ${activeCategory === category ? 'is-active' : ''}`}
                type="button"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="categories__companies">
            {companiesByCategory[activeCategory]?.map((company) => (
              <a
                key={company.name}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="categories__company"
              >
                <img src={company.logo} alt={`${company.name} - Empresa premiada en ${activeCategory}`} />
              </a>
            ))}
          </div>
        </section>

        <section className="partners">
          <p className="partners__eyebrow">Respaldado por</p>
          <div className="partners__marks">
            {partnerLogos.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="partners__logo"
              >
                <img src={partner.logo} alt={partner.name} />
              </a>
            ))}
          </div>
        </section>

      </main>

      <section className="contact" id="contacto">
        <div className="contact__grid">
          <div className="contact__card" style={{ padding: '3rem 2rem' }}>
            <p className="contact__eyebrow">Mérito Empresarial 2026</p>
            <h3>Fundación Mérito</h3>
            <p>
              Únete a la red de líderes que transforman la economía sanjuanina
              con innovación y propósito.
            </p>
            <ul>
              <li>Tel: (0264)155656261</li>
              <li>Email: premioalmerito@merito.com.ar</li>
              <li>San Juan, Argentina</li>
            </ul>
            <div className="contact__social">
              <a href="https://www.instagram.com/premio.merito.empresarial/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="https://www.facebook.com/p/Premio-Merito-Empresarial-100064126448745/" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <a href="https://x.com/meritoempresa" target="_blank" rel="noopener noreferrer">
                X
              </a>
            </div>
          </div>

          <div className="contact__card contact__card--developer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <img src="/logo_soft.png" alt="Soft Tech Solutions" style={{ width: '60px', height: 'auto' }} />
              <h3>Soft Tech Solutions</h3>
            </div>
            <p>
              Este sitio ha sido desarrollado por el Equipo de Soft Tech Solutions. Si deseas consultoría sobre diseño, desarrollo de aplicaciones y sistemas informáticos no dudes en contactarnos.
            </p>
            <ul>
              <li><strong>Tel:</strong> +5492645748636</li>
              <li><strong>Email:</strong> softech.solutions.contact@gmail.com</li>
            </ul>
            <div className="contact__social">
              <a href="https://www.instagram.com/soft_tech_solutions/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__brand">
          <img
            src="/logo_prestigio2.png"
            alt="Prestigio Empresarial"
            className="footer__logo"
          />
          <div>
            <p>Mérito Empresarial</p>
            <span>Desarrollado por <a href="https://softtech-system.com/" target="_blank" rel="noopener noreferrer">Soft Tech Solutions</a> 2026</span>
          </div>
        </div>
        <nav className="footer__links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a
            href="#politica-cookies"
            onClick={(e) => handleNavClick(e, '#politica-cookies')}
          >
            Política de Cookies
          </a>
        </nav>
      </footer>

      <button
        type="button"
        className={`back-to-top ${showBackToTop ? 'is-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver al inicio"
      >
        ↑
      </button>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoId="wMpaZBXYbIc"
      />

      <CookieBanner />
    </div >
  )
}

export default App

