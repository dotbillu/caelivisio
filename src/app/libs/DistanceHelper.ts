function toECEF(latDeg: number, lonDeg: number, h: number) {
  const a = 6378.137;
  const f = 1 / 298.257223563;
  const e2 = f * (2 - f);

  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;

  const N = a / Math.sqrt(1 - e2 * Math.sin(lat) ** 2);

  const x = (N + h) * Math.cos(lat) * Math.cos(lon);
  const y = (N + h) * Math.cos(lat) * Math.sin(lon);
  const z = ((1 - e2) * N + h) * Math.sin(lat);

  return { x, y, z };
}

export default function DistanceBetween(
  lat1: number,
  lon1: number,
  h1: number,
  lat2: number,
  lon2: number,
  h2: number,
) {
  const p1 = toECEF(lat1, lon1, h1);
  const p2 = toECEF(lat2, lon2, h2);

  return Math.sqrt(
    (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2,
  );
}
