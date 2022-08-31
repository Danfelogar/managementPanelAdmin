import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { FC } from 'react'
import { Bar } from 'react-chartjs-2'

import { useInventory } from '../../../hooks'
import { PropsAuxArrData } from '../../../pages/graphics/[id]'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
    responsive: true,
    //con esto hacemos que sea responsive en todas las pantallas
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
    scales: {
        y: {
            grid: {
                offset: true,
            },
        },
    },
}

const labels = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
]

interface Props {
    graphicsData: PropsAuxArrData[]
}

export const CustomBar: FC<Props> = ({ graphicsData }) => {
    const { dataBar } = useInventory()
    let data
    let data1
    let data2

    console.log({ graphicsData })
    if (graphicsData) {
        data = {
            labels,
            datasets: [
                {
                    label: 'Frecuencia de Reparación',
                    data: graphicsData!.map((item) => item.frecuencia_de_reparacion / item.frecuencia_de_falla),
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: '#ff8600',
                    borderWidth: 2,
                },
                {
                    label: 'Frecuencia de Falla',
                    data: graphicsData!.map((item) => item.frecuencia_de_falla),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: '#d62828',
                    borderWidth: 2,
                },
                {
                    label: 'Porcentaje de Disponibilidad',
                    data: graphicsData!.map((item) => item.porcentaje_de_disponibilidad / item.frecuencia_de_falla),
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: '#7209b7',
                    borderWidth: 2,
                },
            ],
        }
        data1 = {
            labels,
            datasets: [
                {
                    label: 'Frecuencia de Reparación',
                    data: graphicsData!.map((item) => item.frecuencia_de_reparacion / item.frecuencia_de_falla),
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: '#ff8600',
                    borderWidth: 2,
                },
            ],
        }
        data2 = {
            labels,
            datasets: [
                {
                    label: 'Frecuencia de Falla',
                    data: graphicsData!.map((item) => item.frecuencia_de_falla),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: '#d62828',
                    borderWidth: 2,
                },
            ],
        }
    }

    return (
        <>
            <Bar data={data as any} options={options} />
            <Bar data={data1 as any} options={options} />
            <Bar data={data2 as any} options={options} />
        </>
    )
}
