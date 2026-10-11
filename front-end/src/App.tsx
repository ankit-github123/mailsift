import { useEffect, useState } from 'react';
import { CheckCircle2, Inbox, Server } from 'lucide-react';

type ApiStatus = {
  ok?: boolean;
  service?: string;
  timestamp?: string;
};

export default function App() {
  const [status, setStatus] = useState<ApiStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API responded with ${response.status}`);
        }

        return response.json() as Promise<ApiStatus>;
      })
      .then(setStatus)
      .catch((caughtError: unknown) => {
        setError(caughtError instanceof Error ? caughtError.message : 'Unable to reach API');
      });
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-12">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-400 text-slate-950">
            <Inbox size={24} strokeWidth={2.4} />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-normal">MailSift</h1>
            <p className="text-sm text-slate-400">A cleaner inbox, automatically.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <Server className="mb-4 text-cyan-300" size={24} />
            <h2 className="mb-2 text-lg font-medium">Backend</h2>
            <p className="text-sm leading-6 text-slate-400">
              Express API running on port 4000 with an initial health endpoint.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <CheckCircle2 className="mb-4 text-emerald-300" size={24} />
            <h2 className="mb-2 text-lg font-medium">Frontend</h2>
            <p className="text-sm leading-6 text-slate-400">
              Vite, React, TypeScript, and Tailwind are ready for the dashboard build.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <div className="mb-4 h-6 text-sm font-medium text-slate-300">API status</div>
            {status ? (
              <div className="text-sm leading-6 text-slate-400">
                <p className="font-medium text-emerald-300">Connected</p>
                <p>{status.service}</p>
              </div>
            ) : (
              <p className="text-sm leading-6 text-amber-300">{error ?? 'Checking API...'}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
