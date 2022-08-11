// import { useState, useEffect, useContext } from 'react';
// import useSWR from 'swr'
import { GetServerSideProps, NextPage } from 'next'
import { useContext } from 'react'
import { Button, Grid, MenuItem, Select } from '@mui/material'
import { Box, Container } from '@mui/system'
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid'
import { PeopleOutline } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'
import IconButton from '@mui/material/IconButton'

// import { tesloApi } from '../../api'
// import { AdminLayout } from '../../components/layouts'
// import { IUser } from '../../interfaces'

import { getSession } from 'next-auth/react'

import { ITheme } from '../interface'
import { AdminLayout, ModalUsers, ModalWarringDeleted, SnackbarError, SnackbarSuccess } from '../components'
import { UIContext } from '../context'
import { useUsers } from '../hooks'
import { managementApi } from '../services'

const UsersPage: NextPage<ITheme> = ({ toggleTheme }) => {
    const { toggleModalUsers, toggleSnackBarError, toggleSnackBarSuccess, isSnackbarError, isSnackbarSuccess } =
        useContext(UIContext)
    const { msmTextDelete, handleDeletedUser, warringDeletedUser } = useUsers()
    // const { data, error} = useSWR<IUser[]>('/api/admin/users')
    // const [users, setUsers] = useState<IUser[]>([])
    const testing = async () => {
        const { data } = await managementApi.get('/admin/users?page=2&limit=5')

        console.log({ data })
    }

    testing()
    // useEffect(() => {
    //     if( data ){
    //         setUsers(data);
    //     }
    // }, [data])

    // if (!data && !error) return <></>

    // const onRoleUpdate = async (userId: String, newRole: string) => {
    //     const previusUsers = users.map((user) => ({ ...user }))
    //     const updatedUsers = users.map((user) => ({
    //         ...user,
    //         role: userId === user._id ? newRole : user.role,
    //     }))

    //     setUsers(updatedUsers)
    //     try {
    //         await tesloApi.put('/admin/users', { userId: userId, role: newRole })
    //     } catch (error) {
    //         setUsers(previusUsers)
    //         console.log({ error })
    //         alert('Failed to update user role')
    //     }
    // }

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'nombre', headerName: 'Nombre Completo', width: 300 },
        { field: 'rol', headerName: 'Rol', width: 150 },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 150,
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            p: 0,
                        }}
                    >
                        <IconButton color="secondary" onClick={toggleModalUsers}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => warringDeletedUser(row.email)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )
            },
        },
    ]

    const users = [
        {
            _id: 1,
            nombre: 'Daniel Felipe Polo Garcia',
            email: 'superadmin@superadmin.com',
            rol: 'super_admin',
        },
        {
            _id: 11,
            nombre: 'Lupita Olmos',
            email: 'adminbodega@adminbodega.com',
            rol: 'admin_bodega',
        },
        {
            _id: 111,
            nombre: 'Beatriz Salto',
            email: 'bodega@bodega.com',
            rol: 'bodega',
        },
        {
            _id: 1111,
            nombre: 'Carlos Andrés Roa Escorcia',
            email: 'adminmtto@adminmtto.com',
            rol: 'admin_mtto',
        },
        {
            _id: 11111,
            nombre: 'Vasco Castano',
            email: 'mtto@mtto.com',
            rol: 'mtto',
        },
    ]

    const rows = users.map((user) => ({
        id: user._id,
        email: user.email,
        nombre: user.nombre,
        rol: user.rol,
    }))

    return (
        <AdminLayout
            icon={<PeopleOutline color="secondary" />}
            subTitle={'Gestión de Usuarios'}
            title={'Usurarios'}
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
                        Crear nuevo usuario
                    </Button>
                </Grid>
                <Grid item sx={{ height: 650, width: '100%' }} xs={12}>
                    <DataGrid
                        columns={columns}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        pageSize={10}
                        rows={rows}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
            <ModalUsers />
            <ModalWarringDeleted
                actionDeleted={handleDeletedUser}
                genericTextDeleted={`Estas apunto de borrar al usuario "${msmTextDelete}"
            ,si deseas seguir oprime el botón de "Aceptar", sino oprime en "Cancelar" o fuera de la pantalla.`}
                idDeleted={msmTextDelete}
            />
            <SnackbarError
                handleChangeSnackbar={toggleSnackBarError}
                isOpen={isSnackbarError}
                msmText={`Se ha borrando exitosamente el usuario ${msmTextDelete}`}
            />
            <SnackbarSuccess
                handleChangeSnackbar={toggleSnackBarSuccess}
                isOpen={isSnackbarSuccess}
                msmText={`se ha actualizado exitosamente el usuario`}
            />
        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session: any = await getSession({ req })

    // console.log({ session, req })
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/users',
                permanent: false,
            },
        }
    }

    if (session?.user?.rol! !== 'super_admin') {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}

export default UsersPage
