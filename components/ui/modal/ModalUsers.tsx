import { useContext } from 'react'
import { Modal, Backdrop, Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { WrapperModalHeaderUser, WrapperModalUser } from '../styles'
import { UIContext } from '../../../context'

export const ModalUsers = () => {
    const { toggleModalUsers, isModalUsersOpen } = useContext(UIContext)

    return (
        <Modal
            closeAfterTransition
            keepMounted
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            aria-describedby="keep-mounted-modal-description"
            aria-labelledby="keep-mounted-modal-title"
            open={isModalUsersOpen}
            onClose={toggleModalUsers}
        >
            <Box sx={WrapperModalUser}>
                <WrapperModalHeaderUser sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
                    <Typography variant="h5">Crea un nuevo usuario</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="error" sx={{ border: 1, ml: 1 }} onClick={toggleModalUsers}>
                        <CloseIcon />
                    </IconButton>
                </WrapperModalHeaderUser>
            </Box>
        </Modal>
    )
}
