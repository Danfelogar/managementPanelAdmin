import {
    BackspaceOutlined,
    ConfirmationNumberOutlined,
    DashboardOutlined,
    EngineeringOutlined,
    GroupOutlined,
    PrecisionManufacturingOutlined,
    TimelapseOutlined,
    WarningAmberOutlined,
} from '@mui/icons-material'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import { Grid } from '@mui/material'
import { NextPage } from 'next'

import { AdminLayout, SummaryTile } from '../components'
import { ITheme } from '../interface'

const HomePage: NextPage<ITheme> = ({ toggleTheme }) => {
    return (
        <AdminLayout
            icon={<DashboardOutlined color="secondary" />}
            subTitle="Estadísticas generales"
            title="Dashboard"
            toggleTheme={toggleTheme}
        >
            <Grid container spacing={2}>
                <SummaryTile
                    icon={<ConfirmationNumberOutlined color="primary" sx={{ fontSize: 65 }} />}
                    navigation={'/ots'}
                    subTitle="OTs generadas"
                    title={10}
                />
                <SummaryTile
                    icon={<PrecisionManufacturingOutlined color="secondary" sx={{ fontSize: 65 }} />}
                    subTitle="Maquinas"
                    title={10}
                />

                <SummaryTile
                    icon={<SettingsSuggestIcon color="success" sx={{ fontSize: 65 }} />}
                    subTitle="Repuestos"
                    title={10}
                />

                <SummaryTile
                    icon={<GroupOutlined color="action" sx={{ fontSize: 65 }} />}
                    navigation={'/users'}
                    subTitle="Usuarios"
                    title={10}
                />

                <SummaryTile
                    icon={<BackspaceOutlined color="error" sx={{ fontSize: 65 }} />}
                    subTitle={`Fuera de Stock en repuestos`}
                    title={10}
                />

                <SummaryTile
                    icon={<WarningAmberOutlined color="warning" sx={{ fontSize: 65 }} />}
                    subTitle={`Existencias bajas en repuesto`}
                    title={10}
                />

                <SummaryTile
                    icon={<EngineeringOutlined color="info" sx={{ fontSize: 65 }} />}
                    navigation={'/follows'}
                    subTitle="Seguimiento"
                    title={10}
                />

                <SummaryTile
                    icon={<TimelapseOutlined color="disabled" sx={{ fontSize: 65 }} />}
                    subTitle="Tiempo para la actualización"
                    title={10}
                />
            </Grid>
        </AdminLayout>
    )
}

export default HomePage
