import { profile } from '../data/resume';

export function GET() {
  return new Response(JSON.stringify(profile), {
    headers: { 'Content-Type': 'application/json' },
  });
}
