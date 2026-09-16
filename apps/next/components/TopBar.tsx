import { ReactLogo, VueLogo, DownloadIcon } from './icons';

type Props = {
  /** Адрес PDF относительно страницы. */
  pdf: string;
  /** Адрес Vue-сборки относительно страницы. */
  vue: string;
  /**
   * Переключатель стека показывается только на том варианте, из которого
   * собрана Vue-версия: на других страницах ссылка вела бы на другой текст.
   */
  showVue?: boolean;
};

export function TopBar({ pdf, vue, showVue = false }: Props) {
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
              <a className="switch-opt" href={vue}>
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
