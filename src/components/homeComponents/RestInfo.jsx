import { Grid, Stack, Typography } from "@mui/material"

const RestInfo = () => {
  const baseUrl = import.meta.env.BASE_URL

  const restinfo = [
    {
      id: 1,
      title: "Comida gourmet",
    },
    {
      id: 2,
      title: "Variedad de platos",
    },
    {
      id: 3,
      title: "Siempre fresco y delicioso",
    },
    {
      id: 4,
      title: "Ambiente acogedor",
    },
    {
      id: 5,
      title: "Servicio personalizado",
    },
    {
      id: 6,
      title: "Pet-friendly",
    },
  ]

  return (
<Stack direction="row" justifyContent="space-evenly" alignItems="center" className="restinfo-container">

  <img src={`${baseUrl}images/restaurante.svg`} alt="restinfo" className="restinfo-image"/>

  <Stack className="restinfo-content" spacing={2} alignItems="flex-start" justifyContent="center">
    <Typography className="restinfo-title">Restaurante y experiencia unica</Typography>
    <Typography className="restinfo-subtitle">Almuerzos y cenas con sabor local y frescura</Typography>
    <Typography className="restinfo-text">Disfruta una propuesta cuidada, con opciones para compartir, platos bien ejecutados. Cocinamos con producto fresco, atención al detalle y un ambiente acogedor para que tu visita se sienta especial.</Typography>

    <Grid container spacing={2} className="restinfo-list">
      {restinfo.map((item) => (
        <Grid item key={item.id} className="restinfo-list-item">
          <img src={`/images/check.svg`} alt="check" className="restinfo-list-item-image"/>
          <Typography className="restinfo-list-text">{item.title}</Typography>
        </Grid>
      ))}

    </Grid>
  </Stack>

</Stack>
  )
}

export default RestInfo
