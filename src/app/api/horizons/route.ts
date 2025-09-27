
import { NextResponse } from "next/server";
import fetchHorizons from "@/app/libs/getephms"; 

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  console.log("fetching data ...");
  try {
    const data = await fetchHorizons(id);
    console.log("data fetched!");
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch Horizons data" },
      { status: 500 },
    );
  }
}
