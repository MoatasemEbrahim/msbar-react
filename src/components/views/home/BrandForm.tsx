import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IBrand } from '../../../types/brand';
import Switch from '@mui/material/Switch';

const schema = z.object({
  id: z.number().optional(),
  brandCode: z.string().trim().min(1, "Please enter your brand code"),
  brandName: z.string().trim().min(1, "Please enter your brand name"),
  brandArabicName: z.string().trim().optional(),
  image: z.string().url().optional(),
  isActive: z.boolean(),
});

const BrandForm = ({ data, onSubmit }: {data: IBrand | null, onSubmit: (formData:any) => void}) => {
  const { register, handleSubmit , formState: { errors }, setValue, reset, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {...(data ? {...data} : {})}
});

  const isActive = watch('isActive'); 
  
  // reinitialize the form with new values on clicking another row.
  useEffect(() => {
    if (data) {
      reset(data)
    }
  },[data, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
      <div className='py-2 flex flex-col'>
        <label htmlFor="brandCode" className="text-sm font-medium">
          Code:
        </label>
        <input
          id="brandCode"
          {...register('brandCode')}
          placeholder="Code"
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.brandCode && <span className="text-red-500 text-xs">{errors.brandCode.message}</span>}
      </div>
      <div className='py-2 flex flex-col'>
        <label htmlFor="brandName" className="text-sm font-medium">
          Brand name:
        </label>
        <input
          id="brandName"
          {...register('brandName')}
          placeholder="Brand name"
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.brandName && <span className="text-red-500 text-xs">{errors.brandName.message}</span>}
      </div>

      <div className='py-2 flex flex-col'>
        <label htmlFor="brandArabicName" className="text-sm font-medium">
          Brand Arabic name:
        </label>
        <input
          id="brandArabicName"
          {...register('brandArabicName')}
          placeholder="Brand Arabic name"
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.brandArabicName && <span className="text-red-500 text-xs">{errors.brandArabicName.message}</span>}
      </div>

      <div className='py-2 flex flex-col'>
        <label htmlFor="image" className="text-sm font-medium">
          Image URL:
        </label>
        <input
          id="image"
          {...register('image')}
          placeholder="Image URL"
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.image && <span className="text-red-500 text-xs">{errors.image.message}</span>}
      </div>

      <div className='py-2 flex flex-col'>
        <label htmlFor="isActive" className="text-sm font-medium">
          Active:
        </label>
        <Switch checked={isActive} onChange={(_, newValue) => {setValue('isActive', newValue)}}/>
        {errors.isActive && <span className="text-red-500 text-xs">{errors.isActive.message}</span>}
      </div>

      <input type="submit" value="Submit" className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white py-4 px-4 rounded-md" />
    </form>
  );
};

export default BrandForm;
