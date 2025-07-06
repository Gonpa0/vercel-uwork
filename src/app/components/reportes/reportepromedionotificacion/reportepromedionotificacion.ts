// Importamos lo básico de Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importamos todo lo necesario para mostrar gráficos tipo pie
import {
  Chart,           // Clase principal para gráficos
  ArcElement,      // Elementos en forma de arco (para pie)
  Tooltip,         // Mostrar info al pasar el mouse
  Legend,          // Mostrar la leyenda (colores y nombres)
  PieController,   // Controlador específico para pie chart
  ChartOptions,    // Opciones de configuración
  ChartType,       // Tipo de gráfico (en este caso, 'pie')
  ChartDataset     // Para declarar los datos
} from 'chart.js';

// Importamos el componente base para usar gráficos en Angular
import { BaseChartDirective } from 'ng2-charts';

// Importamos el servicio que trae los datos desde el backend
import { NotificacionService } from '../../../services/notificacion.service';

// Modelo con los datos que llegan del backend
import { PromedioNotificacionesDTO } from '../../../models/PromedioNotificacionesDTO';

// Registramos los componentes necesarios para que funcione el gráfico de pie
Chart.register(ArcElement, Tooltip, Legend, PieController);

@Component({
  selector: 'app-reportepromedionotificacion', // nombre del componente
  standalone: true,                            // se puede usar sin un módulo padre
  imports: [ CommonModule, BaseChartDirective ], // módulos que se usan en este componente
  templateUrl: './reportepromedionotificacion.html', // HTML del componente
  styleUrls: ['./reportepromedionotificacion.css']    // Estilos del componente
})
export class Reportepromedionotificacion implements OnInit {
  // Opciones del gráfico (como hacer que se ajuste al tamaño de la pantalla)
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' } } // la leyenda aparece arriba
  };

  // Etiquetas del gráfico -> Ciclo Superior y  Ciclo Inferior)
  public pieChartLabels: string[] = [];

  // Datos que se mostrarán en el gráfico
  public pieChartDatasets: ChartDataset<'pie', number[]>[] = [];

  // Tipo de gráfico : pie
  public pieChartType: ChartType = 'pie';

  // Mostrar la leyenda : true
  public pieChartLegend = true;

  // Inyectamos el servicio para obtener los datos del backend
  constructor(private notificacionS: NotificacionService) {}

  // Cuando se carga el componente, se ejecuta esto
  ngOnInit(): void {
    // Llamamos al servicio para obtener los datos de promedio
    this.notificacionS.getPromedio().subscribe((data: PromedioNotificacionesDTO[]) => {

      // Asignamos los nombres de los grupos (Ciclo Inferior, Superior) como etiquetas
      this.pieChartLabels = data.map(item => item.grupo_ciclo);

      // Asignamos los valores de los promedios como datos del gráfico
      const valores = data.map(item => item.promedioNotificacionUsuario);

      // Creamos el dataset del gráfico con sus colores
      this.pieChartDatasets = [
        {
          data: valores, // valores del gráfico
          label: 'Promedio de notificaciones', // nombre que aparecerá en la leyenda
          backgroundColor: [ // Colores para cada porción
            '#FF6384', // rojo rosado para un grupo
            '#36A2EB', // azul para otro grupo
            '#FFCE56', // amarillo si hay un tercer grupo - opcional
            '#4BC0C0'  // celeste si hay un cuarto grupo - opcional
          ],
          borderColor: '#ffffff', // color del borde entre porciones
          borderWidth: 1          // grosor del borde
        }
      ];
    });
  }
}
