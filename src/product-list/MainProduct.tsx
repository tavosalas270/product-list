import {ReactNode, useState, useMemo} from 'react';
import { Product } from '../interfaces';
import { ProductContext } from '../contexts';

interface ChildrenProp {
  children: ReactNode
}

const MainProduct = ({children}: ChildrenProp) => {

  const [productList, setProductList] = useState<Product[]>([]);
  const [keySelected, setKeySelected] = useState<keyof Product>("code");
  const [valueWrote, setValueWrote] = useState<string | number>("");

  const handleSubmit = (product:Product) => {
    setProductList(prevList => [...prevList, product]);
  }

  const handleFilterKey = (key: keyof Product) => {
    setKeySelected(key);
  }

  const handleFilterValue = (value: string | number) => {
    setValueWrote(value)
  }

  const handleRemove = (code:string) => {
    setProductList(prevList => prevList.filter(product => product.code !== code));
  }

  const providerValue = useMemo(
    () => ({
      handleSubmit,
      handleFilterKey,
      handleFilterValue,
      handleRemove,
      keySelected,
      valueWrote,
      productList,
    }),
    [productList, keySelected, valueWrote]
  );

  return (
    <div className='w-full h-full flex flex-col gap-y-2 p-2'>
      <ProductContext.Provider value={providerValue}>{children}</ProductContext.Provider>
    </div>
  )
}

export default MainProduct
