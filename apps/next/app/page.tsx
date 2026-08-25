import { Resume } from '@/components/Resume';
import { resume } from '@/lib/resume';

export default function Home() {
  return <Resume data={resume} pdf="resume.pdf" showVue />;
}
