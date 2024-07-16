import contentful from "contentful";

export const getPagePaths = async () => {
  const data = await client().withoutUnresolvableLinks.getEntries({
    content_type: "page",
  });

  return data.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));
};

export const getPageData = async (slug: string) => {
  return await client().withoutUnresolvableLinks.getEntries({
    content_type: "page",
    "fields.slug": slug,
  });
}

const client = () => {
  return contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: import.meta.env.CF_SPACE_ID,
    environment: import.meta.env.CF_ENVIRONMENT_ID,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken:
      import.meta.env.CF_USE_PREVIEW
        ? import.meta.env.CF_PREVIEW_TOKEN
        : import.meta.env.CF_ACCESS_TOKEN,
    host:
      import.meta.env.CF_USE_PREVIEW
        ? "preview.contentful.com"
        : "cdn.contentful.com"
  });
}