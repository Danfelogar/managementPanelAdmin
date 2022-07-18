import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Divider,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material'
import Image from 'next/image'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useContext } from 'react'
import { getSession } from 'next-auth/react'

import logoMtto from '../../public/mtto.png'
import { useLogin } from '../../hooks'
import { UIContext } from '../../context'
import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils'

interface Props {
    toggleTheme: (theme: 'light' | 'dark') => void
}

const LoginPage: NextPage<Props> = ({ toggleTheme }) => {
    const { theme, changeTheme } = useContext(UIContext)
    const { showPassword, showError, errors, handleOnChangeShowPassword, register, handleSubmit, onLoginUser } = useLogin()

    const handleChangeTheme = (theme: 'light' | 'dark') => {
        toggleTheme(theme)
        changeTheme(theme)
    }

    return (
        <AuthLayout title="Login">
            <form noValidate onSubmit={handleSubmit(onLoginUser)}>
                <Box
                    sx={{
                        width: '100%',
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#e3f2fd',
                    }}
                >
                    <Box
                        color="primary"
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'inherit',
                        }}
                    >
                        <Box sx={{ flexGrow: 1 }}>
                            <AppBar color="inherit" position="static">
                                <Toolbar>
                                    <Typography component="div" sx={{ flexGrow: 1 }} variant="h6" />
                                    {theme === 'dark' ? (
                                        <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => handleChangeTheme('light')}>
                                            <Brightness7Icon />
                                        </IconButton>
                                    ) : (
                                        <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => handleChangeTheme('dark')}>
                                            <Brightness4Icon />
                                        </IconButton>
                                    )}
                                    <IconButton color="inherit" sx={{ ml: 1 }} />
                                </Toolbar>
                            </AppBar>
                        </Box>
                    </Box>
                    <Box
                        color="primary"
                        sx={{
                            flexGrow: 1,
                            width: '100%',
                            maxWidth: '740px',
                            paddingTop: '60px',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Container
                            sx={{
                                display: 'flex',
                                width: '80%',
                                height: '70%',
                            }}
                        >
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    borderRadius: '10px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    boxShadow: '0px -4px 20px 0px rgba(0,0,0,0.3)',
                                }}
                            >
                                <CardContent
                                    sx={{
                                        width: '90%',
                                        height: '90%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <CardMedia sx={{ width: '100%' }}>
                                        <Image alt="logoMtto" layout="responsive" src={logoMtto} />
                                    </CardMedia>
                                    <CardContent>
                                        <Typography align="center" color="secondary" sx={{ fontWeight: 'bold' }} variant="h5">
                                            Hola, bien venido a el panel admin de mtto
                                        </Typography>
                                    </CardContent>
                                    <Divider flexItem orientation="horizontal" variant="middle" />
                                    <CardContent sx={{ display: 'flex', marginTop: '20px' }}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            {...register('email', {
                                                required: 'Este campo es requerido',
                                                validate: validations.isEmail,
                                            })}
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                        />
                                    </CardContent>
                                    <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <FormControl sx={{ width: '100%' }} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            edge="end"
                                                            onClick={handleOnChangeShowPassword}
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                error={!!errors.contrasena}
                                                id="outlined-adornment-password"
                                                label="Contraseña"
                                                type={showPassword ? 'text' : 'password'}
                                                {...register('contrasena', {
                                                    required: 'Este campo es requerido',
                                                    minLength: { value: 6, message: 'min 6 caracteres' },
                                                })}
                                            />
                                            {!!errors.contrasena && (
                                                <FormHelperText error id="accountId-error">
                                                    {errors.contrasena?.message}
                                                </FormHelperText>
                                            )}
                                        </FormControl>

                                        <Button
                                            fullWidth
                                            color="secondary"
                                            size="large"
                                            sx={{ mt: 3 }}
                                            type="submit"
                                            variant="contained"
                                        >
                                            Ingresar
                                        </Button>
                                    </CardContent>
                                </CardContent>
                            </Card>
                        </Container>
                    </Box>
                </Box>
            </form>
        </AuthLayout>
    )
}

//con esto buscamos bloquear la pag de login en caso tal tengamos credenciales
export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req })
    //console.log(session,session);
    //con el query rescatamos el ultimo path donde estuvimos navegando parar retornarlo en caso tal nuestro logueo sea exitoso
    const { p = '/' } = query

    if (session) {
        return {
            redirect: {
                //no moleste la función ponemos para que nos devuelva un string en caso tal venga un array  colocamos.toString()
                destination: p.toString(),
                permanent: false,
            },
        }
    }

    //si nosotros no tenemos una session pues nos quedamos en esta pantalla y se devuelven las props
    return {
        props: {},
    }
}

export default LoginPage
