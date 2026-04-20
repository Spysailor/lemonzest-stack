import { Client } from '@notionhq/client';

// ============================================================================
// Types — schema of 🛒 Marketplace — Catalogue Produits (Notion)
// ============================================================================

export type ProductStatus = 'Live' | 'Coming Soon' | 'Draft' | 'Archived';
export type ProductType = 'Skill' | 'Pack' | 'Template' | 'Guide';
export type ProductBadge = 'Nouveau' | 'Best-seller' | 'Promo' | 'Beta' | null;
export type ProductCategory =
  | 'Marketing'
  | 'Compta/Finance'
  | 'Juridique'
  | 'RH'
  | 'Ventes'
  | 'Support client'
  | 'Ops'
  | 'Tech';

export interface Product {
  id: string;
  slug: string;
  name: string;
  status: ProductStatus;
  categories: ProductCategory[];
  type: ProductType | null;
  tagline: string;
  description: string;
  bullets: string[];
  price: number | null;
  currency: 'EUR' | 'USD';
  gumroadSlug: string | null;
  gumroadUrl: string | null;
  featured: boolean;
  coverUrl: string | null;
  galleryUrls: string[];
  badge: ProductBadge;
  publishedAt: string | null;
  notionUrl: string;
}

// ============================================================================
// Client + env
// ============================================================================

const NOTION_TOKEN = import.meta.env.NOTION_TOKEN;
const DB_ID = import.meta.env.NOTION_PRODUCTS_DATABASE_ID;
const GUMROAD_SUBDOMAIN = import.meta.env.GUMROAD_SUBDOMAIN ?? 'lemonzestdigital';

if (!NOTION_TOKEN) {
  throw new Error(
    'NOTION_TOKEN missing. Set it in .env (see .env.example). The build-time Notion fetch cannot proceed without it.',
  );
}
if (!DB_ID) {
  throw new Error('NOTION_PRODUCTS_DATABASE_ID missing. Set it in .env.');
}

const notion = new Client({ auth: NOTION_TOKEN });

// ============================================================================
// Property accessors (defensive — Notion can return partial/undefined shapes)
// ============================================================================

type AnyProps = Record<string, any>;

const getTitle = (p: AnyProps, key: string): string =>
  (p?.[key]?.title ?? []).map((t: any) => t?.plain_text ?? '').join('').trim();

const getRichText = (p: AnyProps, key: string): string =>
  (p?.[key]?.rich_text ?? []).map((t: any) => t?.plain_text ?? '').join('').trim();

const getSelect = (p: AnyProps, key: string): string | null =>
  p?.[key]?.select?.name ?? null;

const getMultiSelect = (p: AnyProps, key: string): string[] =>
  (p?.[key]?.multi_select ?? []).map((s: any) => s?.name).filter(Boolean);

const getNumber = (p: AnyProps, key: string): number | null =>
  typeof p?.[key]?.number === 'number' ? p[key].number : null;

const getCheckbox = (p: AnyProps, key: string): boolean => !!p?.[key]?.checkbox;

const getDateStart = (p: AnyProps, key: string): string | null =>
  p?.[key]?.date?.start ?? null;

const getFiles = (p: AnyProps, key: string): string[] =>
  (p?.[key]?.files ?? [])
    .map((f: any) => f?.external?.url ?? f?.file?.url ?? null)
    .filter(Boolean);

// ============================================================================
// Slug helpers
// ============================================================================

export const slugify = (s: string): string =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const gumroadUrl = (slug: string | null): string | null =>
  slug ? `https://${GUMROAD_SUBDOMAIN}.gumroad.com/l/${slug}` : null;

// ============================================================================
// Mapper Notion page → Product
// ============================================================================

function mapPage(page: any): Product {
  const p = page.properties;
  const name = getTitle(p, 'Name') || 'Sans nom';
  const rawSlug = getRichText(p, 'Slug');
  const slug = rawSlug || slugify(name);
  const gSlug = getRichText(p, 'Gumroad Slug') || null;
  const status = (getSelect(p, 'Status') ?? 'Draft') as ProductStatus;

  return {
    id: page.id,
    slug,
    name,
    status,
    categories: getMultiSelect(p, 'Category') as ProductCategory[],
    type: getSelect(p, 'Type') as ProductType | null,
    tagline: getRichText(p, 'Tagline'),
    description: getRichText(p, 'Description'),
    bullets: getRichText(p, 'Bullets')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean),
    price: getNumber(p, 'Price'),
    currency: (getSelect(p, 'Currency') ?? 'EUR') as 'EUR' | 'USD',
    gumroadSlug: gSlug,
    gumroadUrl: gumroadUrl(gSlug),
    featured: getCheckbox(p, 'Featured'),
    coverUrl: getFiles(p, 'Cover')[0] ?? null,
    galleryUrls: getFiles(p, 'Gallery'),
    badge: getSelect(p, 'Badge') as ProductBadge,
    publishedAt: getDateStart(p, 'Published At'),
    notionUrl: page.url,
  };
}

// ============================================================================
// Public API — fetch all products (filtered to Live + Coming Soon)
// ============================================================================

let _cache: Product[] | null = null;

export async function getAllProducts(): Promise<Product[]> {
  if (_cache) return _cache;

  const products: Product[] = [];
  let cursor: string | undefined;

  do {
    const res: any = await (notion as any).databases.query({
      database_id: DB_ID,
      page_size: 100,
      start_cursor: cursor,
      filter: {
        or: [
          { property: 'Status', select: { equals: 'Live' } },
          { property: 'Status', select: { equals: 'Coming Soon' } },
        ],
      },
      sorts: [
        { property: 'Featured', direction: 'descending' },
        { property: 'Published At', direction: 'descending' },
      ],
    });
    for (const page of res.results ?? []) {
      products.push(mapPage(page));
    }
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  _cache = products;
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByCategory(cat: ProductCategory): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.categories.includes(cat));
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.featured && p.status === 'Live').slice(0, limit);
}

// ============================================================================
// Static taxonomy (kept in sync with Notion schema manually)
// ============================================================================

export const CATEGORIES: { slug: string; label: ProductCategory; emoji: string; blurb: string }[] = [
  { slug: 'marketing', label: 'Marketing', emoji: '📣', blurb: 'Acquisition, contenu, SEO, email, LinkedIn' },
  { slug: 'compta-finance', label: 'Compta/Finance', emoji: '💶', blurb: 'Tenue, clôtures, reporting, TVA' },
  { slug: 'juridique', label: 'Juridique', emoji: '⚖️', blurb: 'Contrats, CGV/CGU, RGPD, conformité' },
  { slug: 'rh', label: 'RH', emoji: '👥', blurb: 'Recrutement, onboarding, évaluations' },
  { slug: 'ventes', label: 'Ventes', emoji: '🎯', blurb: 'Prospection, propales, pipeline, closing' },
  { slug: 'support-client', label: 'Support client', emoji: '💬', blurb: 'Tickets, FAQ, CSAT, escalades' },
  { slug: 'ops', label: 'Ops', emoji: '⚙️', blurb: 'Process, runbooks, projets, qualité' },
  { slug: 'tech', label: 'Tech', emoji: '🛠️', blurb: 'Dev, DevOps, data, architecture' },
];

export const categoryBySlug = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug) ?? null;

export const categorySlug = (label: ProductCategory): string =>
  CATEGORIES.find((c) => c.label === label)?.slug ?? slugify(label);

// ============================================================================
// Formatting helpers
// ============================================================================

export function formatPrice(price: number | null, currency: 'EUR' | 'USD' = 'EUR'): string {
  if (price == null) return '—';
  const symbol = currency === 'EUR' ? '€' : '$';
  // 99 → "99 €", 99.5 → "99,50 €"
  const rounded = Math.round(price * 100) / 100;
  const isInt = Number.isInteger(rounded);
  const txt = isInt ? String(rounded) : rounded.toFixed(2).replace('.', ',');
  return currency === 'EUR' ? `${txt} ${symbol}` : `${symbol}${txt}`;
}
