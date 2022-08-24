import { Box, Button, CardMedia, Chip, Container, Grid, IconButton } from '@mui/material'
import { useContext } from 'react'
import CreateIcon from '@mui/icons-material/Create'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { GetServerSideProps, NextPage } from 'next'
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { getSession } from 'next-auth/react'

import { ITheme } from '../interface'
import { UIContext } from '../context'
import { AdminLayout, ModalOTs, ModalWarringDeleted, SnackbarError, SnackbarSuccess } from '../components'
import { useOTs } from '../hooks'

const OtsPage: NextPage<ITheme> = ({ toggleTheme }) => {
    const { toggleSnackBarError, toggleSnackBarSuccess, toggleModalOTs, isSnackbarError, isSnackbarSuccess } =
        useContext(UIContext)
    const { msmTextDelete, handleDeletedOT, warningDeletedOT } = useOTs()

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Numero de la Orden',
            width: 150,
        },
        {
            field: 'maquina',
            headerName: 'Maquina a realizar mantenimiento',
            width: 240,
        },
        {
            field: 'repuesto',
            headerName: 'Repuesto a necesitar',
            width: 160,
        },
        {
            field: 'tecnico_ing',
            headerName: 'Encargado del mantenimiento',
            width: 210,
        },
        {
            field: 'estado_de_OT',
            headerName: 'Estado de la OT',
            width: 140,
            renderCell: ({ row }: GridValueGetterParams) => {
                return row.estado_de_OT === 'pendiente' ? (
                    <Chip color="default" label="Pendiente" variant="outlined" />
                ) : row.estado_de_OT === 'en_proceso' ? (
                    <Chip color="warning" label="en proceso" variant="outlined" />
                ) : (
                    <Chip color="success" label="finalizada" variant="outlined" />
                )
            },
        },
        {
            field: 'numero_de_orden_de_compra',
            headerName: 'Numero de orden de compra',
            width: 200,
        },
        {
            field: 'fecha_expedicion',
            headerName: 'Fecha de expedición',
            width: 160,
        },
        {
            field: 'tiempoDeEjecucion',
            headerName: 'Tiempo de Ejecución',
            width: 160,
        },
        {
            field: 'fecha_cierre',
            headerName: 'Fecha de cierre',
            width: 130,
        },
        {
            field: 'imgDeMaquina',
            headerName: 'Imagen De Maquina',
            width: 230,
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <Box sx={{ displey: 'flex', flexGrow: 1 }}>
                        <CardMedia alt={row.id} component="img" image={`${row.imgDeLaMaquina}`} />
                    </Box>
                )
            },
        },
        {
            field: 'tareas',
            headerName: 'Tareas',
            width: 230,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Box
                        sx={{
                            overflow: 'hidden',
                            maxWidth: '100%',
                            whiteSpace: 'normal !important',
                        }}
                    >
                        {row.tareas.substring(0, 160) + '...'}
                    </Box>
                )
            },
        },
        {
            field: 'comentario',
            headerName: 'Comentario',
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
                        {row.comentario.substring(0, 160) + '...'}
                    </Box>
                )
            },
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
                            <IconButton color="secondary" onClick={toggleModalOTs}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => warningDeletedOT(row.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Container>
                )
            },
        },
    ]

    const ots = [
        {
            _id: 1,
            ot_id: 'OT1',
            maquina: 'maq1',
            repuesto: 'repuesto 1',
            tecnico_ing: 'hennry',
            estado_de_OT: 'pendiente',
            numero_de_orden_de_compra: '123b213hjk123-dc',
            fecha_expedicion: '20-02-2020',
            tiempoDeEjecucion: 12000,
            fecha_cierre: '12-12-2022',
            imgDeLaMaquina: 'https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp',
            tareas: `
            * actividad: reparar maquina,
            * cantidad de actividad: 20h,
            * actividad: revisar fugas de la  maquina,
            * cantidad de actividad: 1h,
            `,
            comentario:
                'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, de contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto.',
        },
        {
            _id: 2,
            ot_id: 'OT2',
            maquina: 'maq2',
            repuesto: 'repuesto 2',
            tecnico_ing: 'hennry',
            estado_de_OT: 'en progreso',
            numero_de_orden_de_compra: '12-asd23-123-dc',
            fecha_expedicion: '03-02-2020',
            tiempoDeEjecucion: 100,
            fecha_cierre: '28-01-2022',
            imgDeLaMaquina: 'https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp',
            tareas: `
            * actividad: reparar maquina,
            * cantidad de actividad: 14h,
            * * actividad: revisar fugas de la  maquina,
            * cantidad de actividad: 6h,
            `,
            comentario:
                'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto.',
        },
    ]

    const rows = ots.map((ot) => ({
        id: ot.ot_id,
        maquina: ot.maquina,
        repuesto: ot.repuesto,
        tecnico_ing: ot.tecnico_ing,
        estado_de_OT: ot.estado_de_OT,
        numero_de_orden_de_compra: ot.numero_de_orden_de_compra,
        fecha_expedicion: ot.fecha_expedicion,
        tiempoDeEjecucion: ot.tiempoDeEjecucion,
        fecha_cierre: ot.fecha_cierre,
        imgDeLaMaquina: ot.imgDeLaMaquina,
        tareas: ot.tareas,
        comentario: ot.comentario,
    }))

    return (
        <AdminLayout
            icon={<ConfirmationNumberOutlined color="secondary" />}
            subTitle={'Gestión de OTs'}
            title={'OTS'}
            toggleTheme={toggleTheme}
        >
            <Grid container className="fadeIn">
                <Grid
                    item
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        mb: 1,
                        mt: 1,
                    }}
                    xs={12}
                >
                    <Button color="secondary" startIcon={<CreateIcon />} variant="outlined">
                        Crear nueva OT
                    </Button>
                </Grid>
                <Grid item sx={{ height: 650, width: '100%' }} xs={12}>
                    <DataGrid
                        columns={columns}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        getEstimatedRowHeight={() => 80}
                        getRowHeight={() => 130}
                        pageSize={10}
                        rows={rows}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
            <ModalOTs />
            <ModalWarringDeleted
                actionDeleted={handleDeletedOT}
                genericTextDeleted={`Estas apunto de borrar la "${msmTextDelete}"
                ,si deseas seguir oprime el botón de "Aceptar", sino oprime en "Cancelar" o fuera de la pantalla.`}
                idDeleted={msmTextDelete}
            />
            <SnackbarError
                handleChangeSnackbar={toggleSnackBarError}
                isOpen={isSnackbarError}
                msmText={`Se ha borrando exitosamente la OT con identificador "${msmTextDelete}"`}
            />
            <SnackbarSuccess
                handleChangeSnackbar={toggleSnackBarSuccess}
                isOpen={isSnackbarSuccess}
                msmText={`se ha actualizado exitosamente la OT`}
            />
        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    // console.log({ session })
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/ots',
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}

export default OtsPage
