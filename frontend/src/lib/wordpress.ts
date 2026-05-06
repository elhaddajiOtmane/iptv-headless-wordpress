export async function fetchGraphQL<T = any>(
  query: string,
  variables?: { [key: string]: any },
  preview = false
): Promise<T> {
  const wpUrl = process.env.WORDPRESS_GRAPHQL_URL;
  if (!wpUrl) {
    throw new Error('WORDPRESS_GRAPHQL_URL is missing in environment variables.');
  }

  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };

  // If preview mode or auth needed later
  if (preview) {
    // headers['Authorization'] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const res = await fetch(wpUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { tags: ['wordpress'] }, // For revalidation
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch GraphQL API');
  }

  return json.data;
}
