import { Grid, Stack, Typography } from "@mui/material"
import { useContext } from "react"
import { LanguageContext } from "../LanguageProvider"

const RestInfo = () => {
  const baseUrl = import.meta.env.BASE_URL
  const { translation } = useContext(LanguageContext)
  const restinfo = [
    {
      id: 1,
      title: translation?.listS3[0]?.title,
    },
    {
      id: 2,
      title: translation?.listS3[1]?.title,
    },
    {
      id: 3,
      title: translation?.listS3[2]?.title,
    },
    {
      id: 4,
      title: translation?.listS3[3]?.title,
    },
    {
      id: 5,
      title: translation?.listS3[4]?.title,
    },
    {
      id: 6,
      title: translation?.listS3[5]?.title,
    },
  ]

  return (
<Stack direction="row" justifyContent="space-evenly" alignItems="center" className="restinfo-container">

  <img src={`${baseUrl}images/restaurante.svg`} alt="restinfo" className="restinfo-image"/>

  <Stack className="restinfo-content" spacing={2} alignItems="flex-start" justifyContent="center">
    <Typography className="restinfo-title">{translation?.subtitleS3}</Typography>
    <Typography className="restinfo-subtitle">{translation?.titleS3}</Typography>
    <Typography className="restinfo-text">{translation?.textS3}</Typography>

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
