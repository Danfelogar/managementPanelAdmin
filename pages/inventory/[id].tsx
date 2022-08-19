import { GetServerSideProps, NextPage } from 'next'
import EditIcon from '@mui/icons-material/Edit'
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import {
    FormControl,
    Grid,
    InputLabel,
    Select,
    MenuItem,
    Button,
    FormLabel,
    Chip,
    Card,
    CardMedia,
    CardActions,
    TextField,
    TextFieldProps,
    Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { getSession } from 'next-auth/react'

import { AdminLayout } from '../../components'
import { IInventario, ITheme } from '../../interface'
import { Inventario } from '../../models'
import { dbInventories } from '../../database'

const testImg = [1, 2]

interface Props extends ITheme {
    inventory: IInventario
}

const SingeInventoryPage: NextPage<Props> = ({ toggleTheme, inventory }) => {
    const [value, setValue] = useState<Date | null>(new Date('2014-08-18T21:11:54'))

    const handleChange = (newValue: Date | null) => {
        console.log({ newValue })
        setValue(newValue)
    }

    console.log({ inventory })

    return (
        <AdminLayout
            icon={<EditIcon color="secondary" />}
            subTitle={'Edicion de Inventario: test'}
            title={'Inventario'}
            toggleTheme={toggleTheme}
        >
            <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
                <Button
                    color="primary"
                    startIcon={<SaveAsOutlinedIcon />}
                    // disabled={isSaving}
                    sx={{ width: '150px' }}
                    type="submit"
                    variant="contained"
                >
                    Guardar
                </Button>
            </Box>
            <Grid container spacing={2}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tipo de inventario</InputLabel>
                            <Select
                                id="demo-simple-select"
                                label="Tipo de inventario"
                                labelId="demo-simple-select-label"
                                value={''}
                            >
                                <MenuItem value={'maquina'}>Maquina</MenuItem>
                                <MenuItem value={'repuesto'}>Repuesto</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Nombre" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2, display: 'flex', flexDirection: 'row' }} xs={12}>
                        <Box display="flex" flexDirection="column" sx={{ width: '50%', pr: 2 }}>
                            <FormLabel sx={{ mb: 1 }}>Image del codigo QR</FormLabel>
                            <Button
                                fullWidth
                                color="secondary"
                                component="label"
                                startIcon={<CloudUploadIcon />}
                                sx={{ mb: 3 }}
                                variant="contained"
                            >
                                Actualizar
                                <input hidden multiple accept="image/*" type="file" />
                            </Button>
                            <Chip
                                color="error"
                                label="At least 2 images are required"
                                sx={{ display: 'flex' }}
                                variant="outlined"
                            />
                        </Box>
                        <Box display="flex" flexDirection="column" sx={{ pl: 2 }}>
                            <Card sx={{ width: '100%', height: '100%', maxWidth: '100px' }}>
                                <CardMedia
                                    alt="img demo"
                                    className="fadeIn"
                                    //determinamos si tenemos un url y si viene con https:// mostramos la img de cloudinary y si no la que tenemos en nuestros archivos locacles
                                    component="img"
                                    image="https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp"
                                />
                                <CardActions sx={{ display: 'flex' }}>
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
                        {/* {testImg.map((test, idx) => (
                    <Box key={idx} display="flex" flexDirection="column" sx={{ pl: 2 }}>
                        <Card sx={{ width: '100%', height: '100%', maxWidth: '100px' }}>
                            <CardMedia
                                alt="img demo"
                                className="fadeIn"
                                //determinamos si tenemos un url y si viene con https:// mostramos la img de cloudinary y si no la que tenemos en nuestros archivos locacles
                                component="img"
                                image="https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp"
                            />
                            <CardActions sx={{ display: 'flex' }}>
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
                ))} */}
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                            <Select
                                id="demo-simple-select"
                                label="Estado"
                                labelId="demo-simple-select-label"
                                value={''}
                            >
                                <MenuItem value={'malo'}>Malo</MenuItem>
                                <MenuItem value={'regular'}>Regular</MenuItem>
                                <MenuItem value={'bueno'}>Bueno</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} xs={12}>
                        <Box display="flex" flexDirection="column" sx={{ width: '50%', pr: 2 }}>
                            <FormLabel sx={{ mb: 1 }}>Images</FormLabel>
                            <Button
                                fullWidth
                                color="secondary"
                                component="label"
                                startIcon={<CloudUploadIcon />}
                                sx={{ mb: 3 }}
                                variant="contained"
                            >
                                Actualizar
                                <input hidden multiple accept="image/*" type="file" />
                            </Button>
                            <Chip
                                color="error"
                                label="At least 2 images are required"
                                sx={{ display: 'flex' }}
                                variant="outlined"
                            />
                        </Box>

                        {testImg.map((test, idx) => (
                            <Box key={idx} display="flex" flexDirection="column" sx={{ pl: 2 }}>
                                <Card sx={{ width: '100%', height: '100%', maxWidth: '100px', m: 0.3 }}>
                                    <CardMedia
                                        alt="img demo"
                                        className="fadeIn"
                                        //determinamos si tenemos un url y si viene con https:// mostramos la img de cloudinary y si no la que tenemos en nuestros archivos locacles
                                        component="img"
                                        image="https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp"
                                    />
                                    <CardActions sx={{ display: 'flex' }}>
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
                        ))}
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                            <Select
                                id="demo-simple-select"
                                label="Estado"
                                labelId="demo-simple-select-label"
                                value={''}
                            >
                                <MenuItem value={'malo'}>Malo</MenuItem>
                                <MenuItem value={'regular'}>Regular</MenuItem>
                                <MenuItem value={'bueno'}>Bueno</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2, display: { xs: 'none', md: 'flex' } }} xs={12}>
                        <DesktopDatePicker
                            disableMaskedInput
                            inputFormat="DD/MM/YYYY"
                            label="Fecha de Entrada"
                            renderInput={(params: TextFieldProps) => <TextField {...params} sx={{ width: '100%' }} />}
                            value={value}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2, display: { xs: 'flex', md: 'none' } }} xs={12}>
                        <MobileDatePicker
                            disableMaskedInput
                            inputFormat="DD/MM/YYYY"
                            label="Fecha de Entrada"
                            renderInput={(params: TextFieldProps) => <TextField {...params} sx={{ width: '100%' }} />}
                            value={value}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2, display: { xs: 'none', md: 'flex' } }} xs={12}>
                        <DesktopDatePicker
                            disableMaskedInput
                            inputFormat="DD/MM/YYYY"
                            label="Fecha de Actualización"
                            renderInput={(params: TextFieldProps) => <TextField {...params} sx={{ width: '100%' }} />}
                            value={value}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2, display: { xs: 'flex', md: 'none' } }} xs={12}>
                        <MobileDatePicker
                            disableMaskedInput
                            inputFormat="DD/MM/YYYY"
                            label="Fecha de Actualización"
                            renderInput={(params: TextFieldProps) => <TextField {...params} sx={{ width: '100%' }} />}
                            value={value}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item sx={{ pl: 0, pt: 0 }} xs={12}>
                        <Typography sx={{ fontWeight: '700', display: 'flex', alignItems: 'center' }} variant="h5">
                            Maquina
                        </Typography>
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Identificador de maquina" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Capacidad nominal" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Serie" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Marca" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Voltaje" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Corriente" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            id="outlined-multiline-flexible"
                            label="Observaciones Generales"
                            maxRows={7}
                        />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth multiline id="outlined-multiline-flexible" label="IND" maxRows={7} />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Locación" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Sublocación" />
                    </Grid>
                    <Grid item sx={{ pl: 0, pt: 0 }} xs={12}>
                        <Typography sx={{ fontWeight: '700', display: 'flex', alignItems: 'center' }} variant="h5">
                            Repuesto
                        </Typography>
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Identificador de repuesto" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Existencia" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Coordenadas GPS" />
                    </Grid>
                    <Grid item md={5.5} sx={{ m: 2 }} xs={12}>
                        <TextField fullWidth id="outlined-basic" label="Maquina de relación" />
                    </Grid>
                </LocalizationProvider>
            </Grid>
        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req })

    // console.log('catch ===>', query)
    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=${req.url}`,
                permanent: false,
            },
        }
    }

    const { id = '' } = query

    console.log('id ===>', id)

    let inventory: IInventario | null

    if (id === 'new') {
        //crear inventario
        //al crearme un nuevo objeto crea con sus valores por defecto y crea los arreglos sin necesidad de colocar valores erroneos
        const tempInventory = JSON.parse(JSON.stringify(new Inventario()))

        console.log('catch ===>', tempInventory)
        delete tempInventory._id
        // tempInventory.imagenes = ['img1.jpg', 'img2.jpg']
        inventory = tempInventory
    } else {
        inventory = await dbInventories.getProductById(id.toString())
    }
    console.log('inventory ===>', inventory)
    if (!inventory) {
        return {
            redirect: {
                destination: '/admin/inventory',
                permanent: false,
            },
        }
    }

    return {
        props: {
            inventory,
        },
    }
}

export default SingeInventoryPage
