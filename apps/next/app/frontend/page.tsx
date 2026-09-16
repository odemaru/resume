import type { Metadata } from 'next';
import { Resume } from '@/components/Resume';
import { resumeFrontend } from '@/lib/resume';

/**
 * Страница не индексируется поисковиками, но остаётся общедоступной:
 * статический сайт закрыть нечем, и любой, у кого есть адрес, её откроет.
 */
export const metadata: Metadata = {
  title: `${resumeFrontend.shortName} · ${resumeFrontend.title}`,
  description: resumeFrontend.tagline,
  robots: { index: false, follow: false },
};

export default function Frontend() {
  // Страница лежит на уровень глубже: фото, PDF и Vue-сборка ищутся от корня сайта.
  return <Resume data={resumeFrontend} pdf="resume-frontend.pdf" base="../" showVue />;
}
