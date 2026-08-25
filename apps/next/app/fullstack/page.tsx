import type { Metadata } from 'next';
import { Resume } from '@/components/Resume';
import { resumeFullstack } from '@/lib/resume';

/**
 * Страница не проиндексируется поисковиками, но остаётся общедоступной:
 * статический сайт закрыть нечем, и любой, у кого есть адрес, её откроет.
 */
export const metadata: Metadata = {
  title: `${resumeFullstack.shortName} — ${resumeFullstack.title}`,
  description: resumeFullstack.tagline,
  robots: { index: false, follow: false },
};

export default function Fullstack() {
  // Страница лежит на уровень глубже: фото и PDF ищутся от корня сайта.
  return <Resume data={resumeFullstack} pdf="resume-fullstack.pdf" base="../" />;
}
