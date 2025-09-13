# 🌍 CaeliVisio - Interactive Space Visualization Platform

A cutting-edge 3D space visualization application built with Next.js and Cesium that provides real-time satellite tracking, debris monitoring, and space object management through an immersive web interface.

![Space Visualization](https://img.shields.io/badge/Space-Visualization-blue?style=for-the-badge&logo=spacex)
![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)
![Cesium](https://img.shields.io/badge/Cesium-3D%20Globe-green?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

## ✨ Features

### 🛰️ **Interactive 3D Earth Globe**
- Real-time 3D visualization powered by Cesium
- Smooth camera controls and navigation
- High-fidelity Earth rendering with atmospheric effects

### 📊 **Satellite Tracking Dashboard**
- Real-time satellite status monitoring
- Risk assessment indicators (Normal/Risk)
- Altitude and velocity tracking
- Live data updates for ISS, debris, and satellites

### 🎛️ **Advanced Control Panel**
- **Speed Control**: Adjustable simulation speed (1x to 5x)
- **Layer Toggles**: 
  - Space debris visibility
  - Rocket body tracking
  - Satellite payload monitoring
- **Interactive UI**: Modern glassmorphism design with smooth animations

### 🎨 **Modern User Interface**
- Dark theme optimized for space visualization
- Responsive design with backdrop blur effects
- Custom typography with space-themed fonts
- Smooth transitions and hover effects

## 🚀 Tech Stack

- **Frontend**: Next.js 15.5.3 with React 19
- **3D Visualization**: Cesium 1.133.1 with Resium integration
- **State Management**: Jotai for lightweight atomic state
- **Styling**: Tailwind CSS 4 with custom theming
- **UI Components**: Material Tailwind React & Shadcn/ui
- **Language**: TypeScript 5.0
- **Build Tool**: Webpack 5

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- Yarn package manager
- Cesium Ion access token

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/caelivisio.git
cd caelivisio
```

### 2. Install Dependencies
```bash
yarn install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_CESIUM_ACCESS_TOKEN=your_cesium_ion_token_here
```

> **Note**: Get your free Cesium Ion access token at [cesium.com/ion](https://cesium.com/ion)

### 4. Start Development Server
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
caelivisio/
├── src/
│   └── app/
│       ├── components/
│       │   ├── earth.tsx          # 3D Cesium globe component
│       │   ├── sidebar.tsx        # Control panel with toggles
│       │   ├── right_table.tsx    # Satellite status dashboard
│       │   ├── store.ts           # Jotai state management
│       │   └── sidebaritems/
│       │       └── toggle.tsx     # Toggle components
│       ├── globals.css            # Global styles & theming
│       ├── layout.tsx             # Root layout component
│       └── page.tsx               # Main application page
├── public/
│   └── cesium/                    # Cesium static assets
└── package.json
```

## 🎯 Key Components

### Earth Component (`earth.tsx`)
- Integrates Cesium 3D globe with Resium
- Handles Cesium Ion token authentication
- Provides full-screen 3D visualization

### Sidebar (`sidebar.tsx`)
- Speed control slider (1x-5x simulation speed)
- Toggle switches for debris, rockets, and satellites
- State management with Jotai atoms

### Satellite Table (`right_table.tsx`)
- Real-time satellite status display
- Risk assessment with color-coded indicators
- Responsive data table with hover effects

## 🔧 Configuration

### Speed Control
The application supports 5 speed levels:
- **1x**: Real-time speed
- **2x**: 2x faster simulation
- **3x**: 3x faster simulation
- **4x**: 4x faster simulation
- **5x**: 5x faster simulation

### Layer Management
Toggle visibility for different space objects:
- **Debris**: Space debris and fragments
- **Rockets**: Rocket body components
- **Satellites**: Active satellite payloads

## 🌟 Features in Development

- [ ] Real-time satellite data integration
- [ ] Collision prediction algorithms
- [ ] Historical trajectory playback
- [ ] Multi-language support
- [ ] Mobile responsiveness improvements
- [ ] Advanced filtering options

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Maintain component modularity
4. Add proper error handling
5. Include JSDoc comments for complex functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Cesium](https://cesium.com/) for the amazing 3D globe technology
- [Resium](https://resium.darwineducation.com/) for React-Cesium integration
- [Next.js](https://nextjs.org/) for the robust React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling

## 📞 Support

If you have any questions or need help with the project, please open an issue or contact us at [your-email@example.com](mailto:your-email@example.com).

---

**Built with ❤️ for the space exploration community**
