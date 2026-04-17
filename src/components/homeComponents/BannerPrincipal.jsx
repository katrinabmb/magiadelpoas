import { Box, Stack, Typography } from "@mui/material"
import { useContext } from "react"
import { LanguageContext } from "../LanguageProvider"

const BannerPrincipal = () => {
  const baseUrl = import.meta.env.BASE_URL
  const { translation } = useContext(LanguageContext)
  return (
<Stack
  className="banner-principal"
  justifyContent="center"
  alignItems="flex-start"
  style={{ backgroundImage: `url(${baseUrl}images/bannerprincipal.svg)` }}
>
<Box className="banner-overlay"/>

<Stack className="banner-content" spacing={-1}>
  <Typography className="banner-subtitle">{translation?.subtitle}</Typography>
  <Stack spacing={-8}>
  <Typography className="banner-title">{translation?.title}</Typography>
  <Typography className="banner-title">{translation?.title2}</Typography>
  </Stack>
<br/>
  <a href="#reservar" className="btnBP-booking">
    {translation?.buttonHome}
    <img src={`${baseUrl}images/arrowBTN.svg`} alt="arrow right" className="arrowBTN" />
    </a>
</Stack>




</Stack>
  )
}

export default BannerPrincipal
