# `create-preact`

<h2 align="center">
  <img height="256" width="256" src="./src/assets/preact.svg">
</h2>

<h3 align="center">Get started using Preact and Vite!</h3>

## Getting Started

This project uses **Bun** for faster package management and script execution.

### Prerequisites

- [Bun](https://bun.sh) installed on your system

### Development Commands

- `bun install` - Install dependencies with Bun
- `bun run dev` - Starts a dev server at http://localhost:5173/
- `bun run build` - Builds for production, emitting to `dist/`
- `bun run preview` - Starts a server at http://localhost:4173/ to test production build locally
- `bun start` - Alias for `bun run dev`

### Deployment

This project is optimized for **Cloudflare Pages** deployment:

- Build command: `bun run build`
- Output directory: `dist`
- Automatic deployments via GitHub integration
