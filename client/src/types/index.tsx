export interface Product {
  name: string;
  brand: string;
  link: string;
  imageUrl: string;
  imageId: string;
}

export interface SearchResponse {
  products: Product[];
  searchUrl: string;
}

export interface Banner {
  id: string;
  name: string;
  logo: string;
}
