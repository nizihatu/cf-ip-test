export async function onRequest({ request, env }) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const time = new Date().toISOString();

  await env.ACCESS_LOGS.put(time, ip);

  return new Response(
    `IP: ${ip}`,
    { headers: { "Content-Type": "text/plain; charset=UTF-8" } }
  );
}
