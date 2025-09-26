import { EphemerisData, EphemerisEntry, EphermisWid } from "@/app/store";
import axios from "axios";


export default async function fetchHorizons(
  id: string,
): Promise<EphermisWid> {
  // outer key = id, inner = date
  const start = new Date();
  const stop = new Date();
  stop.setDate(start.getDate() + 7);

  const yyyyStart = start.getFullYear();
  const mmStart = String(start.getMonth() + 1).padStart(2, "0");
  const ddStart = String(start.getDate()).padStart(2, "0");

  const yyyyStop = stop.getFullYear();
  const mmStop = String(stop.getMonth() + 1).padStart(2, "0");
  const ddStop = String(stop.getDate()).padStart(2, "0");

  const url = `https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND='DES=${id}'&OBJ_DATA='YES'&MAKE_EPHEM='YES'&EPHEM_TYPE='Vector'&CENTER=Geocentric&START_TIME='${yyyyStart}-${mmStart}-${ddStart}'&STOP_TIME='${yyyyStop}-${mmStop}-${ddStop}'&STEP_SIZE='1%20d'`;

  try {
    const response = await axios.get(url);
    const text = response.data as string;

    if (!text.includes("$$SOE") || !text.includes("$$EOE")) {
      console.warn("Horizons response does not contain SOE/EOE block");
      return {};
    }

    const soeBlock = text.split("$$SOE")[1].split("$$EOE")[0];
    const lines = soeBlock.split("\n");
    const data: Record<string, EphemerisEntry> = {};
    let currentDate = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      const dateMatch = line.match(/=\sA\.D\.\s(\d{4}-\w{3}-\d{2})/);
      if (dateMatch) {
        currentDate = dateMatch[1];
        continue;
      }

      const posMatch = line.match(
        /X\s*=\s*([-\d.E+]+)\s*Y\s*=\s*([-\d.E+]+)\s*Z\s*=\s*([-\d.E+]+)/,
      );

      if (posMatch && currentDate) {
        const pos = posMatch.slice(1, 4).map(Number);

        const velLine = lines[i + 1]?.trim();
        const velMatch = velLine?.match(
          /VX\s*=\s*([-\d.E+]+)\s*VY\s*=\s*([-\d.E+]+)\s*VZ\s*=\s*([-\d.E+]+)/,
        );
        if (velMatch) {
          const vel = velMatch.slice(1, 4).map(Number);
          data[currentDate] = { pos, vel };
        }
      }
    }

    return { [id as string]: data as EphemerisData };
  } catch (err) {
    console.error("Failed to fetch Horizons data:", err);
    return {};
  }
}
