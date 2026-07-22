import { MetadataRoute } from 'next';
import nzDatabase from '../data/nz_database.json';
import servicesData from '../data/services.json';

const DOMAIN = 'villageplumbers.co.nz';

function isServiceApplicableForRegion(service: any, region: any): boolean {
  if (service.tier === 'core' || service.isCore) return true;
  if (service.tier === 'secondary' || service.targetTag === 'major_cities_only') {
    return !!region.isMajorCity;
  }
  if (service.tier === 'regional') {
    if (service.targetTag === 'cold_only') return !!region.isColdRegion;
    if (service.targetTag === 'rural_only') return !!region.isRural;
    if (service.targetTag === 'industrial_only') return !!region.isIndustrial;
    if (service.targetTag === 'specialist_only') return false;
  }
  return false;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Main Root Homepage & Static Pages
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
      priority: 0.7,
    }
  );

  // 2. Main Service Pages
  servicesData.forEach((service) => {
    sitemapEntries.push({
      url: `https://${DOMAIN}/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: service.isCore ? 0.9 : 0.7,
    });
  });

  // 3. Regional Hubs & Suburbs + Applicable Service Subdomain Pages
  nzDatabase.regions.forEach((region) => {
    // Region Hub
    sitemapEntries.push({
      url: `https://${region.code}.${DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    const applicableServices = servicesData.filter(s => isServiceApplicableForRegion(s, region));

    // Region + Service URLs
    applicableServices.forEach((service) => {
      sitemapEntries.push({
        url: `https://${region.code}.${DOMAIN}/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: service.isCore ? 0.8 : 0.6,
      });
    });

    // Suburb Entries
    region.cities.forEach((city) => {
      sitemapEntries.push({
        url: `https://${city.subdomain}.${DOMAIN}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });

      // Suburb + Service URLs
      applicableServices.forEach((service) => {
        sitemapEntries.push({
          url: `https://${city.subdomain}.${DOMAIN}/${service.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: service.isCore ? 0.8 : 0.5,
        });
      });
    });
  });

  return sitemapEntries;
}
