import { useState, useCallback, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import BrandsTable from '../../components/views/home/BrandsTable';
import { getBrands, createBrand, updateBrand, deleteBrand } from '../../services/brand';
import { IBrand } from '../../types/brand';
import HomeDrawer from '../../components/views/home/Drawer';
import BrandForm from '../../components/views/home/BrandForm';

const newBrandData = {
  "brandName": "",
  "brandArabicName": "",
  "image": "",
  "brandCode": "",
  "isActive": true
}

const Home = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<IBrand|null>(null);
  const [newBrand, setNewBrand] = useState<Omit<IBrand, 'id'>|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSidebarPinned, setIsSidebarPinned] = useState<boolean>(!!window.localStorage.getItem("pinnedSidebar"));

  useEffect(() => {
    if (isSidebarPinned) {
      window.localStorage.setItem('pinnedSidebar', 'true')
    } else {
      window.localStorage.removeItem('pinnedSidebar');
    }
  },[isSidebarPinned])
  
  const getBrandsData = useCallback(async() => {
    try {
      setIsLoading(true);
      const response = await getBrands();
      setBrands(
        response.data.data.map(
          (data: IBrand) => ({...data, brandArabicName: data.brandArabicName ? data.brandArabicName : ""})
        )
      )
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  },[])

  useEffect(() => {
    getBrandsData()
  },[getBrandsData])

  const handleRowClick = (rowData: IBrand) => {
    setSelectedBrand(rowData)
  }

  const updateBrandDetails = useCallback(async(brandData: IBrand) => {
    try {
      setIsLoading(true);
      await updateBrand(brandData);
      setSelectedBrand(null);
      getBrandsData();
    } catch (error) {
      setIsLoading(false);
    }
  }, [getBrandsData])

  const createNewBrand = useCallback(async(brandData: Omit<IBrand, 'id'>) => {
    try {
      setIsLoading(true);
      await createBrand(brandData);
      setNewBrand(null);
      getBrandsData();
    } catch (error) {
      setIsLoading(false);
    }
  }, [getBrandsData])

  const deleteBrandData = useCallback(async(id: string) => {
    try {
      setIsLoading(true);
      await deleteBrand({id});
      getBrandsData();
    } catch (error) {
      setIsLoading(false);
    }
  }, [getBrandsData])

  const handlePinClick = useCallback(() => { setIsSidebarPinned(prevState => !prevState)},[]);

  const handleClose = useCallback(() => { 
    setIsSidebarPinned(false);
    setSelectedBrand(null);
  },[]);

  const handleDeleteIconClick = useCallback((brandId: string) => {
    deleteBrandData(brandId)
  },[deleteBrandData])

  return (
    <div className='flex flex-col gap-2 px-6'>
      <div className='flex justify-between'>
        <h3 className='text-lg'>Brands</h3>
        <button 
          type="button" 
          onClick={() => {setNewBrand(newBrandData)}}
          className="cursor-pointer bg-gray-500 hover:bg-gray-700 text-white py-4 px-4 rounded-md">
            Add brand
          </button>
          <Dialog
            open={!!newBrand}
            onClose={() => {setNewBrand(null)}}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Add new brand</DialogTitle>
            <DialogContent>
              <BrandForm data={newBrand} onSubmit={createNewBrand} />
            </DialogContent>
          </Dialog>
      </div>
      <div>
        <div>
          <BrandsTable
            data={brands}
            handleRowClick={handleRowClick}
            handleDeleteIconClick={handleDeleteIconClick}
            selectedBrand={selectedBrand}
            />
        </div>
        <HomeDrawer
          isPinned={isSidebarPinned}
          isOpen={!!selectedBrand || isSidebarPinned}
          handlePinClick={handlePinClick}
          handleClose={handleClose}
        >
          {selectedBrand ? (
            <div className='px-2 py-4'>
              <h4 className='mt-2 mb-1 text-xl'>Update brand</h4>
              <BrandForm data={selectedBrand} onSubmit={updateBrandDetails} />
            </div>
          ): <span className='p-2'>"No brand selected"</span>}
        </HomeDrawer>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default Home;
