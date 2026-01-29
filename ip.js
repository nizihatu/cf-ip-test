export async function onRequest(context) {
  const request = context.request;

  const ip =
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("x-forwarded-for") ??
    "unknown";

  return new Response(
    `Your IP is: ${ip}`,
    {
      headers: {
        "Content-Type": "text/plain; charset=UTF-8"
      }
    }
  );
}
