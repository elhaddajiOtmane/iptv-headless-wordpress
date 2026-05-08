export async function fetchGraphQL<T = any>(
  query: string,
  variables?: { [key: string]: any },
  preview = false
): Promise<T | null> {
  const wpUrl = process.env.WORDPRESS_GRAPHQL_URL;
  if (!wpUrl) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[wordpress] WORDPRESS_GRAPHQL_URL not set — returning null. Set it in .env.local for live data.');
    }
    return null;
  }

  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };

  if (preview) {
    // headers['Authorization'] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  try {
    const res = await fetch(wpUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      next: { tags: ['wordpress'] },
    });

    const json = await res.json();

    if (json.errors) {
      console.error('[wordpress] GraphQL errors:', json.errors);
      return null;
    }

    return json.data;
  } catch (err) {
    console.error('[wordpress] fetch failed:', err);
    return null;
  }
}
