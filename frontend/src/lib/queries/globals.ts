import { fetchGraphQL } from '../wordpress';
import { GlobalOptions } from '../types';

export async function getGlobalOptions(): Promise<GlobalOptions | null> {
  const query = `
    query GetGlobalOptions {
      globalOptions {
        globalOptionsFields {
          siteLogo {
            sourceUrl
            altText
          }
          footerText
          socialLinks {
            platform
            url
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);
  return data?.globalOptions?.globalOptionsFields || null;
}
