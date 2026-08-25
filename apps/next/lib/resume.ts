import qaa from '../data/resume.json';
import fullstack from '../data/resume-fullstack.json';
import type { Resume } from './resume-types';

/** Основной вариант — под позиции в тестировании. */
export const resume = qaa as unknown as Resume;

/**
 * Вариант под fullstack-позиции: та же база, другие заголовок, «о себе»
 * и навыки. Собирается наложением в scripts/variants.mjs.
 */
export const resumeFullstack = fullstack as unknown as Resume;
