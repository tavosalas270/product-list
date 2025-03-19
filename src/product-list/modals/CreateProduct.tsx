import { TextField } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CreateProduct = () => {

  const { register, control, formState: { errors } } = useFormContext();

  return (
    <form>
        <div className='flex flex-col w-full h-full gap-y-3 mt-2'>
          <div className='flex flex-row gap-4 w-full'>
            <TextField id='input-code' {...register("code", { required: "El codigo es obligatorio" })}
              size='small' 
              error={!!errors.code}
              className='!w-1/2'
              slotProps={{
                formHelperText: {
                  sx: {margin: 0, fontWeight: 600}
                }
              }}
              helperText={typeof errors.code?.message === "string" ? errors.code.message : ""}
              label="Codigo" 
            />
            <TextField id='input-name' {...register("name", { required: "El nombre es obligatorio" })}
              size='small' 
              error={!!errors.name}
              className='!w-1/2'
              slotProps={{
                formHelperText: {
                  sx: {margin: 0, fontWeight: 600}
                }
              }}
              helperText={typeof errors.name?.message === "string" ? errors.name.message : ""}
              label="Nombre" 
            />
          </div>
          <div className='flex flex-row gap-4 w-full'>
            <TextField id='input-quantity' type="number" {...register("quantity", { required: "La cantidad es obligatoria", validate: (value) => value > 0 || "La cantidad es obligatoria", valueAsNumber: true })}
              size='small' 
              error={!!errors.quantity}
              className='!w-1/2'
              slotProps={{
                formHelperText: {
                  sx: {margin: 0, fontWeight: 600}
                }
              }}
              helperText={typeof errors.quantity?.message === "string" ? errors.quantity.message : ""}
              label="Cantidad" 
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="creation"
                control={control}
                rules={{required: "La fecha es obligatoria"}}
                render={({ field, fieldState }) => (
                  <DatePicker
                    {...field}
                    className='w-1/2'
                    label="Creación"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date ? date.format("MM/DD/YYYY") : "")}
                    maxDate={dayjs().endOf("day")}
                    slotProps={{
                      textField: {
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                        InputProps: {
                          size: "small",
                          disabled: true,
                          sx: {
                            "& .MuiInputBase-input.Mui-disabled": {
                                color: "black",
                                WebkitTextFillColor: "black"
                            },
                          },
                        },
                        InputLabelProps: {
                          sx: {
                            transform: 'translate(8px, 10px)',
                            lineHeight: '1.5',
                            '&.MuiInputLabel-shrink': {
                                transform: 'translate(14px, -9px) scale(0.75)',
                            },
                          }
                        },
                      }
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <TextField id='input-description' {...register("description", { required: "La descripción es obligatoria" })}
            size='small' 
            error={!!errors.description}
            slotProps={{
              formHelperText: {
                sx: {margin: 0, fontWeight: 600}
              }
            }}
            multiline
            rows={4}
            helperText={typeof errors.description?.message === "string" ? errors.description.message : ""}
            label="Descripción" 
          />
        </div>
    </form>
    
  )
}

export default CreateProduct
