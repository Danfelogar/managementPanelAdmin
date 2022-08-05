import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

import { useInventario } from '../../../hooks'

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

export const CustomBar = () => {
    const { dataBar } = useInventario()

    const data = {
        labels,
        datasets: [
            {
                label: 'Frecuencia de Reparación',
                data: dataBar.map((item) => item.frecuencia_de_reparacion),
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: '#ff8600',
                borderWidth: 2,
            },
            {
                label: 'Frecuencia de Falla',
                data: dataBar.map((item) => item.frecuencia_de_falla),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: '#d62828',
                borderWidth: 2,
            },
            {
                label: 'Porcentaje de Disponibilidad',
                data: dataBar.map((item) => item.porcentaje_de_disponibilidad),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: '#7209b7',
                borderWidth: 2,
            },
        ],
    }

    return <Bar data={data} options={options} />
}
