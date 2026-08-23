import { blogs as fallbackBlogs } from '../data/blogs';

const WEBFLOW_API_URL = 'https://api.webflow.com/v2';
const token = process.env.EXPO_PUBLIC_WEBFLOW_TOKEN;
const siteId = process.env.EXPO_PUBLIC_WEBFLOW_SITE_ID;

async function request(path) {
  if (!token || !siteId) {
    throw new Error('De Webflow API-gegevens zijn nog niet ingesteld.');
  }

  const response = await fetch(`${WEBFLOW_API_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Webflow API fout: ${response.status}`);
  }

  return response.json();
}

function imageSource(image) {
  if (typeof image === 'string') return { uri: image };
  return image?.url ? { uri: image.url } : null;
}

function euroPrice(value) {
  const amount = Number(value || 0);
  return amount > 1000 ? amount / 100 : amount;
}

function textWithoutHtml(value = '') {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function categoryName(category, fallback) {
  if (Array.isArray(category)) return categoryName(category[0], fallback);
  if (typeof category === 'object' && category) {
    return category.name || category.displayName || category.fieldData?.name || fallback;
  }
  // Een Webflow reference-veld kan alleen de technische 24-karakter-ID teruggeven.
  if (typeof category === 'string' && /^[a-f0-9]{24,}$/i.test(category)) return fallback;
  return category || fallback;
}

function categoryFromProductName(name) {
  const normalizedName = String(name || '').toLowerCase();
  if (normalizedName.includes('jacket')) return 'Motorjassen';
  if (normalizedName.includes('pants')) return 'Motorbroeken';
  if (normalizedName.includes('gloves')) return 'Handschoenen';
  if (normalizedName.includes('boots')) return 'Motorlaarzen';
  if (normalizedName.includes('helmet')) return 'Motorhelmen';
  return 'Producten';
}

function categoryFromBlogTitle(title) {
  const normalizedTitle = String(title || '').toLowerCase();
  if (normalizedTitle.includes('onderhoud')) return 'Onderhoud';
  if (normalizedTitle.includes('motorjas') || normalizedTitle.includes('handschoenen')) return 'Tips';
  if (normalizedTitle.includes('zomercollectie')) return 'Productnieuws';
  if (normalizedTitle.includes('regen') || normalizedTitle.includes('zichtbaarheid')) return 'Veiligheid';
  if (normalizedTitle.includes('lange motorrit') || normalizedTitle.includes('tussenseizoen')) return 'Rijervaring';
  return 'Veiligheid';
}

export async function getWebflowProducts() {
  const data = await request(`/sites/${siteId}/products`);

  return (data.items || []).map((item, index) => {
    // Webflow groepeert elk e-commerce-item als { product, skus }.
    const product = item.product || item;
    const fields = product.fieldData || {};
    const sku = item.skus?.[0] || {};
    const skuFields = sku.fieldData || sku;
    const image = skuFields['main-image'] || fields['main-image'] || fields.mainImage || fields.image;
    const name = fields.name || 'EKO product';

    return {
      id: product.id || item.id || item._id || fields.slug || `webflow-product-${index}`,
      name,
      category: categoryName(fields.category, categoryFromProductName(name)),
      description: textWithoutHtml(fields.description || ''),
      fullDescription: textWithoutHtml(fields['full-description'] || fields.description || ''),
      price: euroPrice(skuFields.price?.value ?? skuFields.price),
      image: imageSource(image),
    };
  });
}

export async function getWebflowBlogs() {
  const collectionData = await request(`/sites/${siteId}/collections`);
  const collections = collectionData.collections || collectionData.items || [];
  const blogCollection = collections.find((collection) => {
    const name = (collection.displayName || collection.name || '').toLowerCase();
    return name === 'blogs' || name === 'blog';
  });

  if (!blogCollection) {
    throw new Error('De CMS-collectie “Blogs” werd niet gevonden.');
  }

  // /items is de staging-data: de site hoeft dus niet gepubliceerd te zijn.
  const data = await request(`/collections/${blogCollection.id}/items`);

  return (data.items || []).map((item, index) => {
    const fields = item.fieldData || {};
    const title = fields.name || 'EKO blog';
    const image = fields.image || fields['main-image'] || fields['thumbnail-image'];
    const fallbackBlog = fallbackBlogs.find((blog) => {
      const fallbackTitle = blog.title.toLowerCase();
      const remoteTitle = title.toLowerCase();
      return fallbackTitle === remoteTitle
        || (remoteTitle.includes('motorjas') && fallbackTitle.includes('motorjas'))
        || (remoteTitle.includes('regen') && fallbackTitle.includes('regen'))
        || (remoteTitle.includes('helm') && fallbackTitle.includes('helm'))
        || (remoteTitle.includes('zomercollectie') && fallbackTitle.includes('zomercollectie'))
        || (remoteTitle.includes('handschoenen') && fallbackTitle.includes('handschoenen'))
        || (remoteTitle.includes('zichtbaarheid') && fallbackTitle.includes('zichtbaarheid'));
    }) || fallbackBlogs.find((blog) => (
      (title.toLowerCase().includes('leren motorkleding') && blog.id === 'helm-onderhoud')
      || (title.toLowerCase().includes('waterdicht') && blog.id === 'rijden-in-de-regen')
      || (title.toLowerCase().includes('helm, handschoenen') && blog.id === 'handschoenen-kiezen')
      || (title.toLowerCase().includes('lange motorrit') && blog.id === 'zomercollectie')
      || (title.toLowerCase().includes('tussenseizoen') && blog.id === 'zichtbaarheid-op-de-motor')
    ));

    return {
      id: item.id || item._id || fields.slug || `webflow-blog-${index}`,
      title,
      intro: textWithoutHtml(fields.intro || fields['post-summary'] || ''),
      body: textWithoutHtml(fields.content || fields['post-body'] || fields['rich-text'] || '') || `Praktische informatie voor motorrijders. ${textWithoutHtml(fields.intro || fields['post-summary'] || '')}`,
      category: categoryName(fields.category || fields.categorie, categoryFromBlogTitle(title)),
      date: fields.date || fields['publish-date'] || '',
      image: imageSource(image) || fallbackBlog?.image || null,
    };
  });
}
