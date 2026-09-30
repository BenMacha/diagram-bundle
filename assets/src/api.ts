import type { DiagramOptions, ManagerInfo, Schema } from './types';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function url(base: string, path: string, params: Record<string, string | undefined> = {}): string {
  const query = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v as string)}`)
    .join('&');
  return `${base.replace(/\/+$/, '')}${path}${query ? `?${query}` : ''}`;
}

async function request(options: DiagramOptions, path: string, params: Record<string, string | undefined>, accept: string): Promise<Response> {
  if (!options.apiUrl && options.apiUrl !== '') {
    throw new ApiError('apiUrl is not configured', 0);
  }
  const extra = typeof options.headers === 'function' ? await options.headers() : options.headers || {};
  const doFetch = options.fetch || fetch.bind(globalThis);
  const response = await doFetch(url(options.apiUrl, path, params), {
    headers: { Accept: accept, ...extra },
    credentials: options.credentials || 'same-origin',
  });
  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const body = await response.clone().json();
      if (body && body.error) message = body.error;
    } catch {
      /* not JSON */
    }
    throw new ApiError(message, response.status);
  }
  return response;
}

export async function fetchManagers(options: DiagramOptions): Promise<{ default: string; managers: ManagerInfo[] }> {
  const response = await request(options, '/api/managers', {}, 'application/json');
  return response.json();
}

export async function fetchSchema(options: DiagramOptions, manager?: string): Promise<Schema> {
  const response = await request(options, '/api/schema', { em: manager }, 'application/json');
  return (await response.json()) as Schema;
}

