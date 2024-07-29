import { getAllFighters } from "@/lib/fightersService";
import { getFighterBySlug } from "@/lib/fightersService";
import { getFightersForMonth } from "@/lib/fightersService";
import { getLatestFighters } from "@/lib/fightersService";
import { getAvailableFighterYears } from "@/lib/fightersService";
import { getFightersForYear } from "@/lib/fightersService";
import { getFightersForYearAndMonth } from "@/lib/fightersService";

export async function GET() {
  try {
    const fighters = await getAllFighters();
    return new Response(JSON.stringify(fighters), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch fighters" }), {
      status: 500,
    });
  }
}

export async function GET(request) {
  const { slug } = request.nextUrl.pathname.split("/").pop();
  try {
    const fighter = await getFighterBySlug(slug);
    return new Response(JSON.stringify(fighter), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch fighter" }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const latestFighters = await getLatestFighters();
    return new Response(JSON.stringify(latestFighters), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch latest fighters" }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const years = await getAvailableFighterYears();
    return new Response(JSON.stringify(years), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch available years" }),
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { year } = request.nextUrl.searchParams;
  try {
    const fighters = await getFightersForYear(year);
    return new Response(JSON.stringify(fighters), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch fighters for the year" }),
      { status: 500 }
    );
  }
}
export async function GET(request) {
  const { year, month } = request.nextUrl.searchParams;

  try {
    const fighters = await getFightersForMonth(year, month);
    return new Response(JSON.stringify(fighters), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch fighters for the year and month",
      }),
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { year, month } = request.nextUrl.searchParams;
  try {
    const fighters = await getFightersForYearAndMonth(year, month);
    return new Response(JSON.stringify(fighters), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch fighters for the year and month",
      }),
      { status: 500 }
    );
  }
}
