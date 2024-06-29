import { IBrand } from "../types/brand"
import { axiosInstance } from "../utils/axios"

export const getBrands = async() => {
  return await axiosInstance.get('/Brand/Brands')
}

export const createBrand = async(brandData: Omit<IBrand, 'id'>) => {
  return await axiosInstance.post('/Brand/newBrand', brandData)
}

export const updateBrand = async(brandData: IBrand) => {
  return await axiosInstance.put(`/Brand/updateBrand/${brandData.id}`, brandData)
}

export const deleteBrand = async({id}: { id: string }) => {
  return await axiosInstance.delete(`/Brand/deleteBrand/${id}`)
}
