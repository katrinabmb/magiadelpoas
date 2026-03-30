/* eslint-disable react/prop-types */
import { useMemo, useRef, useState } from "react"
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

const formatISOToReadable = (isoDate) => {
  if (!isoDate) return ""
  // Keep it simple & consistent with the native input value (YYYY-MM-DD).
  return isoDate
}

const clampInt = (value, min, max) => Math.min(max, Math.max(min, value))

const DateField = ({ label, value, onChange }) => {
  const inputRef = useRef(null)

  const openPicker = () => {
    const el = inputRef.current
    if (!el) return
    // Chrome/Edge support showPicker; fallback to focus/click.
    if (el.showPicker) el.showPicker()
    el.focus()
    el.click()
  }

  return (
    <Box className="barra-reservaField barra-reservaField--clickable" onClick={openPicker}>
      <CalendarMonthOutlinedIcon className="barra-reservaIcon" />
      <Box className="barra-reservaFieldText">
        <Typography className="barra-reservaHint">Selecciona Fecha</Typography>
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
        aria-label={label}
      />
    </Box>
  )
}

const BarraReserva = () => {
  const baseUrl = import.meta.env.BASE_URL
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

  const handleExplore = () => {
    // Placeholder for navigation or search action
  }

  return (
    <Stack className="barra-reserva" alignItems="center">
      <Box className="barra-reservaCard">
        <DateField label="Check In" value={checkIn} onChange={setCheckIn} />
        <Divider className="barra-reservaDivider" orientation="vertical" flexItem />
        <DateField label="Check Out" value={checkOut} onChange={setCheckOut} />
        <Divider className="barra-reservaDivider" orientation="vertical" flexItem />

        <Box
          className="barra-reservaField barra-reservaField--clickable"
          onClick={(e) => setRoomsAnchor(e.currentTarget)}
          role="button"
          tabIndex={0}
        >
          <BedOutlinedIcon className="barra-reservaIcon" />
          <Box className="barra-reservaFieldText">
            <Typography className="barra-reservaHint">Selecciona Cabaña</Typography>
            <Typography className="barra-reservaMain">{roomsLabel}</Typography>
          </Box>
          <KeyboardArrowDownIcon className="barra-reservaArrow" />
        </Box>

        <Divider className="barra-reservaDivider" orientation="vertical" flexItem />

        <Box
          className="barra-reservaField barra-reservaField--clickable"
          onClick={(e) => setGuestsAnchor(e.currentTarget)}
          role="button"
          tabIndex={0}
        >
          <PersonOutlineIcon className="barra-reservaIcon" />
          <Box className="barra-reservaFieldText">
            <Typography className="barra-reservaHint">Huespedes</Typography>
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
            EXPLORAR
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
