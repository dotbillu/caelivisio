# Caelivisio 

**An Interactive 3D Visualization of Near-Earth Objects**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r160-black?style=flat&logo=three.js)](https://threejs.org/)

Caelivisio (from Latin *'caeli'* for sky and *'visio'* for vision) is a web application that brings the cosmos to your browser. It renders an interactive 3D simulation of Earth's orbit and tracks Near-Earth Objects (NEOs) using real-time data from NASA APIs. Explore our cosmic neighborhood and see which asteroids are passing by!

### ✨ **[Live Demo](https://webcaelivisio.vercel.app/)** ✨

---

##  Features

* **Real-time NEO Tracking**: Fetches and displays the latest data for asteroids and comets near Earth's orbit.
* **Interactive 3D Environment**: A fully interactive, pannable, and zoomable 3D space built with Three.js.
* **Hazard Categorization**: Visually distinguishes between potentially hazardous and non-hazardous objects.
* **Accurate Orbital Paths**: Plots the orbits of Earth and NEOs to provide a realistic representation of their trajectories.
* **Responsive Design**: A seamless experience whether you're on a desktop or mobile device.


## 🛠️ Tech Stack

* **Framework**: [Next.js](https://nextjs.org/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **3D Rendering**: [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
* **Data Source**: [NASA JPL Small-Body Database API](https://ssd-api.jpl.nasa.gov/doc/sbdb.html) & [Horizons API](https://ssd.jpl.nasa.gov/horizons/app.html#/)
* **Deployment**: [Vercel](https://vercel.com/)

---

## ⚙️ Getting Started

To run a local copy of this project, follow these simple steps.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/dotbillu/caelivisio](https://github.com/dotbillu/caelivisio)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd caelivisio
    ```
3.  **Install dependencies:**
    ```sh
    yarn 
    ```
4.  **Run the development server:**
    ```sh
    yarn dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result!

---

## 📄 License

This project is distributed under the MIT License.
