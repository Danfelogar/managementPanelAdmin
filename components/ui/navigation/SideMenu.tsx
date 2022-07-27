import {
    AccountCircleOutlined,
    AdminPanelSettings,
    ConfirmationNumberOutlined,
    DashboardOutlined,
    LoginOutlined,
} from '@mui/icons-material'
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined'
import EngineeringIcon from '@mui/icons-material/Engineering'
import GitHubIcon from '@mui/icons-material/GitHub'
import { CardMedia, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, ListSubheader } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'
import { useContext } from 'react'

import logoMtto from '../../../public/mtto.png'
import { UIContext } from '../../../context/ui/UIContext'

export const SideMenu = () => {
    const { toggleSideMenu, isMenuOpen } = useContext(UIContext)

    return (
        <Drawer
            anchor="left"
            open={isMenuOpen}
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={toggleSideMenu}
        >
            <Box sx={{ width: 250, paddingTop: 5, height: '100%' }}>
                <List sx={{ display: 'flex', flexFlow: 'column', pb: 2, height: '100%' }}>
                    <ListItem button>
                        <CardMedia sx={{ width: '100%', paddingTop: '0.1px' }}>
                            <Image alt="logoMtto" layout="responsive" src={logoMtto} />
                        </CardMedia>
                    </ListItem>
                    <Divider variant="middle" />
                    {/* {isLoggedIn && (
                        <> */}
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Perfil'} />
                    </ListItem>

                    <ListItem
                        button
                        // onClick={() => navigateTo('/orders/history')}
                    >
                        <ListItemIcon>
                            <DashboardOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItem>
                    {/* </>
                    )} */}

                    <ListItem
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                        //onClick={() => navigateTo('/category/men')}
                    >
                        <ListItemIcon>
                            <InventoryOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Inventario'} />
                    </ListItem>

                    <ListItem
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                        //onClick={() => navigateTo('/category/women')}
                    >
                        <ListItemIcon>
                            <ConfirmationNumberOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'OTs'} />
                    </ListItem>

                    <ListItem
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                        //onClick={() => navigateTo('/category/kid')}
                    >
                        <ListItemIcon>
                            <EngineeringIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Seguimiento'} />
                    </ListItem>

                    {/* {isLoggedIn ? ( */}
                    <ListItem
                        button
                        //onClick={logout}
                    >
                        <ListItemIcon>
                            <AdminPanelSettings />
                        </ListItemIcon>
                        <ListItemText primary={'Usuarios'} />
                    </ListItem>
                    {/* ) : ( */}
                    {/* //atento que si enviamos este query parameter "?q=...." podemos mandarlo en un middleware para poder surftear automaticamente la ultima pagina que visitamos cuando hagamos el login exitoso

                        //esto se hace con la finalidad de tener guardado cual fue la ultima page navegada */}
                    <ListItem
                        button
                        //onClick={() => navigateTo(`/auth/login?p=${asPath}`)}
                    >
                        <ListItemIcon>
                            <LoginOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Cerrar Sección'} />
                    </ListItem>
                    {/* )} */}

                    {/* Admin */}

                    {/* {user?.role == 'admin' && (
                        <> */}
                    <Box flexShrink={2} sx={{ flex: '1 1 auto' }} />
                    <Divider />
                    <ListSubheader>Sección de contacto</ListSubheader>

                    <ListItem component="a" href="https://github.com/Danfelogar" sx={{ color: 'inherit' }}>
                        <ListItemIcon>
                            <GitHubIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Created by Danfelogar'} />
                    </ListItem>
                    {/* </>
                    )} */}
                </List>
            </Box>
        </Drawer>
    )
}
