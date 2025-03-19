import {useContext} from 'react'
import { ProductContext } from '../contexts'
import { IconButton } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const List = () => {

  const {productList, keySelected, valueWrote, handleRemove} = useContext(ProductContext)

  const filteredProducts = valueWrote !== "" && valueWrote !== 0
  ? productList.filter((item) => {
    if (keySelected === "quantity") {
      return Number(item[keySelected]) >= Number(valueWrote)
    } else {
      return String(item[keySelected]).toLowerCase().includes(String(valueWrote).toLowerCase())
    }
  })
  : productList;

  return (
    <div className='h-full w-full'>
      <table className='w-full'>
        <thead className='bg-[#f5f4f9] z-50 sticky top-0'>
            <tr>
              <th className='py-2'><p className="mb-0 text-center font-semibold">Codigo</p></th>
              <th><p className="mb-0 text-center font-semibold">Nombre</p></th>
              <th><p className="mb-0 text-center font-semibold">Descripción</p></th>
              <th><p className="mb-0 text-center font-semibold">Cantidad</p></th>
              <th><p className="mb-0 text-center font-semibold">Creación</p></th>
              <th><p className="mb-0 text-center font-semibold">¿Eliminar?</p></th>
            </tr>
        </thead>
        <tbody>
            {filteredProducts.map((item) => (
              <tr key={item.code} className='bg-white'>
                <td className='py-2'><p className="text-center">{item.code}</p></td>
                <td><p className="text-center">{item.name}</p></td>
                <td><p className="text-center">{item.description}</p></td>
                <td><p className="text-center">{item.quantity}</p></td>
                <td><p className="text-center">{item.creation}</p></td>
                <td>
                  <div className='w-full flex justify-center'>
                    <IconButton color="inherit" aria-label="delete" onClick={() => handleRemove(item.code)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </div>
                  
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default List
