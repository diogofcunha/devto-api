export interface ArticlePayload {
  /**
   * The title of an article
   */
  title?: string;
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
