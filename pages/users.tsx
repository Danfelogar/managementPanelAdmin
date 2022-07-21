// import { useState, useEffect } from 'react'
// import useSWR from 'swr'
import { PeopleOutline } from '@mui/icons-material'
import { Grid, MenuItem, Select } from '@mui/material'
import { Box, Container } from '@mui/system'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { NextPage } from 'next'

// import { tesloApi } from '../../api'
// import { AdminLayout } from '../../components/layouts'
// import { IUser } from '../../interfaces'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

import { ITheme } from '../interface'
import { AdminLayout } from '../components'

const UsersPage: NextPage<ITheme> = ({ toggleTheme }) => {
    // const { data, error} = useSWR<IUser[]>('/api/admin/users')
    // const [users, setUsers] = useState<IUser[]>([])

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
        {
            field: 'rol',
            headerName: 'Rol',
            width: 300,
            //recuerda que row tiene todas las variables de la linea (id,email, rol, nombre)
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <Select
                        label="Rol"
                        sx={{ width: '100%' }}
                        value={row.rol}
                        // onChange={({ target }) => onRoleUpdate(row.id, target.value)}
                    >
                        <MenuItem value="super_admin">Super Admin</MenuItem>
                        <MenuItem value="admin_bodega">Admin Bodega</MenuItem>
                        <MenuItem value="admin_mtto">Admin Mantenimiento</MenuItem>
                        <MenuItem value="bodega">Bodega</MenuItem>
                        <MenuItem value="mtto">Mantenimiento</MenuItem>
                        <MenuItem value="SEO">SEO</MenuItem>
                    </Select>
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
                            <IconButton color="secondary" onClick={() => console.log(`yo edito a ${row.id}`)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => console.log(`yo borro a ${row.id}`)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Container>
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
                <Grid item sx={{ height: 650, width: '100%' }} xs={12}>
                    <DataGrid columns={columns} pageSize={10} rows={rows} rowsPerPageOptions={[10]} />
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

export default UsersPage
