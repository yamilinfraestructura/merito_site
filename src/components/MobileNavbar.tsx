import { useState } from 'react'

interface NavLink {
  label: string
  href: string
}

interface MobileNavbarProps {
  navLinks: NavLink[]
  onNavClick: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}

export const MobileNavbar = ({ navLinks, onNavClick }: MobileNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setIsOpen(false)
    onNavClick(event, href)
  }

  return (
    <header className="mobile-nav">
      <div className="mobile-nav__inner">
        <div className="mobile-nav__logo">
          <img
            src="/logo_prestigio2.png"
            alt="Fundación Mérito"
            className="mobile-nav__logo-img"
          />
          <span className="mobile-nav__org-name">PREMIO MÉRITO EMPRESARIAL</span>
        </div>
        <button
          type="button"
          className={`mobile-nav__toggle ${isOpen ? 'is-open' : ''}`}
          onClick={handleToggle}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <nav className={`mobile-nav__menu ${isOpen ? 'is-open' : ''}`}>
        <div className="mobile-nav__menu-inner">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleLinkClick(event, link.href)}
              className="mobile-nav__link"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
      {isOpen && (
        <div
          className="mobile-nav__overlay"
          onClick={handleToggle}
          aria-hidden="true"
        />
      )}
    </header>
  )
}

