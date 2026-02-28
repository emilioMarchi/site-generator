import PageClient from './PageClient';
import { getSiteData } from '../lib/siteData';

export default function Page() {
  const data = getSiteData();
  return <PageClient data={data} />;
}
