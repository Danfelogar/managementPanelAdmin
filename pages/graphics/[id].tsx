import { NextPage } from 'next'
import { EngineeringOutlined } from '@mui/icons-material'
import { GetServerSideProps } from 'next'
import moment from 'moment'

import { AdminLayout, CustomBar } from '../../components'
import { ITheme, ISeguimiento } from '../../interface'
import { WrapperGraphicsBar } from '../../components/ui/styles/styledGraphicsBar'
import { useGraphics } from '../../hooks'
import { dbGraphics } from '../../database'

const BarGraphicPage: NextPage<ITheme> = ({ toggleTheme }) => {
    const { status } = useGraphics()

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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // console.log(ctx.query?.id!)
    const graphicsByMachine = await dbGraphics.getFollowByMachineId(ctx.query?.id!.toString())

    if (graphicsByMachine.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    let graphics = graphicsByMachine.flatMap((item) => [
        {
            ...item,
            frecuencia_de_reparacion: Math.round((1 / item.tiempoDeReparacion) * 1000) / 1000,
            porcentaje_de_disponibilidad:
                Math.round(
                    (item.tiempoDeFuncionamiento +
                        item.tiempoDeReparacion +
                        5 -
                        item.tiempoDeReparacion / (item.tiempoDeFuncionamiento + item.tiempoDeReparacion + 5)) *
                        1000,
                ) / 1000,
            createdAt: moment(item.createdAt).utcOffset('+0500').format('DD/MM/YYYY').split('/')[1],
        },
    ])

    console.log({ graphics })

    let auxArr: Partial<ISeguimiento[]> | [] = []

    for (let i = 0; i < graphics.length; i++) {
        const frecuencia_de_reparacion = graphics[i].frecuencia_de_reparacion
        const porcentaje_de_disponibilidad = graphics[i].porcentaje_de_disponibilidad

        auxArr[graphics[i].createdAt] ??= []
        auxArr[graphics[i].createdAt].push({ frecuencia_de_reparacion, porcentaje_de_disponibilidad })
    }

    console.log({ auxArr })
    console.log(auxArr['12'])

    return {
        props: {},
    }
}

export default BarGraphicPage
