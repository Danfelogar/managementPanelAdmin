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
import { useRouter } from 'next/router'

import logoMtto from '../../../public/mtto.png'
import { UIContext } from '../../../context/ui/UIContext'

export const SideMenu = () => {
    const { toggleSideMenu, isMenuOpen } = useContext(UIContext)
    const { push, asPath } = useRouter()

    const navigateTo = (url: string) => {
        toggleSideMenu()
        push(url)
    }

    return (
        <Drawer
            anchor="left"
            open={isMenuOpen}
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={toggleSideMenu}
        >
            <Box sx={{ width: 250, paddingTop: 5, height: '100%' }}>
                <List sx={{ display: 'flex', flexFlow: 'column', pb: 2, height: '100%' }}>
                    <ListItem>
                        <CardMedia sx={{ width: '100%', paddingTop: '0.1px' }}>
                            <Image priority alt="logoMtto" layout="responsive" src={logoMtto} />
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

                    <ListItem button onClick={() => navigateTo('/')}>
                        <ListItemIcon>
                            <DashboardOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItem>
                    {/* </>
                    )} */}

                    <ListItem button onClick={() => navigateTo('/inventory')}>
                        <ListItemIcon>
                            <InventoryOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Inventario'} />
                    </ListItem>

                    <ListItem button onClick={() => navigateTo('/ots')}>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'OTs'} />
                    </ListItem>

                    <ListItem button onClick={() => navigateTo('/follows')}>
                        <ListItemIcon>
                            <EngineeringIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Seguimiento'} />
                    </ListItem>

                    {/* {isLoggedIn ? ( */}
                    <ListItem button onClick={() => navigateTo('/users')}>
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
