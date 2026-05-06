import { fetchGraphQL } from '../wordpress';
import { WpPage } from '../types';

const SEO_FRAGMENT = `
  seo {
    title
    metaDesc
    focuskw
    opengraphTitle
    opengraphDescription
    opengraphImage {
      sourceUrl
      altText
    }
  }
`;

export async function getPageByUri(uri: string): Promise<WpPage | null> {
  const query = `
    query GetPageByUri($uri: ID!) {
      page(id: $uri, idType: URI) {
        title
        slug
        uri
        content
        ${SEO_FRAGMENT}
        homepageFields {
          heroTitle
          heroSubtitle
          heroCtaText
          heroCtaUrl
          heroImage {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
          features {
            title
            description
            iconName
          }
          testimonials {
            name
            text
            rating
          }
        }
        pricingFields {
          pricingPlans {
            name
            price
            period
            isPopular
            ctaUrl
            featuresList
          }
        }
        contactFields {
          emailAddress
          whatsappNumber
          physicalAddress
        }
      }
    }
  `;

  const data = await fetchGraphQL(query, { uri });
  return data?.page || null;
}
