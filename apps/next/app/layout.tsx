import type { Metadata } from 'next';
import './theme.css';
import { resume } from '@/lib/resume';

export const metadata: Metadata = {
  title: `${resume.shortName} — ${resume.title}`,
  description: resume.tagline,
  openGraph: {
    title: `${resume.shortName} — ${resume.title}`,
    description: resume.tagline,
    type: 'profile',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
