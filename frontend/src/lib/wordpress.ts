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
    'User-Agent': 'NextJS-Frontend/1.0',
    'Accept': 'application/json',
  };

  // If preview mode or auth needed later
  if (preview) {
    // headers['Authorization'] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  try {
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
      console.error('[WordPress GraphQL] Query errors:', json.errors);
      throw new Error('Failed to fetch GraphQL API');
    }

    return json.data;
  } catch (error) {
    // Graceful degradation: log and return null so pages show fallback UI
    console.error('[WordPress GraphQL] Connection failed:', error instanceof Error ? error.message : error);
    return null as T;
  }
}
