import { Box, Button, Stack, Typography } from "@mui/material"

const BannerPrincipal = () => {
  return (
<Stack className="banner-principal" justifyContent="center" alignItems="flex-start">
<Box className="banner-overlay"/>

<Stack className="banner-content" spacing={-1}>
  <Typography className="banner-subtitle">Vive la experiencia de la montaña</Typography>
  <Stack spacing={-8}>
  <Typography className="banner-title">Descubre la</Typography>
  <Typography className="banner-title">Magia del Poás</Typography>
  </Stack>

  <Button className="btnBP-booking">
    Reservar
    <img src="/images/arrowBTN.svg" alt="arrow right" className="arrowBTN" />
    </Button>
</Stack>




</Stack>
  )
}

export default BannerPrincipal
