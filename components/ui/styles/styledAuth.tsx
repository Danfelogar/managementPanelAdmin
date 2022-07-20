import { Box, Card, CardContent, Container } from '@mui/material'
import { styled } from '@mui/material/styles'

export const WrapperAuth = styled(Box)(() => ({
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
}))

export const WrapperAuthHeader = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'inherit',
}))

export const WrapperAuthBody = styled(Box)(() => ({
    flexGrow: 1,
    width: '100%',
    maxWidth: '740px',
    paddingTop: '60px',
    display: 'flex',
    justifyContent: 'center',
}))

export const ContainerBodyAuth = styled(Container)(() => ({
    display: 'flex',
    width: '80%',
    height: '82%',
}))

export const WrapperCardAuth = styled(Card)(() => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderRadius: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px -4px 20px 0px rgba(0,0,0,0.3)',
}))

export const CardContentAuth = styled(CardContent)(() => ({
    width: '90%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
}))
