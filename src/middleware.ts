export function corsHeaders(origin: string): HeadersInit {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

export function handleOptions(request: Request): Response {
  const origin = request.headers.get("Origin") || "*";
  return new Response(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}
