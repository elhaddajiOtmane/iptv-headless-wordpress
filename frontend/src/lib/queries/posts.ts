import { fetchGraphQL } from '../wordpress';
import { WPPost } from '../types';

export async function getPosts(first = 10): Promise<WPPost[]> {
  const query = `
    query GetPosts($first: Int!) {
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          uri
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL(query, { first });
  return data?.posts?.nodes || [];
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const query = `
    query GetPostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        slug
        uri
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        seo {
          title
          metaDesc
          focuskw
        }
      }
    }
  `;

  const data = await fetchGraphQL(query, { id: slug });
  return data?.post || null;
}
