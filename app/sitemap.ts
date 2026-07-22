import { MetadataRoute } from 'next';
import nzDatabase from '../data/nz_database.json';
import servicesData from '../data/services.json';

const DOMAIN = 'villageplumbers.co.nz';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Homepage & Core Pages
  sitemapEntries.push(
    {
      url: `https://${DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `https://${DOMAIN}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  );

  // 2. 65 Services Pages
  servicesData.forEach((service) => {
    sitemapEntries.push({
      url: `https://${DOMAIN}/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  // 3. Regions & Sub-Region Subdomain Entries
  nzDatabase.regions.forEach((region) => {
    sitemapEntries.push({
      url: `https://${region.code}.${DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    region.cities.forEach((city) => {
      sitemapEntries.push({
        url: `https://${city.subdomain}.${DOMAIN}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  return sitemapEntries;
}
