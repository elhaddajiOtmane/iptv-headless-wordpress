import { fetchGraphQL } from '../wordpress';

export async function getGlobalSeo() {
  const query = `
    query GetGlobalSeo {
      seo {
        schema {
          companyName
          companyLogo {
            sourceUrl
          }
          siteName
          siteUrl
        }
        social {
          facebook {
            url
          }
          twitter {
            username
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);
  return data?.seo || null;
}
