import { createContext, useContext, useEffect, useState } from 'react';
import { products as fallbackProducts, productCategories as fallbackProductCategories } from '../data/products';
import { blogs as fallbackBlogs, blogCategories as fallbackBlogCategories } from '../data/blogs';
import { getWebflowBlogs, getWebflowProducts } from '../services/webflowApi';

const CatalogContext = createContext();

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState(fallbackProducts);
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [isRemoteContent, setIsRemoteContent] = useState(false);

  useEffect(() => {
    async function loadCatalog() {
      const [productsResult, blogsResult] = await Promise.allSettled([
          getWebflowProducts(),
          getWebflowBlogs(),
      ]);

      if (productsResult.status === 'fulfilled') {
        const remoteProducts = productsResult.value;
        if (remoteProducts.length) setProducts(remoteProducts);
      }

      if (blogsResult.status === 'fulfilled') {
        const remoteBlogs = blogsResult.value;
        if (remoteBlogs.length) setBlogs(remoteBlogs);
      }

      setIsRemoteContent(
        productsResult.status === 'fulfilled' || blogsResult.status === 'fulfilled',
      );
    }

    loadCatalog();
  }, []);

  const productCategories = ['Alle', ...new Set(products.map((item) => item.category).filter(Boolean))];
  const blogCategories = ['Alle', ...new Set(blogs.map((item) => item.category).filter(Boolean))];

  return (
    <CatalogContext.Provider value={{
      products,
      blogs,
      productCategories: productCategories.length > 1 ? productCategories : fallbackProductCategories,
      blogCategories: blogCategories.length > 1 ? blogCategories : fallbackBlogCategories,
      isRemoteContent,
    }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  return useContext(CatalogContext);
}
