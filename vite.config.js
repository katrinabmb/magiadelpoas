import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // GitHub Pages (Project Site): https://<user>.github.io/<repo>/
  // Si tu repo NO se llama "magiadelpoas", cambia este valor.
  base: mode === "production" ? "/magiadelpoas/" : "/",
  plugins: [react()],
}))
