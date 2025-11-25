import { useEffect } from 'react'

interface VideoModalProps {
    isOpen: boolean
    onClose: () => void
    videoId: string
}

export function VideoModal({ isOpen, onClose, videoId }: VideoModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    console.log('VideoModal - isOpen:', isOpen)

    if (!isOpen) return null

    return (
        <div className="video-modal-overlay" onClick={onClose}>
            <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="video-modal-close" onClick={onClose} aria-label="Cerrar modal">
                    ✕
                </button>

                <div className="video-modal-header">
                    <h2>Historia del Premio Mérito Empresarial</h2>
                    <p>Conoce nuestra trayectoria premiando la excelencia empresarial en San Juan</p>
                </div>

                <div className="video-modal-video-container">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                        title="Historia del Premio Mérito Empresarial"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                <div className="video-modal-body">
                    <h3>Excelencia Empresarial</h3>
                    <p>
                        Desde su creación, el <strong>Premio Mérito Empresarial</strong> se ha consolidado como el máximo
                        reconocimiento provincial a la excelencia en el mundo empresarial sanjuanino.
                    </p>
                    <p>
                        Cada edición celebra a las empresas que impulsan el empleo, la innovación y el desarrollo
                        sostenible, siendo un pilar fundamental para la economía de San Juan.
                    </p>
                    <p>
                        Acompañamos a líderes que inspiran con buenas prácticas, impacto social y visión de futuro.
                        Este premio es una plataforma para amplificar su voz y reconocer su invaluable aporte a la comunidad.
                    </p>

                    <div className="video-modal-stats">
                        <div className="video-modal-stat">
                            <span className="stat-number">4</span>
                            <span className="stat-label">Ediciones</span>
                        </div>
                        <div className="video-modal-stat">
                            <span className="stat-number">100+</span>
                            <span className="stat-label">Empresas Premiadas</span>
                        </div>
                        <div className="video-modal-stat">
                            <span className="stat-number">5</span>
                            <span className="stat-label">Categorías</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
