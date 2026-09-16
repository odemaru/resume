import qa from '../data/resume.json';
import frontend from '../data/resume-frontend.json';
import type { Resume } from './resume-types';

/** Основной вариант, под позиции в тестировании. */
export const resume = qa as unknown as Resume;

/**
 * Вариант под frontend-позиции: та же база, другие заголовок, «о себе»,
 * навыки и описание проектов. Собирается наложением в scripts/variants.mjs.
 */
export const resumeFrontend = frontend as unknown as Resume;
