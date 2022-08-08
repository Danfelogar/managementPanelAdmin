import { useContext, useRef, useState } from 'react'
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
    FormLabel,
    Chip,
    Card,
    CardMedia,
    CardActions,
    TextFieldProps,
} from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import CloseIcon from '@mui/icons-material/Close'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import SaveIcon from '@mui/icons-material/Save'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import { UIContext } from '../../../context'
import { useOTs } from '../../../hooks'
import { WrapperModalHeaderOT, WrapperModalOT } from '../styles'

export const ModalOTs = () => {
    const { toggleModalOTs, isModalOTsOpen } = useContext(UIContext)

    const { handleUpdateOT } = useOTs()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [value, setValue] = useState<Date | null>(new Date('2014-08-18T21:11:54'))

    const handleChange = (newValue: Date | null) => {
        setValue(newValue)
    }

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
            open={isModalOTsOpen}
            onClose={toggleModalOTs}
        >
            <Box sx={WrapperModalOT}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <WrapperModalHeaderOT sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
                        <Typography variant="h5">Editar OT</Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton color="error" sx={{ border: 1, ml: 1 }} onClick={toggleModalOTs}>
                            <CloseIcon />
                        </IconButton>
                    </WrapperModalHeaderOT>
                    <Grid container>
                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Maquina a realizar mantenimiento</InputLabel>
                                <Select
                                    id="demo-simple-select"
                                    label="Maquina a realizar mantenimiento"
                                    labelId="demo-simple-select-label"
                                    value={''}
                                >
                                    <MenuItem value={'MAQ1'}>MAQ1</MenuItem>
                                    <MenuItem value={'MAQ2'}>MAQ2</MenuItem>
                                    <MenuItem value={'MAQ3'}>MAQ3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <TextField fullWidth id="outlined-basic" label="Repuesto a necesitar" />
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <TextField fullWidth id="outlined-basic" label="Encargado del mantenimiento" />
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Estado de la OT</InputLabel>
                                <Select
                                    id="demo-simple-select"
                                    label="Estado de la OT"
                                    labelId="demo-simple-select-label"
                                    value={''}
                                >
                                    <MenuItem value={'Pendiente'}>Pendiente</MenuItem>
                                    <MenuItem value={'En Progreso'}>En Progreso</MenuItem>
                                    <MenuItem value={'Finalizada'}>Finalizada</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <TextField fullWidth id="outlined-basic" label="Numero de orden de compra" />
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2, display: { xs: 'none', md: 'flex' } }} xs={12}>
                            <DesktopDatePicker
                                disableMaskedInput
                                inputFormat="DD/MM/YYYY"
                                label="Fecha de expedición"
                                renderInput={(params: TextFieldProps) => (
                                    <TextField {...params} sx={{ width: '100%' }} />
                                )}
                                value={value}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2, display: { xs: 'flex', md: 'none' } }} xs={12}>
                            <MobileDatePicker
                                disableMaskedInput
                                inputFormat="DD/MM/YYYY"
                                label="Fecha de expedición"
                                renderInput={(params: TextFieldProps) => (
                                    <TextField {...params} sx={{ width: '100%' }} />
                                )}
                                value={value}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <TextField fullWidth id="outlined-basic" label="Tiempo de Ejecución" />
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2, display: { xs: 'none', md: 'flex' } }} xs={12}>
                            <DesktopDatePicker
                                disableMaskedInput
                                inputFormat="DD/MM/YYYY"
                                label="Fecha de cierre"
                                renderInput={(params: TextFieldProps) => (
                                    <TextField {...params} sx={{ width: '100%' }} />
                                )}
                                value={value}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2, display: { xs: 'flex', md: 'none' } }} xs={12}>
                            <MobileDatePicker
                                disableMaskedInput
                                inputFormat="DD/MM/YYYY"
                                label="Fecha de cierre"
                                renderInput={(params: TextFieldProps) => (
                                    <TextField {...params} sx={{ width: '100%' }} />
                                )}
                                value={value}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2, display: 'flex', flexDirection: 'row' }} xs={11}>
                            <Box display="flex" flexDirection="column" sx={{ width: '50%', pr: 2 }}>
                                <FormLabel sx={{ mb: 1 }}>Image</FormLabel>
                                <Button
                                    fullWidth
                                    color="secondary"
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
                                    sx={{ mb: 3 }}
                                    variant="contained"
                                >
                                    Upload
                                    <input hidden multiple accept="image/*" type="file" />
                                </Button>
                                {/* <Button
                                    fullWidth
                                    color="secondary"
                                    startIcon={<CloudUploadIcon />}
                                    sx={{ mb: 3 }}
                                    //si el input existe con la ref le daremos click
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    Actualizar imagen
                                </Button>
                                <input
                                    ref={fileInputRef}
                                    multiple
                                    accept="image/png, image/gif, image/jpeg"
                                    style={{ display: 'none' }}
                                    type="file"
                                    //cuando cambie vamos a empezar el procedimiento de la carga de las imgs
                                    // onChange={ onFilesSelected }
                                /> */}
                                <Chip
                                    color="error"
                                    label="At least 2 images are required"
                                    sx={{ display: 'flex' }}
                                    variant="outlined"
                                />
                            </Box>

                            <Box display="flex" flexDirection="column" sx={{ width: '50%', pl: 2 }}>
                                <Card sx={{ width: '100%', height: '100%' }}>
                                    <CardMedia
                                        alt="img demo"
                                        className="fadeIn"
                                        //determinamos si tenemos un url y si viene con https:// mostramos la img de cloudinary y si no la que tenemos en nuestros archivos locacles
                                        component="img"
                                        image="https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp"
                                    />
                                    <CardActions>
                                        <Button
                                            // onClick={() => onDeleteImage(img)}
                                            fullWidth
                                            color="error"
                                        >
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Box>
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                id="outlined-multiline-flexible"
                                label="Tareas"
                                maxRows={7}
                            />
                        </Grid>
                        <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                id="outlined-multiline-flexible"
                                label="Comentario"
                                maxRows={7}
                            />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ p: 2 }}>
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button
                                color="secondary"
                                startIcon={<SaveIcon />}
                                variant="outlined"
                                onClick={handleUpdateOT}
                            >
                                Guardar cambios
                            </Button>
                        </Box>
                    </Grid>
                </LocalizationProvider>
            </Box>
        </Modal>
    )
}
