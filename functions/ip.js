export async function onRequest({ request, env }) {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const ua = request.headers.get("User-Agent") ?? "unknown";
  const country = request.headers.get("CF-IPCountry") ?? "unknown";
  const path = new URL(request.url).pathname;
  const time = new Date().toISOString();

  const key = `${time}-${crypto.randomUUID()}`;

  const log = {
    time,
    ip,
    ua,
    country,
    path
  };

  await env.ACCESS_LOGS.put(key, JSON.stringify(log));

  return new Response(
    "access logged",
    { headers: { "Content-Type": "text/plain; charset=UTF-8" } }
  );
}
