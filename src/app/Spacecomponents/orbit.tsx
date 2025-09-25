import Earth from "./orbitComponents/earth";
import OrbitLines from "./orbitComponents/orbitlines";
import SunComponent from "./orbitComponents/Sun";

export default function Orbit() {
  return (
    <>
      <SunComponent />
      <Earth />
      <OrbitLines />
    </>
  );
}
