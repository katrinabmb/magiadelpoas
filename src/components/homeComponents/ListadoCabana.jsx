/* eslint-disable react/prop-types */
import { Box, Button, Stack, Typography } from "@mui/material"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useRef, useState } from "react";


const CardCabana = ({ title, url, image, index }) => {
  const baseUrl = import.meta.env.BASE_URL
  const imageSrc = image?.startsWith("/") ? `${baseUrl}${image.slice(1)}` : image
  return (
    <Stack className="listado-cabana-card" spacing={1} style={{ "--i": index }}>
      <Box style={{backgroundImage: `url(${imageSrc})`}} className="listado-cabana-card-image" />
      <Stack direction="row" justifyContent="space-between" alignItems="center" style={{padding: '0 0.5rem'}}>
        <Typography className="listado-cabana-card-title">{title}</Typography>
        <Button className="listado-cabana-card-button" href={url}><ArrowForwardIcon sx={{ fontSize: 20, color: '#000' }} /></Button>
      </Stack>
    </Stack>
  )
}

const ListadoCabana = () => {
  const [isActive, setIsActive] = useState(false);
  const cardsRef = useRef(null);
  const activeRef = useRef(false);

const cabanas = [
  {
    id: 7,
    title: "Antia",
    url: "#",
    image: "/images/antia.svg",
  },
  {
    id: 4,
    title: "Lilliam",
    url: "#",
    image: "/images/liliam.svg",
  },
  {
    id: 3,
    title: "Luna",
    url: "#",
    image: "/images/luna.svg",
  },
  {
    id: 2,
    title: "Roble Escondido",
    url: "#",
    image: "/images/robleescondido.svg",
  },
  {
    id: 5,
    title: "Domo",
    url: "#",
    image: "/images/domo.svg",
  },
  {
    id: 8,
    title: "Colima",
    url: "#",
    image: "/images/colima.svg",
  },
  {
    id: 1,
    title: "Sky",
    url: "#",
    image: "/images/sky.svg",
  },
  {
    id: 6,
    title: "Domo Deluxe",
    url: "#",
    image: "/images/domodeluxe.svg",
  },

];

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        // Hysteresis to avoid flicker near the threshold
        if (!activeRef.current && entry.intersectionRatio >= 0.35) {
          activeRef.current = true;
          setIsActive(true);
          return;
        }

        if (activeRef.current && entry.intersectionRatio <= 0.05) {
          activeRef.current = false;
          setIsActive(false);
        }
      },
      {
        threshold: [0, 0.05, 0.35],
        rootMargin: "0px 0px -10% 0px",
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);



  return (
<Stack className="listado-cabana-container" alignItems="center" spacing={8}>

  <Stack className="listado-cabana-content-text" alignItems="center">
    <Typography className="listado-cabana-subtitle">Creando momentos inolvidables</Typography>
    <Typography className="listado-cabana-title">Nuestra mision es crear experiencias inolvidables para ti</Typography>
  </Stack>

  <Stack
    ref={cardsRef}
    direction="row"
    className={`listado-cabana-content-cards ${isActive ? "is-active" : ""}`}
    justifyContent="center"
    alignItems="center"
    spacing={0}
  >

    {cabanas.map((cabana, index) => (
      <CardCabana key={cabana.id} {...cabana} index={index} />
    ))}

  </Stack>

</Stack>
  )
}

export default ListadoCabana
