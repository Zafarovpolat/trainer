# Trainer Booking App

A full-stack React application for booking trainer sessions with a calendar interface.

## Features

- 🏋️ Trainer booking system
- 📅 Week-based calendar with date/time selection
- 🏢 Location and service selection
- 📱 Responsive design
- 🌐 Russian language interface
- ⚡ Fast performance with Vite

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **Deployment**: Vercel (serverless)
- **UI Components**: Radix UI, Lucide Icons

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck
```

## Deployment to Vercel

The app is configured for Vercel deployment with:

1. **Client-side**: Static React app served from `dist/spa/`
2. **Server-side**: API routes handled by serverless functions
3. **Configuration**: `vercel.json` handles routing and builds

### Deploy Steps:

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel will automatically detect the configuration
4. Deploy will use `npm run vercel-build`

## API Routes

- `GET /api/ping` - Health check
- `GET /api/demo` - Demo endpoint
- External APIs integrated for trainer data

## Environment Variables

```env
VITE_PUBLIC_BUILDER_KEY=your_builder_key
PING_MESSAGE=ping pong
```

## Project Structure

```
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared types/utilities
├── public/          # Static assets
├── dist/            # Build output
└── vercel.json      # Vercel configuration
