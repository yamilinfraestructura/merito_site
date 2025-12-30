export const PoliticaCookies = () => {
    return (
        <div className="cookie-policy">
            <div className="cookie-policy__container">
                <h1>Política de Cookies</h1>
                <p className="cookie-policy__intro">
                    Esta Política de Cookies explica qué son las cookies, cómo las usamos en
                    nuestro sitio web y cómo puedes gestionarlas.
                </p>

                <section className="cookie-policy__section">
                    <h2>¿Qué son las cookies?</h2>
                    <p>
                        Las cookies son pequeños archivos de texto que se almacenan en tu
                        navegador cuando visitas un sitio web. Permiten que el sitio recuerde
                        información sobre tu visita, como tus preferencias y acciones.
                    </p>
                </section>

                <section className="cookie-policy__section">
                    <h2>¿Qué cookies utilizamos?</h2>

                    <div className="cookie-policy__table">
                        <h3>Cookies Esenciales</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Propósito</th>
                                    <th>Duración</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>merito_cookie_consent</td>
                                    <td>
                                        Guarda tu preferencia sobre el uso de cookies para no
                                        volver a preguntarte en futuras visitas.
                                    </td>
                                    <td>1 año</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="cookie-policy__table">
                        <h3>Cookies de Análisis</h3>
                        <p className="cookie-policy__note">
                            Estas cookies solo se activan si aceptas su uso.
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Propósito</th>
                                    <th>Duración</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>_ga</td>
                                    <td>
                                        Google Analytics: distingue visitantes únicos y recopila
                                        estadísticas sobre el uso del sitio.
                                    </td>
                                    <td>2 años</td>
                                </tr>
                                <tr>
                                    <td>_ga_*</td>
                                    <td>
                                        Google Analytics 4: almacena el estado de sesión y recopila
                                        datos analíticos.
                                    </td>
                                    <td>2 años</td>
                                </tr>
                                <tr>
                                    <td>_gid</td>
                                    <td>
                                        Google Analytics: distingue visitantes y almacena información
                                        sobre cómo usas el sitio.
                                    </td>
                                    <td>24 horas</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="cookie-policy__section">
                    <h2>¿Por qué usamos cookies?</h2>
                    <p>Utilizamos cookies para:</p>
                    <ul>
                        <li>Recordar tu consentimiento sobre el uso de cookies</li>
                        <li>
                            Analizar el tráfico del sitio y mejorar nuestros servicios (con
                            tu permiso)
                        </li>
                        <li>
                            Entender qué contenido es más relevante para nuestros visitantes
                        </li>
                        <li>Mejorar la experiencia del usuario en futuras visitas</li>
                    </ul>
                </section>

                <section className="cookie-policy__section">
                    <h2>Tus derechos</h2>
                    <p>Tienes derecho a:</p>
                    <ul>
                        <li>Aceptar o rechazar cookies no esenciales</li>
                        <li>Cambiar tus preferencias en cualquier momento</li>
                        <li>Eliminar las cookies almacenadas en tu navegador</li>
                    </ul>
                    <p>
                        Puedes gestionar las cookies directamente desde la configuración de
                        tu navegador. Ten en cuenta que bloquear algunas cookies puede
                        afectar la funcionalidad del sitio.
                    </p>
                </section>

                <section className="cookie-policy__section">
                    <h2>Google Analytics</h2>
                    <p>
                        Utilizamos Google Analytics 4 para recopilar información anónima
                        sobre cómo los visitantes usan nuestro sitio. Esta información nos
                        ayuda a mejorar el contenido y la experiencia del usuario.
                    </p>
                    <p>
                        Google Analytics recopila información como:
                    </p>
                    <ul>
                        <li>Páginas visitadas</li>
                        <li>Tiempo pasado en el sitio</li>
                        <li>Ubicación geográfica aproximada (país/ciudad)</li>
                        <li>Tipo de dispositivo y navegador</li>
                        <li>Fuente de tráfico (cómo llegaste al sitio)</li>
                    </ul>
                    <p>
                        Esta información se recopila de forma anónima y no puede usarse para
                        identificarte personalmente. Las direcciones IP se anonimizan para
                        proteger tu privacidad.
                    </p>
                    <p>
                        Para más información sobre cómo Google usa los datos, visita:{' '}
                        <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Política de Privacidad de Google
                        </a>
                    </p>
                </section>

                <section className="cookie-policy__section">
                    <h2>Cómo gestionar cookies</h2>
                    <p>Puedes controlar las cookies de varias formas:</p>

                    <h3>En nuestro sitio</h3>
                    <p>
                        Limpia las cookies de tu navegador y vuelve a visitar el sitio. El
                        banner de consentimiento aparecerá nuevamente y podrás cambiar tu
                        elección.
                    </p>

                    <h3>En tu navegador</h3>
                    <p>
                        Todos los navegadores modernos permiten gestionar cookies. Consulta
                        la ayuda de tu navegador para más información:
                    </p>
                    <ul>
                        <li>
                            <a
                                href="https://support.google.com/chrome/answer/95647"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Google Chrome
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Mozilla Firefox
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Safari
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Microsoft Edge
                            </a>
                        </li>
                    </ul>
                </section>

                <section className="cookie-policy__section">
                    <h2>Contacto</h2>
                    <p>
                        Si tienes preguntas sobre nuestra Política de Cookies, puedes
                        contactarnos:
                    </p>
                    <ul>
                        <li>Email: premioalmerito@merito.com.ar</li>
                        <li>Teléfono: (0264) 422-2250</li>
                        <li>Dirección: San Juan, Argentina</li>
                    </ul>
                </section>

                <section className="cookie-policy__section">
                    <p className="cookie-policy__updated">
                        <strong>Última actualización:</strong> Diciembre 2025
                    </p>
                </section>
            </div>
        </div>
    )
}
