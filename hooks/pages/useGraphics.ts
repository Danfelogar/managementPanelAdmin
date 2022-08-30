import { useEffect, useState } from 'react'

interface AuxGraphics {
    frecuencia_de_reparacion: number
    porcentaje_de_disponibilidad: number
    createdAt: string
}

interface Props {
    frecuencia_de_reparacion: number
    porcentaje_de_disponibilidad: number
    frecuencia_de_falla: number
    createdAt?: string
}

export const useGraphics = (graphics: AuxGraphics[]) => {
    const [arrGraphics, setArrGraphics] = useState<AuxGraphics[] | Props[]>(graphics)
    const [isLoading, setIsLoading] = useState(true)
    let auxArr: Props[] = []

    const mappingArrGraphics = () => {
        setIsLoading(true)
        for (let i = 0; i < graphics.length; i++) {
            const fdr = graphics[i].frecuencia_de_reparacion
            const pdd = graphics[i].porcentaje_de_disponibilidad

            auxArr[graphics[i].createdAt] ??= []
            auxArr[graphics[i].createdAt] = {
                frecuencia_de_reparacion: (auxArr[graphics[i].createdAt].frecuencia_de_reparacion || 0) + fdr,
                frecuencia_de_falla: (auxArr[graphics[i].createdAt].frecuencia_de_falla || 0) + 1,
                porcentaje_de_disponibilidad: (auxArr[graphics[i].createdAt].porcentaje_de_disponibilidad || 0) + pdd,
            }

            //console.log(`iteracion ${i}:`, auxArr)
        }
        //console.log({ auxArr })
        // if (auxArr.length > 0) {
        //     for (let i = 0; i < auxArr.length; i++) {
        //         const fdr = auxArr[i].frecuencia_de_reparacion
        //         const pdd = auxArr[i].porcentaje_de_disponibilidad
        //         const fdf = auxArr[i].frecuencia_de_falla

        //         auxArr[graphics[i].createdAt] = {
        //             frecuencia_de_reparacion: fdr / fdf,
        //             frecuencia_de_falla: fdf,
        //             porcentaje_de_disponibilidad: pdd / fdf,
        //         }
        //     }
        // }
        if (auxArr.length === 13) {
            setArrGraphics(auxArr as Props[])
            setIsLoading(false)
        }
    }

    useEffect(() => {
        console.log(arrGraphics.length)
        if (arrGraphics.length > 0) {
            mappingArrGraphics()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        //states
        arrGraphics,
        isLoading,
        //methods
        //functions
    }
}
