import { NextPage } from 'next'
import { EngineeringOutlined } from '@mui/icons-material'
import { GetServerSideProps } from 'next'
import moment from 'moment'

import { AdminLayout, CustomBar, Loading } from '../../components'
import { ITheme, ISeguimiento } from '../../interface'
import { WrapperGraphicsBar } from '../../components/ui/styles/styledGraphicsBar'
import { useGraphics } from '../../hooks'
import { dbGraphics } from '../../database'

interface AuxGraphics {
    frecuencia_de_reparacion: number
    porcentaje_de_disponibilidad: number
    createdAt: string
}
interface Props extends ITheme {
    graphics: AuxGraphics[]
    id_maquina: string
    auxArr?: any
}

const BarGraphicPage: NextPage<Props> = ({ graphics, toggleTheme, id_maquina, auxArr }) => {
    const { arrGraphics, isLoading } = useGraphics(graphics)

    console.log({ graphics })
    if (isLoading) {
        return <Loading size={'70px'} title={`Cargando Gráficos, por favor espere...`} toggleTheme={toggleTheme} />
    }

    return (
        <AdminLayout
            icon={<EngineeringOutlined color="secondary" />}
            subTitle={'Visor de IND'}
            title={`Inventario No.${id_maquina}`}
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
    const graphicsByMachine: ISeguimiento[] = await dbGraphics.getFollowByMachineId(ctx.query?.id!.toString())

    if (graphicsByMachine.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    // let auxArr:
    //     | {
    //           frecuencia_de_reparacion: number
    //           porcentaje_de_disponibilidad: number
    //           frecuencia_de_falla: number
    //           createdAt?: string
    //       }[]
    //     | [] = []
    let graphics:
        | {
              frecuencia_de_reparacion: number
              porcentaje_de_disponibilidad: number
              createdAt: string
          }[]
        | [] = []

    graphics = graphicsByMachine.reduce((acc: any, currentValue: any) => {
        let auxObj = {}

        auxObj = {
            frecuencia_de_reparacion: Math.round((1 / currentValue.tiempoDeReparacion) * 1000) / 1000,
            porcentaje_de_disponibilidad:
                Math.round(
                    (currentValue.tiempoDeFuncionamiento +
                        currentValue.tiempoDeReparacion +
                        5 -
                        currentValue.tiempoDeReparacion /
                            (currentValue.tiempoDeFuncionamiento + currentValue.tiempoDeReparacion + 5)) *
                        1000,
                ) / 1000,
            createdAt: moment(currentValue.createdAt).utcOffset('+0500').format('DD/MM/YYYY').split('/')[1],
        }

        return [...acc, auxObj]
    }, [])

    graphics = graphics.reduce((acc: any, currentValue: any) => {
        let auxObj = {}
        let auxArr = acc
        const fdr = currentValue.frecuencia_de_reparacion
        const pdd = currentValue.porcentaje_de_disponibilidad

        auxArr[currentValue.createdAt] ??= []
        auxArr[currentValue.createdAt] = {
            frecuencia_de_reparacion: (auxArr[currentValue.createdAt].frecuencia_de_reparacion || 0) + fdr,
            frecuencia_de_falla: (auxArr[currentValue.createdAt].frecuencia_de_falla || 0) + 1,
            porcentaje_de_disponibilidad: (auxArr[currentValue.createdAt].porcentaje_de_disponibilidad || 0) + pdd,
        }

        return [...acc, auxObj]
    }, [])

    // for (let i = 0; i < graphics.length; i++) {
    //     const fdr = graphics[i].frecuencia_de_reparacion
    //     const pdd = graphics[i].porcentaje_de_disponibilidad

    //     auxArr[graphics[i].createdAt] ??= []
    //     auxArr[graphics[i].createdAt] = {
    //         frecuencia_de_reparacion: (auxArr[graphics[i].createdAt].frecuencia_de_reparacion || 0) + fdr,
    //         frecuencia_de_falla: (auxArr[graphics[i].createdAt].frecuencia_de_falla || 0) + 1,
    //         porcentaje_de_disponibilidad: (auxArr[graphics[i].createdAt].porcentaje_de_disponibilidad || 0) + pdd,
    //     }

    //     // console.log(`iteracion ${i}:`, auxArr)
    // }
    // console.log(auxArr)

    return {
        props: { graphics, id_maquina: ctx.query?.id!.toString() },
    }
}

export default BarGraphicPage
