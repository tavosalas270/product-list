export interface Product {
    code: string;
    name: string;
    description: string;
    quantity: number;
    creation: string;
}

export interface ProductProvider {
    handleSubmit: (product:Product) => void;
    handleFilterKey: (key: keyof Product) => void;
    handleFilterValue: (value: string | number) => void;
    handleRemove: (code: string) => void;
    keySelected: keyof Product;
    valueWrote: string | number;
    productList: Product[]
}

export interface Option {
    id: keyof Product;
    description: string;
}