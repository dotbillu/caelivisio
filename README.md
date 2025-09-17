# 🌍 CaeliVisio - Interactive Space Visualization Platform

A cutting-edge 3D space visualization application built with Next.js and Cesium that provides real-time satellite tracking, debris monitoring, and space object management through an immersive web interface.

## 🚀 Live Demo

**[View Live Application](https://caelivisio-pi.vercel.app/)**

![Space Visualization](https://img.shields.io/badge/Space-Visualization-blue?style=for-the-badge&logo=spacex)
![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)
![Cesium](https://img.shields.io/badge/Cesium-3D%20Globe-green?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

## ✨ Features

### 🛰️ **Interactive 3D Earth Globe**
- Real-time 3D visualization powered by Cesium
- Smooth camera controls and navigation
- High-fidelity Earth rendering with atmospheric effects
- Dynamic space object rendering with color-coded visualization

### 📡 **Real-Time Space Object Tracking**
- **Satellites**: Yellow markers showing active satellite payloads from last 30 days
- **Space Stations**: Green markers displaying international space stations
- **Space Debris**: Red markers tracking Cosmos 2251 debris field
- Live data fetched from CELESTRAK orbital element sets

### 🎛️ **Advanced Control Panel**
- **Speed Control**: Adjustable simulation speed (1x to 5x multiplier)
- **Layer Toggles**:
  - Space debris visibility control
  - Space station tracking toggle
  - Satellite payload monitoring
- **Interactive UI**: Modern design with smooth animations

### 📊 **Satellite Status Dashboard**
- Real-time satellite information display
- Organized data presentation
- Responsive table layout

### 🎨 **Modern User Interface**
- Dark theme optimized for space visualization
- Responsive design with backdrop blur effects
- Custom typography with Iceland font for space aesthetics
- Smooth transitions and hover effects

## 🚀 Tech Stack

### Core Technologies
- **Frontend**: Next.js 15.5.3 with React 19
- **3D Visualization**: Cesium 1.133.1 with Resium integration
- **State Management**: Jotai for lightweight atomic state management
- **Styling**: Tailwind CSS 4 with custom theming
- **Language**: TypeScript 5.0

### Data & APIs
- **Orbital Data**: TLE.js for satellite orbit calculations
- **HTTP Client**: Axios for API requests
- **Data Sources**: CELESTRAK NORAD element sets

### Build & Development
- **Build Tool**: Webpack 5
- **Linting**: ESLint with Next.js configuration
- **Package Manager**: npm/yarn

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn package manager
- Cesium Ion access token

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/caelivisio.git
cd caelivisio
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_CESIUM_ACCESS_TOKEN=your_cesium_ion_token_here
```

> **Note**: Get your free Cesium Ion access token at [cesium.com/ion](https://cesium.com/ion)

### 4. Start Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
caelivisio/
├── src/
│   └── app/
│       ├── components/
│       │   ├── earth.tsx              # Main 3D Cesium globe component
│       │   ├── sidebar.tsx            # Control panel with speed & toggles
│       │   ├── navbar.tsx             # Navigation component
│       │   ├── right_table.tsx        # Satellite status dashboard
│       │   ├── store.ts               # Jotai state atoms
│       │   └── sidebaritems/
│       │       └── toggle.tsx         # Toggle switch components
│       ├── libs/
│       │   └── satellites.ts          # TLE data processing utilities
│       ├── globals.css                # Global styles & Tailwind config
│       ├── layout.tsx                 # Root layout component
│       └── page.tsx                   # Main application page
├── public/
│   ├── cesium/                        # Cesium static assets (auto-generated)
│   └── *.svg                          # UI icons and graphics
└── package.json
```

## 🎯 Key Components

### Earth Component (`earth.tsx`)
- Integrates Cesium 3D globe with Resium React wrapper
- Handles Cesium Ion token authentication
- Fetches real-time satellite data from CELESTRAK APIs
- Renders space objects with color-coded markers:
  - 🟡 Satellites (9px, Yellow)
  - 🟢 Space Stations (13px, Green)  
  - 🔴 Debris (5px, Red)

### Sidebar (`sidebar.tsx`)
- Speed control slider (1x-5x simulation speed)
- Toggle switches for different space object types
- State management with Jotai atoms
- Iceland font styling for space theme

### Toggle Components (`toggle.tsx`)
- **DebrisToggleComponent**: Controls space debris visibility
- **SpaceStationToggleComponent**: Manages space station display
- **PayloadToggleButton**: Toggles satellite payload visibility
- Consistent UI with custom toggle switches

### Satellite Processing (`satellites.ts`)
- Processes TLE (Two-Line Element) orbital data
- Calculates satellite positions using observer coordinates
- Converts orbital elements to Cesium-compatible coordinates
- Returns structured satellite data for 3D rendering

## 🔧 Configuration

### State Management (Jotai Atoms)
```typescript
// Speed control (1-5x multiplier)
speedAtom: atom<speedtype>(1)

// Visibility toggles
debrisstatusatom: atom<boolean>(true)
SpaceStationbodystatusatom: atom<boolean>(false)
payloadstatusatom: atom<boolean>(false)

// Satellite data storage
satelliteObjectAtom: atom<SatelliteCesiumForm[]>([])
SpaceStationObjectAtom: atom<SatelliteCesiumForm[]>([])
```

### Data Sources
- **Satellites**: `https://celestrak.org/NORAD/elements/gp.php?GROUP=last-30-days&FORMAT=tle`
- **Space Stations**: `https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=tle`
- **Debris**: `https://celestrak.org/NORAD/elements/gp.php?GROUP=cosmos-2251-debris&FORMAT=tle`

## 🌟 Features in Development

- [ ] Real-time orbital propagation
- [ ] Collision prediction algorithms
- [ ] Historical trajectory playback
- [ ] Satellite information panels
- [ ] Advanced filtering and search
- [ ] Mobile responsiveness improvements
- [ ] Performance optimizations for large datasets

## 🚀 Deployment

The application is deployed on Vercel with automatic deployments from the main branch.

**Live URL**: [https://caelivisio-gold.vercel.app/](https://caelivisio-gold.vercel.app/)

### Build Commands
```bash
# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Maintain component modularity with Jotai state management
4. Add proper error handling for API calls
5. Include JSDoc comments for complex functions
6. Test with different Cesium Ion tokens

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Cesium](https://cesium.com/) for the amazing 3D globe technology
- [Resium](https://resium.darwineducation.com/) for React-Cesium integration
- [CELESTRAK](https://celestrak.org/) for providing orbital element data
- [TLE.js](https://github.com/davidcalhoun/tle.js) for satellite orbit calculations
- [Next.js](https://nextjs.org/) for the robust React framework
- [Jotai](https://jotai.org/) for atomic state management
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

## 📞 Support

If you have any questions or need help with the project, please open an issue on GitHub.

---

**Built with ❤️ for the space exploration community**

*Visualizing the cosmos, one satellite at a time* 🛰️✨
