import { ReactLogo, VueLogo, DownloadIcon } from './icons';

// relative 'vue/' points at the Vue build next to this one
const VUE_URL = process.env.NEXT_PUBLIC_VUE_URL || 'vue/';

export function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <span className="brand-badge">ТГ</span>
          <span>Тимофей Гавриков</span>
        </div>
        <div className="topbar-actions">
          <div className="switch" role="group" aria-label="Переключатель стека">
            <span className="switch-opt active" aria-current="true">
              <ReactLogo /> React · Next.js
            </span>
            <a className="switch-opt" href={VUE_URL}>
              <VueLogo /> Vue
            </a>
          </div>
          <a className="btn" href="resume.pdf" download aria-label="Скачать PDF-резюме">
            <DownloadIcon /> PDF
          </a>
        </div>
      </div>
    </div>
  );
}
