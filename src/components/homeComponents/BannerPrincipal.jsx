import { Box, Button, Stack, Typography } from "@mui/material"

const BannerPrincipal = () => {
  const baseUrl = import.meta.env.BASE_URL
  return (
<Stack
  className="banner-principal"
  justifyContent="center"
  alignItems="flex-start"
  style={{ backgroundImage: `url(${baseUrl}images/bannerprincipal.svg)` }}
>
<Box className="banner-overlay"/>

<Stack className="banner-content" spacing={-1}>
  <Typography className="banner-subtitle">Vive la experiencia de la montaña</Typography>
  <Stack spacing={-8}>
  <Typography className="banner-title">Descubre</Typography>
  <Typography className="banner-title">Magia del Poás</Typography>
  </Stack>
<br/>
  <Button className="btnBP-booking">
    Reservar
    <img src={`${baseUrl}images/arrowBTN.svg`} alt="arrow right" className="arrowBTN" />
    </Button>
</Stack>




</Stack>
  )
}

export default BannerPrincipal
