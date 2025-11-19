import { useEffect, useRef, useState } from 'react'
import { MobileNavbar } from './components/MobileNavbar'

const navLinks = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Nuestros Socios', href: '#socios' },
  { label: 'Premiados', href: '#premiados' },
  { label: 'Contacto', href: '#contacto' },
]

const categories = ['Gastronomía', 'Comercio', 'Salud', 'Belleza', 'Industria']

const companiesByCategory: Record<string, Array<{ name: string; logo: string; url: string }>> = {
  Gastronomía: [
    { name: 'Restaurante El Buen Sabor', logo: 'https://via.placeholder.com/150x80?text=El+Buen+Sabor', url: 'https://example.com' },
    { name: 'Café Central', logo: 'https://via.placeholder.com/150x80?text=Cafe+Central', url: 'https://example.com' },
    { name: 'La Parrilla del Valle', logo: 'https://via.placeholder.com/150x80?text=Parrilla+Valle', url: 'https://example.com' },
  ],
  Comercio: [
    { name: 'Supermercado San Juan', logo: 'https://via.placeholder.com/150x80?text=Super+San+Juan', url: 'https://example.com' },
    { name: 'Tienda El Centro', logo: 'https://via.placeholder.com/150x80?text=Tienda+Centro', url: 'https://example.com' },
    { name: 'Boutique Moda', logo: 'https://via.placeholder.com/150x80?text=Boutique+Moda', url: 'https://example.com' },
  ],
  Salud: [
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
    { name: 'Industrias San Juan', logo: 'https://via.placeholder.com/150x80?text=Industrias+SJ', url: 'https://example.com' },
    { name: 'Manufacturas del Valle', logo: 'https://via.placeholder.com/150x80?text=Manufacturas', url: 'https://example.com' },
    { name: 'Tecnología Industrial', logo: 'https://via.placeholder.com/150x80?text=Tec+Industrial', url: 'https://example.com' },
  ],
}

const recognitionHighlights = [
  {
    title: 'Prestigio Empresarial',
    quote: '“Hace más de 20 años que premiamos la excelencia”',
    copy:
      'Cada año elevamos la vara junto a las empresas sanjuaninas que impulsan empleo, innovación y desarrollo sostenible para la provincia.',
    images: [
      'public/premios1.jpg',
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  {
    title: '¿Por qué lo hacemos?',
    quote: '“Nuestros Socios Empresarios celebran el reconocimiento”',
    copy:
      'Acompañamos a líderes que inspiran con buenas prácticas, impacto social y visión de futuro. El premio es una plataforma para amplificar su voz.',
    images: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1400&q=80',
    ],
  },
]

const partnerMarks = ['FF', 'INPI', 'AE', 'PM', 'RS']

const ceremonyImages = [
  '/banner1.png',
  '/banner2.png',
  '/banner3.png',
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
    const target = document.querySelector<HTMLElement>(href)
    if (!target) return
    smoothScrollTo(target, 1500)
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
          <h1>Mérito Empresarial 2026</h1>
          <div className="hero__actions">
            <button className="btn btn--primary">
              Aprende más sobre el Premio Mérito Empresarial
            </button>
          </div>
        </div>
      </section>

      {/* 🔥 Trigger que controla el cambio de nav */}
      <div id="nav-trigger" style={{ height: '1px' }}></div>

      <main>
        <section className="trust">
          <img src="/inpi_refacto.png" alt="INPI" className="trust__logo" />
        </section>

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
              <span className="highlight__meta">Más de 20 años de historia</span>
            </div>
            <div className="highlight__image">
              {highlight.images.map((image, imageIndex) => (
                <img
                  key={image}
                  src={image}
                  alt={highlight.title}
                  loading="lazy"
                  className={activeImages[index] === imageIndex ? 'is-active' : ''}
                />
              ))}
              <span className="caption">
                Colaboradores distinguidos — {index === 0 ? '2026' : '2025'}
              </span>
            </div>
          </section>
        ))}

        <section className="ceremony-banner">
          {ceremonyImages.map((image, idx) => (
            <img
              key={image}
              src={image}
              alt="Ceremonia de premiación"
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
                <img src={company.logo} alt={company.name} />
              </a>
            ))}
          </div>
        </section>

        <section className="partners">
          <p className="partners__eyebrow">Respaldado por</p>
          <div className="partners__marks">
            {partnerMarks.map((mark) => (
              <span key={mark}>{mark}</span>
            ))}
          </div>
        </section>

      </main>

      <section className="contact" id="contacto">
        <div className="contact__card">
          <p className="contact__eyebrow">Mérito Empresarial 2026</p>
          <h3>Fundación Mérito</h3>
          <p>
            Únete a la red de líderes que transforman la economía sanjuanina
            con innovación y propósito.
          </p>
          <ul>
            <li>Tel: (0264) 422-2250</li>
            <li>Email: premioalmerito@merito.com.ar</li>
            <li>San Juan, Argentina</li>
          </ul>
          <div className="contact__social">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
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
            <span>Desarrollado por Soft Tech Solutions 2026</span>
          </div>
        </div>
        <nav className="footer__links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
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
    </div>
  )
}

export default App

