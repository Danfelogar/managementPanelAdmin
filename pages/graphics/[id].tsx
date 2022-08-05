import { NextPage } from 'next'
import { EngineeringOutlined } from '@mui/icons-material'

import { AdminLayout, CustomBar } from '../../components'
import { ITheme } from '../../interface'
import { WrapperGraphicsBar } from '../../components/ui/styles/styledGraphicsBar'

const BarGraphicPage: NextPage<ITheme> = ({ toggleTheme }) => {
    return (
        <AdminLayout
            icon={<EngineeringOutlined color="secondary" />}
            subTitle={'Visor de IND'}
            title={'Inventario No.12'}
            toggleTheme={toggleTheme}
        >
            <WrapperGraphicsBar>
                <CustomBar />
            </WrapperGraphicsBar>
        </AdminLayout>
    )
}

export default BarGraphicPage
