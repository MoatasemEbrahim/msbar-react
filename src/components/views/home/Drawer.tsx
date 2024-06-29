import { FC, PropsWithChildren } from 'react'
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import PushPinIcon from '@mui/icons-material/PushPin';
export const drawerWidth = 400;

interface IDrawer {
  isOpen: boolean;
  isPinned: boolean;
  handlePinClick: () => void;
  handleClose: () => void;
}
const HomeDrawer:FC<PropsWithChildren<IDrawer>> = ({ isOpen, isPinned, handlePinClick, handleClose, children }) => {
  return (
    <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={isOpen}
      >
        <div className='flex justify-end gap-2 py-2 px-1'>
          <PushPinIcon className='cursor-pointer' color={isPinned ? 'primary' : 'disabled'} onClick={handlePinClick} />
          <CloseIcon className='cursor-pointer' color='action' onClick={handleClose} />
        </div>
       {children}
      </Drawer>
  )
}

export default HomeDrawer;
