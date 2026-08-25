import { ReactLogo, VueLogo, DownloadIcon } from './icons';

// relative 'vue/' points at the Vue build next to this one
const VUE_URL = process.env.NEXT_PUBLIC_VUE_URL || 'vue/';

type Props = {
  /** Адрес PDF рядом со страницей. */
  pdf: string;
  /**
   * Переключатель стека показывается только на основном варианте: Vue-сборка
   * собирается из него же, и на других страницах ссылка вела бы на другое
   * содержание.
   */
  showVue?: boolean;
};

export function TopBar({ pdf, showVue = false }: Props) {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <span className="brand-badge">ТГ</span>
          <span>Тимофей Гавриков</span>
        </div>
        <div className="topbar-actions">
          {showVue && (
            <div className="switch" role="group" aria-label="Переключатель стека">
              <span className="switch-opt active" aria-current="true">
                <ReactLogo /> React · Next.js
              </span>
              <a className="switch-opt" href={VUE_URL}>
                <VueLogo /> Vue
              </a>
            </div>
          )}
          <a className="btn" href={pdf} download aria-label="Скачать PDF-резюме">
            <DownloadIcon /> PDF
          </a>
        </div>
      </div>
    </div>
  );
}
