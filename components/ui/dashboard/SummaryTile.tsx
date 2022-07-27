import { FC } from 'react'
import { Card, CardContent, Grid, Typography } from '@mui/material'
interface Props {
    title: string | number
    subTitle: string
    icon: JSX.Element
}

export const SummaryTile: FC<Props> = ({ title, subTitle, icon }) => {
    return (
        <Grid item lg={3} md={4} sm={6} sx={{ mt: 1 }} xs={12}>
            <Card sx={{ display: 'flex', maxWidth: '450px', p: 2 }}>
                <CardContent sx={{ width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {icon}
                </CardContent>
                <CardContent
                    sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap' }}
                >
                    <Typography variant="h3">{title}</Typography>
                    <Typography variant="caption">{subTitle}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}
