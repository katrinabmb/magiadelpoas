import { Avatar, Divider, Rating, Stack, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"

const PAGE_SIZE = 3
const AUTOPLAY_MS = 6500

const getInitials = (name = "") => {
    const cleaned = name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()

    if (!cleaned) return "?"

    const parts = cleaned.split(/\s+/).filter(Boolean).slice(0, 2)
    const initials = parts
        .map((p) => (p.match(/[A-Za-z0-9]/)?.[0] ?? ""))
        .join("")
        .toUpperCase()

    return initials || "?"
}

const TestimoniosCard = ({ texto, nombre, plataforma, rating, icon }) => {
    const baseUrl = import.meta.env.BASE_URL
    const iconSrc = icon?.startsWith("/") ? `${baseUrl}${icon.slice(1)}` : icon
    return (
        <Stack className="testimonios-card" spacing={3} alignItems="center" justifyContent="center">
            <Typography className="testimonios-card-texto">&quot;{texto}&quot;</Typography>
            <Divider className="testimonios-card-divider" />
            <Stack direction="row" alignItems="center" justifyContent="space-between"sx={{ width: "90%" }}>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                <Avatar className="testimonios-avatar" alt={nombre}>
                    {getInitials(nombre)}
                </Avatar>
                <Stack spacing={0.5} justifyContent="flex-start" alignItems="flex-start">
                    <Typography className="testimonios-card-nombre">{nombre}</Typography>
                    <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1}>
                        <img src={iconSrc} alt={plataforma} className="testimonios-card-icon" />
                    <Typography className="testimonios-card-plataforma">{plataforma}</Typography>
                    </Stack>
                    
                </Stack>

                </Stack>
                <Rating value={rating} readOnly size="small" />
            </Stack>
        </Stack>
    )
}

TestimoniosCard.propTypes = {
    texto: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    plataforma: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
}

const TESTIMONIOS = [
    {
        id: 1,
        texto: "Un lugar increíble. La habitación espectacular, un ambiente relajante y tranquilo, el servicio excelente y muy claras las indicaciones. Serviciales, la decoración en la habitación les quedó hermosa y Justo como lo solicité. Me encantó y definitivamente regreso! Gracias 🥰",
        nombre: "Carol Gonzalez",
        plataforma: "Google",
        rating: 5,
        icon: "/images/google.svg",
    },
    {
        id: 2,
        texto: "Un lugar espectacular. Estuvimos hospedados en la cabaña Deluxe Luna. Un diseño cálido, privado, lujoso y acogedor. Lleno de detalles, juegos de mesa, chimenea, todo limpio y oliendo rico. Un 100 de 100",
        nombre: "Esteban Quesada",
        plataforma: "Google",
        rating: 5,
        icon: "/images/google.svg",
    },
    {
        id: 3,
        texto: "Nos encantó este lugar, es seguro, accesible en cualquier vehículo, diseño interior de ensueño y rodeado por animales de granja, senderos y un clima impresionante. Las vistas son hermosas desde la habitación y además cuentan con todo lo necesario para cocinar.",
        nombre: "Natalia Solano",
        plataforma: "Google",
        rating: 5,
        icon: "/images/google.svg",
    },
    {
        id: 4,
        texto: "100% recomendadas, sus instalaciones son impecables y ordenadas, se respira un ambiente de paz y trankilidad, un lugar 100% recomendado para espacar de la rutina y cuentan con un restaurante con excelente servicio y comida deliciosa.",
        nombre: "Grettel Hernández",
        plataforma: "Google",
        rating: 5,
        icon: "/images/google.svg",
    },
    {
        id: 5,
        texto: "Vinimos a almorzar y volvimos para un evento de vinos. La comida y el servicio son excelentes; sin duda, volveremos con frecuencia. Los dueños son encantadores y muy acogedores.",
        nombre: "J.P",
        plataforma: "Google",
        rating: 5,
        icon: "/images/google.svg",
    },
    {
        id: 6,
        texto: "Muy espacioso con gran vista al valle central. Es cómodo y acogedor. Buena seguridad. Ideal para ir con pareja o amigos. Me gusto mucho las areas verdes y los ambientes de terraza y balcón.",
        nombre: "Mathiws Marin",
        plataforma: "Google",
        rating: 5,
        icon: "/images/google.svg",
    },
    {
        id: 7,
        texto: "La cabaña Roble Escondido es hermosa, la encontramos muy comfortable y equipada con todo lo necesario, una experiencia muy agradable y amena. La pasamos muy bien.",
        nombre: "Tiffany Chavarría",
        plataforma: "Google",
        rating: 5,
        icon: "/images/google.svg",
    },
    {
        id: 8,
        texto: "Sin duda el mejor lugar para alojarse cerca de Volcán Poas! Alojamiento de lujo y rústico con vistas excepcionales y el mejor personal de la historia! Las habitaciones eran muy cómodas y limpias, puedo decir que todo este lodge es una joya escondida en el corazón de Poas Costa Rica!",
        nombre: "Davina S",
        plataforma: "TripAdvisor",
        rating: 5,
        icon: "/images/tripadvisor.svg",
    },
    {
        id: 9,
        texto: "Quedamos sumamente enamorados de este lugar tan pintoresco y bello, con hermosas vistas y una decoracion inigualable, la atencion por parte de la Host Ariana fue espectacular, desde inicio a fin. Lugar que recordaremos con mucho cariño, esperamos volver pronto!",
        nombre: "Flora R",
        plataforma: "TripAdvisor",
        rating: 5,
        icon: "/images/tripadvisor.svg",
    },
]

const Testimonios = () => {
    const pages = useMemo(() => {
        const out = []
        for (let i = 0; i < TESTIMONIOS.length; i += PAGE_SIZE) {
            out.push(TESTIMONIOS.slice(i, i + PAGE_SIZE))
        }
        return out
    }, [])

    const pageCount = pages.length

    const slides = useMemo(() => {
        if (pageCount <= 1) return pages
        return [pages[pageCount - 1], ...pages, pages[0]]
    }, [pageCount, pages])

    const [slideIdx, setSlideIdx] = useState(pageCount > 1 ? 1 : 0) // 0..(pageCount+1) when looping
    const [transitionOn, setTransitionOn] = useState(true)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        // Reset if page count changes (responsive data, etc.)
        setTransitionOn(false)
        setSlideIdx(pageCount > 1 ? 1 : 0)
        const id = requestAnimationFrame(() => setTransitionOn(true))
        return () => cancelAnimationFrame(id)
    }, [pageCount])

    useEffect(() => {
        if (isPaused) return
        if (pageCount <= 1) return

        const id = setInterval(() => {
            setSlideIdx((s) => {
                // If we're currently at the "end clone", wait for transitionEnd snap
                if (s >= pageCount + 1) return s
                return s + 1
            })
        }, AUTOPLAY_MS)

        return () => clearInterval(id)
    }, [isPaused, pageCount])

    const snapTo = (idx) => {
        setTransitionOn(false)
        setSlideIdx(idx)
        // Re-enable transition on the next paint so future moves animate.
        requestAnimationFrame(() => requestAnimationFrame(() => setTransitionOn(true)))
    }

    const handleTransitionEnd = () => {
        if (pageCount <= 1) return
        if (slideIdx === pageCount + 1) snapTo(1) // moved onto the "first clone" (at the end)
        if (slideIdx === 0) snapTo(pageCount) // moved onto the "last clone" (at the start)
    }

    const activePageIdx = pageCount <= 1 ? 0 : (slideIdx - 1 + pageCount) % pageCount

  return (
<Stack className="testimonios-container" spacing={4} alignItems="center" justifyContent="center">
    <Typography className="testimonios-title">Historias de inolvidables momentos</Typography>
    <Typography className="testimonios-subtitle">Conoce las experiencias de<br/>nuestros visitantes</Typography>
    <div
        className="testimonios-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
    >
        <div
            className="testimonios-track"
            onTransitionEnd={handleTransitionEnd}
            style={{
                transform: `translateX(-${slideIdx * 100}%)`,
                transition: transitionOn ? undefined : "none",
            }}
        >
            {slides.map((page, idx) => (
                <div className="testimonios-page" key={`testimonios-page-${idx}`}>
                    {page.map((t) => (
                        <div className="testimonios-item" key={t.id}>
                            <TestimoniosCard
                                texto={t.texto}
                                nombre={t.nombre}
                                plataforma={t.plataforma}
                                rating={t.rating}
                                icon={t.icon}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>

    {pages.length > 1 && (
        <div className="testimonios-dots" role="tablist" aria-label="Paginación de testimonios">
            {pages.map((_, idx) => {
                const isActive = idx === activePageIdx
                return (
                    <button
                        key={`testimonios-dot-${idx}`}
                        type="button"
                        className={`testimonios-dot ${isActive ? "is-active" : ""}`}
                        onClick={() => setSlideIdx(idx + 1)}
                        aria-label={`Ir a la página ${idx + 1} de testimonios`}
                        aria-current={isActive ? "true" : undefined}
                    />
                )
            })}
        </div>
    )}
</Stack>
  )
}

export default Testimonios
