import { fetchGraphQL } from '../wordpress';
import { WPMenu } from '../types';

export async function getMenu(location: 'PRIMARY' | 'FOOTER'): Promise<WPMenu | null> {
  const query = `
    query GetMenu($location: MenuLocationEnum!) {
      menus(where: { location: $location }) {
        nodes {
          name
          menuItems {
            nodes {
              id
              label
              path
              url
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL(query, { location });
  return data?.menus?.nodes?.[0] || null;
}
