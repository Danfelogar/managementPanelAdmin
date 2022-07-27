import { useContext } from 'react'
import {
    Modal,
    Backdrop,
    Box,
    Typography,
    IconButton,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'

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
                    <Typography variant="h5">Editar usuario</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="error" sx={{ border: 1, ml: 1 }} onClick={toggleModalUsers}>
                        <CloseIcon />
                    </IconButton>
                </WrapperModalHeaderUser>
                <Grid container>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Nombre Completo" variant="outlined" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="email" variant="outlined" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Contraseña" variant="outlined" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                            <Select id="demo-simple-select" label="Rol" labelId="demo-simple-select-label" value={''}>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container sx={{ p: 2 }}>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button color="secondary" startIcon={<SaveIcon />} variant="outlined">
                            Guardar cambios
                        </Button>
                    </Box>
                </Grid>
            </Box>
        </Modal>
    )
}
