/**
 * Site Data Service
 * Loads site data from site-data.json
 */

import siteDataJson from '../../site-data.json';
import type { SiteDocument } from '@/types/site';

// Type assertion for imported JSON
const data = siteDataJson as SiteDocument;

/**
 * Get the complete site data
 */
export function getSiteData(): SiteDocument {
  return data;
}

/**
 * Get business data
 */
export function getBusiness() {
  return data.business;
}

/**
 * Get services
 */
export function getServices() {
  return data.business?.services || [];
}

/**
 * Get featured services
 */
export function getFeaturedServices() {
  return getServices().filter(s => s.featured);
}

/**
 * Get contact info
 */
export function getContact() {
  return data.business?.contact;
}

/**
 * Get social links
 */
export function getSocial() {
  return data.business?.social;
}

/**
 * Get team members
 */
export function getTeam() {
  return data.business?.team || [];
}

/**
 * Get site metadata
 */
export function getSitio() {
  return data.sitio;
}

/**
 * Get theme config
 */
export function getTheme() {
  return data.theme;
}

/**
 * Get SEO config
 */
export function getSeo() {
  return data.seo;
}
