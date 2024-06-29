import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Switch from '@mui/material/Switch';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IBrand } from '../../../types/brand';
import { useMemo } from 'react';

interface IBrandTable {
  data: IBrand[];
  selectedBrand: IBrand | null;
  page?: number;
  pageSize?: number;
  handleRowClick: (row: IBrand) => void;
  handleDeleteIconClick: (id: string) => void;
}

const BrandsTable = ({ data, handleRowClick, handleDeleteIconClick, selectedBrand, page = 0, pageSize = 10, }: IBrandTable) => {

  const columns: GridColDef[] = useMemo(() => [
    { field: 'brandCode', headerName: 'Brand Code', minWidth: 150, flex: 1 },
    { field: 'brandName', headerName: 'Brand name', minWidth: 150, flex: 1 },
    { field: 'brandArabicName',
      headerName: 'Brand Arabic Name',
      minWidth: 150,
      flex: 1,
      valueGetter: (value, row) => value === null ? "No name" : value,
  },
    {
      field: 'image',
      headerName: 'Image',
      minWidth: 150,
      flex: 1,
      renderCell: (params) => <img alt={params.row.brandName} src={params.row.image} width={80} height={80} />,
    },
    {
      field: 'isActive',
      headerName: 'Active',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      minWidth: 150,
      flex: 1,
      renderCell: (params) => <Switch checked={params.row.isActive} onChange={undefined} />,
    },
    {
      field: 'Actions',
      headerName: 'Actions',
      minWidth: 80,
      flex: 1,
      renderCell: (params) => (
      <DeleteForeverIcon 
        onClick={(e) => {
          e.stopPropagation()
          handleDeleteIconClick(params.row.id)
        }} 
      className='cursor-pointer' color='action' />
    ),
    },
  ],[handleDeleteIconClick]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        disableMultipleRowSelection
        onCellClick={({row}) => { handleRowClick(row.id === selectedBrand?.id ? null : row)}}
        initialState={{
          pagination: {
            paginationModel: { page, pageSize },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
      />
    </div>
  );
}

export default BrandsTable;
