import { Grid } from '@mui/material'
import { NextPage } from 'next'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'

import { AdminLayout } from '../../components'
import { ITheme } from '../../interface'

const InventariosPage: NextPage<ITheme> = ({ toggleTheme }) => {
    const inventarios = [
        {
            _id: 1,
            tipoInventario: 'maquina',
            nombre: 'ADDV-123-LT',
            imgQR: 'https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp',
            estado: 'bueno',
            imagenes: [
                'https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp',
                'https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp',
                'https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp',
            ],
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
                frecuencia_de_falla: 100,
                porcentaje_de_disponibilidad: 100,
            },
            locacion: 'produccion',
            subLocacion: 3,
        },
        {
            _id: 1,
            tipoInventario: 'repuesto',
            nombre: 'ABBV-4567-BN',
            imgQR: 'https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp',
            estado: 'malo',
            imgagenes: [
                'https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp',
                'https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp',
                'https://res.cloudinary.com/danfelogar/image/upload/v1657438131/cjm0lxsfxh3ollrfukhh.webp',
            ],
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
            {/* <ModalWarringDeleted
                actionDeleted={handleDeletedFollow}
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
            /> */}
        </AdminLayout>
    )
}

export default InventariosPage
