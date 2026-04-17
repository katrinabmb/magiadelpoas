/* eslint-disable react/prop-types */
import { useContext, useMemo, useRef, useState } from "react"
import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import BedOutlinedIcon from "@mui/icons-material/BedOutlined"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { LanguageContext } from "../LanguageProvider"

const formatISOToReadable = (isoDate) => {
  if (!isoDate) return ""
  // Keep it simple & consistent with the native input value (YYYY-MM-DD).
  return isoDate
}

const clampInt = (value, min, max) => Math.min(max, Math.max(min, value))

const DateField = ({ label, value, onChange }) => {
  const { translation } = useContext(LanguageContext)
  const inputRef = useRef(null)

  const openPicker = () => {
    const el = inputRef.current
    if (!el) return
    // Some browsers require strict user gesture; never crash if blocked.
    el.focus()
    try {
      if (el.showPicker) el.showPicker()
    } catch {
      // If not allowed, the native input click/interaction will still work.
    }
    // Fallback for browsers without showPicker (or when blocked).
    try {
      el.click()
    } catch {
      // ignore
    }
  }

  return (
    <Box className="barra-reservaField barra-reservaField--clickable" onClick={openPicker}>
      <CalendarMonthOutlinedIcon className="barra-reservaIcon" />
      <Box className="barra-reservaFieldText">
        <Typography className="barra-reservaHint">{translation?.fecha}</Typography>
        <Typography className="barra-reservaMain">
          {value ? formatISOToReadable(value) : label}
        </Typography>
      </Box>
      <KeyboardArrowDownIcon className="barra-reservaArrow" />
      <input
        ref={inputRef}
        className="barra-reservaNativeInput"
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => {
          // Ensure this doesn't re-trigger the container click handler.
          e.stopPropagation()
          // If supported, call showPicker from the input's own user click.
          try {
            if (e.currentTarget.showPicker) e.currentTarget.showPicker()
          } catch {
            // ignore
          }
        }}
        aria-label={label}
      />
    </Box>
  )
}

const BarraReserva = () => {
  const baseUrl = import.meta.env.BASE_URL
  const { translation } = useContext(LanguageContext)

  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [cabin, setCabin] = useState("")
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)

  const [roomsAnchor, setRoomsAnchor] = useState(null)
  const [guestsAnchor, setGuestsAnchor] = useState(null)

  const cabinOptions = useMemo(
    () => [
      "Antia",
      "Lilliam",
      "Luna",
      "Roble escondido",
      "Domo",
      "Colima",
      "Sky",
      "Domo deluxe",
    ],
    []
  )

  const roomsLabel = useMemo(() => cabin || "Cabaña", [cabin])
  const guestsLabel = useMemo(() => `${adults} adult, ${children} child`, [adults, children])

  const handleExplore = (e) => {
    e?.preventDefault?.()
    e?.stopPropagation?.()
    const directBookBaseUrl = "https://direct-book.com/properties/cabaasdemontaamagiadelpos"

    const locale = translation?.type ?? "es"
    const queryParts = [
      `locale=${encodeURIComponent(locale)}`,
      `items[0][adults]=${encodeURIComponent(String(adults))}`,
      `items[0][children]=${encodeURIComponent(String(children))}`,
      `items[0][infants]=0`,
      `currency=CRC`,
    ]

    if (checkIn) queryParts.push(`checkInDate=${encodeURIComponent(checkIn)}`)
    if (checkOut) queryParts.push(`checkOutDate=${encodeURIComponent(checkOut)}`)
    queryParts.push("trackPage=yes")

    const url = `${directBookBaseUrl}?${queryParts.join("&")}`
    window.open(url, "_blank", "noopener,noreferrer")

    // Reset fields after opening booking page
    setCheckIn("")
    setCheckOut("")
    setCabin("")
    setAdults(1)
    setChildren(0)
    setRoomsAnchor(null)
    setGuestsAnchor(null)
  }

  return (
    <Stack className="barra-reserva" alignItems="center">
      <Box className="barra-reservaCard">
        <DateField label="Check In" value={checkIn} onChange={setCheckIn} />
        <Divider className="barra-reservaDivider" orientation="vertical" flexItem />
        <DateField label="Check Out" value={checkOut} onChange={setCheckOut} />
        <Divider className="barra-reservaDivider" orientation="vertical" flexItem />

       

        <Divider className="barra-reservaDivider" orientation="vertical" flexItem />

        <Box
          className="barra-reservaField barra-reservaField--clickable"
          onClick={(e) => setGuestsAnchor(e.currentTarget)}
          role="button"
          tabIndex={0}
        >
          <PersonOutlineIcon className="barra-reservaIcon" />
          <Box className="barra-reservaFieldText">
            <Typography className="barra-reservaHint">{translation?.guests}</Typography>
            <Typography className="barra-reservaMain">{guestsLabel}</Typography>
          </Box>
          <KeyboardArrowDownIcon className="barra-reservaArrow" />
        </Box>

        <Box className="barra-reservaBtnWrap">
          <Button
            className="barra-reservaBtn"
            onClick={handleExplore}
            endIcon={<img src={`${baseUrl}images/arrowBTNW.svg`} alt="arrow right" className="arrowBTN" />}
          >
            {translation?.explore}
          </Button>
        </Box>
      </Box>

      <Menu
        anchorEl={roomsAnchor}
        open={Boolean(roomsAnchor)}
        onClose={() => setRoomsAnchor(null)}
        MenuListProps={{ "aria-label": "Cabañas" }}
      >
        {cabinOptions.map((name) => (
          <MenuItem
            key={name}
            selected={cabin === name}
            onClick={() => {
              setCabin(name)
              setRoomsAnchor(null)
            }}
          >
            {name}
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={guestsAnchor}
        open={Boolean(guestsAnchor)}
        onClose={() => setGuestsAnchor(null)}
        MenuListProps={{ "aria-label": "Guests" }}
      >
        <MenuItem disableRipple className="barra-reservaGuestsRow">
          <Typography className="barra-reservaGuestsLabel">Adults</Typography>
          <Box className="barra-reservaGuestsStepper">
            <IconButton
              size="small"
              onClick={() => setAdults((v) => clampInt(v - 1, 1, 10))}
              aria-label="Decrease adults"
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography className="barra-reservaGuestsValue">{adults}</Typography>
            <IconButton
              size="small"
              onClick={() => setAdults((v) => clampInt(v + 1, 1, 10))}
              aria-label="Increase adults"
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </MenuItem>

        <MenuItem disableRipple className="barra-reservaGuestsRow">
          <Typography className="barra-reservaGuestsLabel">Children</Typography>
          <Box className="barra-reservaGuestsStepper">
            <IconButton
              size="small"
              onClick={() => setChildren((v) => clampInt(v - 1, 0, 10))}
              aria-label="Decrease children"
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography className="barra-reservaGuestsValue">{children}</Typography>
            <IconButton
              size="small"
              onClick={() => setChildren((v) => clampInt(v + 1, 0, 10))}
              aria-label="Increase children"
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>
    </Stack>
  )
}

export default BarraReserva
