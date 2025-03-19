import { createContext } from "react";
import { ProductProvider } from "../interfaces";

export const ProductContext = createContext<ProductProvider>({} as ProductProvider);