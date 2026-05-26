export type MetabaseEmbedType = "dashboard" | "question";

export type MetabaseEmbedOptions = {
  siteUrl: string;
  embedType: MetabaseEmbedType;
  resourceId: string;
  params?: Record<string, string>;
};

export function buildMetabasePublicUrl(options: MetabaseEmbedOptions): string {
  const base = options.siteUrl.replace(/\/+$/, "");
  const params = options.params
    ? `?${new URLSearchParams(options.params).toString()}`
    : "";
  return `${base}/public/${options.embedType}/${options.resourceId}${params}`;
}

export function getMetabasePublicUrl(
  embedType: MetabaseEmbedType,
  resourceId: string,
  params?: Record<string, string>,
): string | null {
  const siteUrl = process.env.NEXT_PUBLIC_METABASE_SITE_URL;
  if (!siteUrl) return null;
  return buildMetabasePublicUrl({ siteUrl, embedType, resourceId, params });
}
