import { NextPage } from 'next'
import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, CardMedia, Grid, Typography } from '@mui/material'
import { EngineeringOutlined } from '@mui/icons-material'

import { AdminLayout } from '../components/layouts/AdminLayout'
import { ITheme } from '../interface/theme'

const FollowsPager: NextPage<ITheme> = ({ toggleTheme }) => {
    const columns: GridColDef[] = [
        {
            field: 'imgDeVerificacion',
            headerName: 'Imagen De Verificación',
            width: 230,
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <Box sx={{ displey: 'flex', flexGrow: 1 }}>
                        <CardMedia alt={row.nombreDeObservador} component="img" image={`${row.imgDeVerificacion}`} />
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
            field: 'estadoDeLaMaquina',
            headerName: 'Estado De La Maquina',
            width: 200,
        },
        {
            field: 'nombreDeObservador',
            headerName: 'Nombre de Observador',
            width: 200,
        },
        {
            field: 'tiempoDeFuncionamiento',
            headerName: 'Tiempo de Funcionamiento',
            width: 200,
        },
        {
            field: 'tiempoDeReparacion',
            headerName: 'Tiempo de Reaparición',
            width: 200,
        },
        {
            field: 'maquina_id_relacion',
            headerName: 'Maquina de Reparacion',
            width: 200,
        },
    ]

    const follows = [
        {
            _id: 1,
            imgDeVerificacion: 'https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp',
            comentario:
                'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).',
            estadoDeLaMaquina: 'bueno',
            nombreDeObservador: 'Daniel Felipe Polo Garcia',
            tiempoDeFuncionamiento: 120,
            tiempoDeReparacion: 60,

            maquina_id_relacion: 'Maq1',
        },
    ]

    const rows = follows.map((follow) => ({
        id: follow._id,
        imgDeVerificacion: follow.imgDeVerificacion,
        comentario: follow.comentario,
        estadoDeLaMaquina: follow.estadoDeLaMaquina,
        nombreDeObservador: follow.nombreDeObservador,
        tiempoDeFuncionamiento: follow.tiempoDeFuncionamiento,
        tiempoDeReparacion: follow.tiempoDeReparacion,
        maquina_id_relacion: follow.maquina_id_relacion,
    }))

    return (
        <AdminLayout
            icon={<EngineeringOutlined color="secondary" />}
            subTitle={'Gestión de Seguimientos'}
            title={'Seguimiento'}
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
        </AdminLayout>
    )
}

export default FollowsPager
