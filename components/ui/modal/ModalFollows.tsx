import { useContext, useRef } from 'react'
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
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import { WrapperModalHeaderFollow, WrapperModalFollow } from '../styles'
import { UIContext } from '../../../context'
import { useFollows } from '../../../hooks'

export const ModalFollows = () => {
    const { toggleModalFollows, isModalFollowsOpen } = useContext(UIContext)
    const { handleUpdateFollow } = useFollows()
    const fileInputRef = useRef<HTMLInputElement>(null)

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
            open={isModalFollowsOpen}
            onClose={toggleModalFollows}
        >
            <Box sx={WrapperModalFollow}>
                <WrapperModalHeaderFollow sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
                    <Typography variant="h5">Editar Seguimiento</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="error" sx={{ border: 1, ml: 1 }} onClick={toggleModalFollows}>
                        <CloseIcon />
                    </IconButton>
                </WrapperModalHeaderFollow>
                <Grid container>
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
                        <TextField fullWidth multiline id="outlined-multiline-flexible" label="Comentario" maxRows={7} />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Estado de la maquina" variant="outlined" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Nombre completo del observador" variant="outlined" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Tiempo de Funcionamiento" variant="outlined" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Tiempo de Reaparición" variant="outlined" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Maquina de Relación</InputLabel>
                            <Select
                                id="demo-simple-select"
                                label="Maquina de Relación"
                                labelId="demo-simple-select-label"
                                value={''}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container sx={{ p: 2 }}>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button color="secondary" startIcon={<SaveIcon />} variant="outlined" onClick={handleUpdateFollow}>
                            Guardar cambios
                        </Button>
                    </Box>
                </Grid>
            </Box>
        </Modal>
    )
}
