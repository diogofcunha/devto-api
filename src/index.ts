import fetch from 'node-fetch';

const DEV_TO_API_ORIGIN = `https://dev.to/api`;
const ARTICLE_ROUTE = '/articles';

export interface ArticlePayload {
  /**
   * The title of an article
   */
  title: string;
  /**
   * Description of the article.
   */
  description?: string;
  /**
   * The Markdown body, with or without a front matter.
   */
  body_markdown: string;
  /**
   * True if the article should be published right away, defaults to false.
   */
  published?: boolean;
  /**
   * A list of tags for the article.
   */
  tags?: string[];
  /**
   * The name of the series the article should be published within.
   */
  series?: string;
  /**
   * Your organization's ID, if you wish to create an article under an organization
   */
  organization_id?: string;
  /**
   * URL of the image to use as the cover
   */
  main_image?: string;
  /**
   * Canonical URL of the article (string, optional)
   */
  canonical_url?: string;
}

export interface User {
  name: string;
  username: string;
  twitter_username: null | string;
  github_username: null | string;
  website_url: null | string;
  profile_image: string | null;
  profile_image_90: string | null;
}

export interface ArticleResult {
  type_of: string;
  id: number;
  title: string;
  description: string;
  cover_image: null | string;
  readable_publish_date: string;
  social_image: string;
  tag_list: string;
  tags: string[];
  slug: string;
  path: string;
  url: string;
  canonical_url: string;
  comments_count: number;
  positive_reactions_count: number;
  created_at: Date;
  edited_at: null | Date;
  crossposted_at: null | Date;
  published_at: null | Date;
  last_comment_at: Date;
  body_html: string;
  body_markdown: string;
  ltag_style: string[];
  ltag_script: string[];
  user: User;
}

async function articleMutation(articlePayload: ArticlePayload, apiKey: string, articleId?: number) {
  let baseUrl = `${DEV_TO_API_ORIGIN}${ARTICLE_ROUTE}`;

  if (articleId !== undefined) {
    baseUrl = baseUrl.concat(`/${articleId}`);
  }

  const response = await fetch(`${DEV_TO_API_ORIGIN}${ARTICLE_ROUTE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({article: articlePayload}),
  });

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function createArticle(articlePayload: ArticlePayload, apiKey: string) {
  return await articleMutation(articlePayload, apiKey);
}

export async function updateArticle(articlePayload: ArticlePayload, apiKey: string, articleId: number) {
  return await articleMutation(articlePayload, apiKey, articleId);
}
