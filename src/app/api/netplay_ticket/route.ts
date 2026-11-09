const TICKET_SECRET = process.env.NETPLAY_SECRET || "cricket07-secret-salt-2026";
const TICKET_SECONDS = 3600;

async function hmac(secret: string, text: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(text));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function GET() {
  const exp = Math.floor(Date.now() / 1000) + TICKET_SECONDS;
  const sig = await hmac(TICKET_SECRET, `netplay:${exp}`);
  const ticket = `${exp}.${sig}`;

  return Response.json(
    {
      ticket,
      iceServers: [
        { urls: "stun:stun.cloudflare.com:3478" },
        { urls: "stun:stun.l.google.com:19302" },
      ],
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

