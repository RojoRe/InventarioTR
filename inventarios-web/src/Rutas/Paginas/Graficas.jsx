import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import './Disenos/GraficasDi.css'; 


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const Graficas = () => {
  const [proveedoresCount, setProveedoresCount] = useState(0);
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [proveedoresResponse, productosCategoriaResponse] = await Promise.all([
          fetch('https://apiinventario-rilt.onrender.com/api/statistics/proveedores').then(res => res.json()),
          fetch('https://apiinventario-rilt.onrender.com/api/statistics/productos-categoria').then(res => res.json())
        ]);

        setProveedoresCount(proveedoresResponse);
        setProductosPorCategoria(productosCategoriaResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const colors = [
    'rgba(54, 162, 235, 0.6)', 
    'rgba(255, 99, 132, 0.6)', 
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)', 
    'rgba(153, 102, 255, 0.6)', 
    'rgba(255, 159, 64, 0.6)'  
  ];

  
  const barData = {
    labels: productosPorCategoria.map(item => item.categoria),
    datasets: [
      {
        label: 'Productos por Categoría',
        data: productosPorCategoria.map(item => item.total),
        backgroundColor: productosPorCategoria.map((_, index) => colors[index % colors.length]),
        borderColor: productosPorCategoria.map((_, index) => colors[index % colors.length].replace('0.6', '1')),
        borderWidth: 2,
      }
    ]
  };


  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#333'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [5, 5],
          color: '#ddd'
        },
        ticks: {
          color: '#333'
        }
      }
    }
  };

  
  const pieData = {
    labels: ['Proveedores'],
    datasets: [
      {
        label: 'Proveedores',
        data: [proveedoresCount],
        backgroundColor: ['rgba(54, 162, 235, 0.4)'],
        borderColor: ['rgba(54, 162, 235, 1)'], 
        borderWidth: 2,
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}`;
          }
        }
      }
    }
  };

  return (
    <div className="graficas-container">
      <h2 className="graficas-title">Estadísticas</h2>
      <div className="graficas-content">
        <div className="graficas-box">
          <h3>Conteo de Proveedores</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>
        <div className="graficas-box">
          <h3>Productos por Categoría</h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default Graficas;
