export function extractQueryParam(url: string, param: string): string | null {
  const regex = new RegExp(`[?&]${param}=([^&]*)`);
  const match = url.match(regex);
  return match ? decodeURIComponent(match[1]) : null;
}
