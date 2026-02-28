import { getSiteConfig } from '../lib/siteData';
import PageClient from './PageClient';

export default function Page() {
  const config = getSiteConfig();
  return <PageClient config={config} />;
}
