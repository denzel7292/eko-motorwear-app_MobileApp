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
  return category || fallback;
}

export async function getWebflowProducts() {
  const data = await request(`/sites/${siteId}/products`);

  return (data.items || []).map((item) => {
    const fields = item.fieldData || {};
    const sku = item.skus?.[0] || {};
    const image = fields['main-image'] || fields.mainImage || fields.image;

    return {
      id: item.id,
      name: fields.name || 'EKO product',
      category: categoryName(fields.category, 'Producten'),
      description: textWithoutHtml(fields.description || ''),
      fullDescription: textWithoutHtml(fields['full-description'] || fields.description || ''),
      price: euroPrice(sku.price?.value ?? sku.price),
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

  return (data.items || []).map((item) => {
    const fields = item.fieldData || {};
    const image = fields.image || fields['main-image'];

    return {
      id: item.id,
      title: fields.name || 'EKO blog',
      intro: textWithoutHtml(fields.intro || ''),
      body: textWithoutHtml(fields.content || fields['rich-text'] || ''),
      category: categoryName(fields.category, 'Inspiratie'),
      date: fields.date || fields['publish-date'] || '',
      image: imageSource(image),
    };
  });
}
