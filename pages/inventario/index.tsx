import { CardMedia, Chip, Grid, IconButton, Box, Container } from '@mui/material'
import { NextPage } from 'next'
import { Fragment, useContext } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { AdminLayout, ModalWarringDeleted, SnackbarError, SnackbarSuccess } from '../../components'
import { ITheme } from '../../interface'
import { UIContext } from '../../context'
import { useInventario } from '../../hooks'

const InventariosPage: NextPage<ITheme> = ({ toggleTheme }) => {
    const { toggleSnackBarError, toggleSnackBarSuccess, toggleModalInventario, isSnackbarError, isSnackbarSuccess } =
        useContext(UIContext)
    const { msmTextDelete, handleDeletedInventario, warningDeletedInventario } = useInventario()

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Identificación',
            width: 110,
        },
        {
            field: 'imgQR',
            headerName: 'Código QR',
            width: 230,
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <Box sx={{ displey: 'flex', flexGrow: 1 }}>
                        <CardMedia alt={row.id} component="img" image={`${row.imgQR}`} />
                    </Box>
                )
            },
        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 140,
            renderCell: ({ row }: GridValueGetterParams) => {
                return row.estado === 'malo' ? (
                    <Chip color="default" label="Malo" variant="outlined" />
                ) : row.estado === 'regular' ? (
                    <Chip color="warning" label="Regular" variant="outlined" />
                ) : (
                    <Chip color="success" label="Bueno" variant="outlined" />
                )
            },
        },
        {
            field: 'imagenes',
            headerName: 'Imagen',
            width: 230,
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <Box sx={{ displey: 'flex', flexGrow: 1 }}>
                        <CardMedia alt={row.id} component="img" image={`${row.imagenes}`} />
                    </Box>
                )
            },
        },
        {
            field: 'fechaDeEntrada',
            headerName: 'Fecha De Entrada',
            width: 160,
        },
        {
            field: 'fechaDeActualizacion',
            headerName: 'Fecha De Actualizacion',
            width: 170,
        },
        //maquina
        {
            field: 'id_maquina',
            headerName: 'Identificador de maquina',
            width: 180,
        },
        {
            field: 'capacidadNominal',
            headerName: 'Capacidad Nominal',
            width: 150,
        },
        {
            field: 'serie',
            headerName: 'Serie',
            width: 110,
        },
        {
            field: 'marca',
            headerName: 'Marca',
            width: 110,
        },
        {
            field: 'voltaje',
            headerName: 'Voltaje',
            width: 110,
        },
        {
            field: 'corriente',
            headerName: 'Corriente',
            width: 110,
        },
        {
            field: 'observacionesGeneral',
            headerName: 'Observaciones General',
            width: 250,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Box
                        sx={{
                            overflow: 'hidden',
                            maxWidth: '100%',
                            whiteSpace: 'normal !important',
                        }}
                    >
                        {row.observacionesGeneral ? row.observacionesGeneral.substring(0, 160) + '...' : null}
                    </Box>
                )
            },
        },
        {
            field: 'ind',
            headerName: 'IND',
            width: 270,
            renderCell: ({ row }: GridRenderCellParams) => {
                if (!row.ind) {
                    return <></>
                }
                const keyObj = Object.keys(row.ind)

                console.log({ keyObj })

                return (
                    <Box
                        sx={{
                            overflow: 'hidden',
                            maxWidth: '100%',
                            whiteSpace: 'normal !important',
                        }}
                    >
                        {keyObj.map((key, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    justify: 'center',
                                    align: 'center',
                                    flexDirection: 'row',
                                }}
                            >
                                {['object', 'array'].includes(typeof row.ind[key]) ? (
                                    <>
                                        <Box>{key}:&nbsp;</Box>
                                        <Box>{JSON.stringify(row.ind[key])}</Box>
                                    </>
                                ) : (
                                    <>
                                        <Box>{key}:&nbsp;</Box>
                                        <>{row.ind[key]}</>
                                    </>
                                )}
                            </Box>
                        ))}
                    </Box>
                )
            },
        },
        {
            field: 'locacion',
            headerName: 'Locación',
            width: 140,
        },
        {
            field: 'subLocacion',
            headerName: 'Sublocación',
            width: 110,
        },
        //repuesto
        {
            field: 'id_repuesto',
            headerName: 'Identificador de repuesto',
            width: 180,
        },
        {
            field: 'existencia',
            headerName: 'Existencia',
            width: 110,
        },
        {
            field: 'coordenadas_gps',
            headerName: 'Coordenadas GPS',
            width: 150,
        },
        {
            field: 'maquina_id_relacion',
            headerName: 'Maquina de Relación',
            width: 150,
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 150,
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <Container>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <IconButton color="secondary" onClick={toggleModalInventario}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => warningDeletedInventario(row.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Container>
                )
            },
        },
    ]

    const inventarios = [
        {
            _id: 1,
            tipoInventario: 'maquina',
            nombre: 'ADDV-123-LT',
            imgQR: 'https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp',
            estado: 'bueno',
            imagenes: 'https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp',
            fechaDeEntrada: '12/12/2012',
            fechaDeActualizacion: '10/10/2010',

            id_maquina: 'maq1',
            capacidadNominal: '12ASN212',
            serie: 'serie 1',
            marca: 'yamaha',
            voltaje: 120,
            corriente: 80,
            observacionesGeneral: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
            ind: {
                frecuencia_de_reparacion: 100,
                frecuencia_de_falla: 120,
                porcentaje_de_disponibilidad: 130,
            },
            locacion: 'produccion',
            subLocacion: 3,
        },
        {
            _id: 2,
            tipoInventario: 'repuesto',
            nombre: 'ABBV-4567-BN',
            imgQR: 'https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp',
            estado: 'regular',
            imagenes: 'https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp',
            fechaDeEntrada: '12/03/2011',
            fechaDeActualizacion: '01/08/2019',

            id_repuesto: 'RE-1',
            existencia: 1,
            coordenadas_gps: '10.981266, -74.808007',
            maquina_id_relacion: 'maq1',
        },
    ]

    const rows = inventarios.map((inventario) => ({
        id: inventario._id,
        imgQR: inventario.imgQR,
        estado: inventario.estado,
        imagenes: inventario.imagenes,
        fechaDeEntrada: inventario.fechaDeEntrada,
        fechaDeActualizacion: inventario.fechaDeActualizacion,
        //maquina
        id_maquina: inventario?.id_maquina || null,
        capacidadNominal: inventario?.capacidadNominal || null,
        serie: inventario?.serie || null,
        marca: inventario?.marca || null,
        voltaje: inventario?.voltaje || null,
        corriente: inventario?.corriente || null,
        observacionesGeneral: inventario?.observacionesGeneral || null,
        ind: inventario?.ind || null,
        locacion: inventario?.locacion || null,
        subLocacion: inventario?.subLocacion || null,
        //repuesto
        id_repuesto: inventario?.id_repuesto || null,
        existencia: inventario?.existencia || null,
        coordenadas_gps: inventario?.coordenadas_gps || null,
        maquina_id_relacion: inventario?.maquina_id_relacion || null,
    }))

    return (
        <AdminLayout
            icon={<SettingsSuggestIcon color="secondary" />}
            subTitle={'Gestión de Inventarios'}
            title={'Inventario'}
            toggleTheme={toggleTheme}
        >
            <Grid container className="fadeIn">
                <Grid item sx={{ height: 730, width: '100%' }} xs={12}>
                    <DataGrid
                        columns={columns}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        getEstimatedRowHeight={() => 80}
                        getRowHeight={() => 120}
                        pageSize={10}
                        rows={rows}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
            <ModalWarringDeleted
                actionDeleted={handleDeletedInventario}
                genericTextDeleted={`Estas apunto de borrar el Inventario "${msmTextDelete}"
                ,si deseas seguir oprime el botón de "Aceptar", sino oprime en "Cancelar" o fuera de la pantalla.`}
                idDeleted={msmTextDelete}
            />
            <SnackbarError
                handleChangeSnackbar={toggleSnackBarError}
                isOpen={isSnackbarError}
                msmText={`Se ha borrando exitosamente el Inventario ${msmTextDelete}`}
            />
            <SnackbarSuccess
                handleChangeSnackbar={toggleSnackBarSuccess}
                isOpen={isSnackbarSuccess}
                msmText={`se ha actualizado exitosamente el Inventario`}
            />
        </AdminLayout>
    )
}

export default InventariosPage
