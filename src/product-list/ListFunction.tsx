import {useState, useContext} from 'react'
import { ProductContext } from '../contexts';
import { FormProvider, useForm } from "react-hook-form";
import { Dialog, DialogTitle, DialogActions, DialogContent, IconButton, FormControl, InputLabel, Button, OutlinedInput, InputAdornment, Menu, MenuItem } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Option, Product } from '../interfaces';
import CreateProduct from './modals/CreateProduct';

const ListFunction = () => {

  const {handleSubmit, keySelected, handleFilterKey, handleFilterValue} = useContext(ProductContext)

  const options:{ id: keyof Product; description: string }[] = [
    {id:"code", description: "Codigo"}, 
    {id:"name", description: "Nombre"}, 
    {id:"quantity", description: "Cantidad"}, 
    {id:"creation", description: "Creación"}
  ]

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  const [filterOption, setFilterOption] = useState<Option>(options[0]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleSelect = (option:Option) => {
    setFilterOption(option)
    setAnchor(null)
    handleFilterKey(option.id)
  }

  const methods = useForm<Product>({
    mode: "onChange",
    defaultValues: {
      code: "",
      name: "",
      description: "",
      quantity: 0,
      creation: "",
    },
  });

  const onSubmit = (data: Product) => {
    setOpenDialog(false);
    handleSubmit(data)
  };

  return (
    <div className='flex justify-between items-center w-full h-full'>
      <FormProvider {...methods}>
        <Dialog open={openDialog} classes={{paper: "!max-w-1/2 !w-1/2"}}>
          <DialogTitle className='flex justify-between w-full items-center !py-1'>
            <p className='mb-0 font-normal'>Crear Producto</p>
            <IconButton color="inherit" onClick={() => setOpenDialog(!openDialog)} aria-label="close">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <CreateProduct />
          </DialogContent>
          <DialogActions>
            <Button disabled={!methods.formState.isValid} onClick={methods.handleSubmit((data) => {onSubmit(data); methods.reset();})} variant='contained' className='!bg-[#6e60a9] disabled:!bg-gray-200 disabled:!border-[1px] !capitalize'>Guardar Producto</Button>
          </DialogActions>
        </Dialog>
      </FormProvider>
      <Button onClick={() => setOpenDialog(!openDialog)} variant='contained' className='!bg-[#6e60a9] !capitalize'>Crear Producto</Button>
      <div className="flex gap-2 h-full items-center">
        <Button id="menu-button" onClick={(e) => setAnchor(e.currentTarget)} variant='outlined' className="!border-gray-400 !text-black !capitalize" startIcon={<FilterListIcon />}>Filtrar por {filterOption.description}</Button>
        <Menu
          id="menu-options"
          anchorEl={anchor}
          open={open}
          onClose={() => setAnchor(null)}
          slotProps={{
            list: {
              'aria-labelledby': 'menu-button',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem selected={option.id === filterOption.id} key={option.id} onClick={() => handleSelect(option)}>{option.description}</MenuItem>
          ))}
        </Menu>
        <FormControl size="small">
          <InputLabel htmlFor="search-products">Buscar Productos</InputLabel>
          <OutlinedInput
            type={keySelected !== "quantity" ? "string" : "number"}
              onChange={(e) => handleFilterValue(e.target.value)}
              id="search-products"
              startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
              label="Buscar Productos"
          />
        </FormControl>
      </div>
    </div>
  )
}

export default ListFunction
