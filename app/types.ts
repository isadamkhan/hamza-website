export type ApiProduct = {
  _id: string;
  title: string;
  description: string;
  price: number;
  size: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
};
