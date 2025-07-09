import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Mensaje } from '../../../models/Mensaje';
import { MensajeService } from '../../../services/mensaje.service';
import { Usuario } from '../../../models/Usuario';
import { Asesoria } from '../../../models/Asesoria';
import { ArchivoService } from '../../../services/archivo.service';
import { MatIconModule } from '@angular/material/icon';
import { Archivo } from '../../../models/Archivo';
import { LoginService } from '../../../services/login.service';
import { identity } from 'rxjs';

@Component({
  selector: 'app-chat-asesoria',
  imports: [ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './chat-asesoria.html',
  styleUrl: './chat-asesoria.css'
})
export class ChatAsesoria implements OnInit{

  // PARA ALMACENAR EL idAsesoria que se detecta automaticamente
  idAsesoria: number = 0;
  // PARA ALMACENAR EL nombreAsesoria que se detecta automaticamente
  nameAsesoria: string = '';
  // CREAR UN ARREGLO DE MENSAJES PARA EL CHAT
  mensajes: Mensaje[] = [];
  // CREAR UN ARREGLO DE ARCHIVOS PARA EL CHAT
  archivos: Archivo[] = [];
  // el contenido nuevo es lo que envia el usuario en la interfaz
  contenidoNuevo: string = '';
  // selectedFile guarda el archivo que el usuario a seleccionado
  selectedFile: File | null = null;

  idUsuarioActual: number = 0;

  constructor(
    private route: ActivatedRoute,
    private mensajeService: MensajeService,
    private archivoS:ArchivoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Obtener el id de la asesoría desde la ruta // el + es para convertir el valor a numero
    this.idAsesoria = +this.route.snapshot.paramMap.get('id')!;
    // Obtener el nombre de la asesoría desde la URL y decodificarlo en caso tenga
    // caracteres especiales como espacios, tildes o otro - hace la misma funcion que el de arriba (id)
    this.nameAsesoria = decodeURIComponent(this.route.snapshot.paramMap.get('nombreAsesoria')!);

    this.idUsuarioActual = this.loginService.getIdUsuario()!;
     console.log("ID USUARIO EN LOGIN:", this.idUsuarioActual); // PARA PROBAR SI RECIBIMOS EL ID DE LOGIN DEL USUARIO

    // SE CARGA TODOS LOS MENSAJES EXISTENTES EN BASE DE DATOS
      this.cargarMensajes();
    // SE CARGA TODOS LOS ARCHIVOS EXISTENTES EN BASE DE DATOS
      this.cargarArchivos();
  }


  // METODO PARA CARGAR ARCHIVOS POR ID DE ASESORIA
  cargarArchivos() {
  this.archivoS.listarPorAsesoria(this.idAsesoria).subscribe((data) => {
    this.archivos = data;
  });
}

//METODO PARA CARGAR MENSAJES POR ID DE ASESORIA
  cargarMensajes() {
    this.mensajeService.listarMensajesPorAsesoria(this.idAsesoria).subscribe((data) => {
      this.mensajes = data;
    });
  }

  //METODO PARA ENVIAR MENSAJE
  enviarMensaje() {
  if (this.contenidoNuevo.trim().length === 0) {
    return;
  }


  const nuevoMensaje: any = {
    contenido: this.contenidoNuevo,
    fechaMensaje: new Date(),
    orden: this.mensajes.length + 1,
    usuario: {
      idUsuario: this.idUsuarioActual
    },
    asesoria: {
      idAsesoria: this.idAsesoria
    }
  };

  this.mensajeService.insert(nuevoMensaje).subscribe(() => {
    this.contenidoNuevo = '';
    this.cargarMensajes();
  });
}

  //pARA SUBIR ARCHIVO
// ese método sirve para capturar y guardar el archivo que el usuario selecciona desde el <input type="file" />,
// asignándolo a this.selectedFile para luego poder subirlo.
  onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

  subirArchivo() {
    // si no se ha seleccionado ningún archivo (selectedFile es null), se detiene la función y no intenta subir nada.
  if (!this.selectedFile) {
    return;
  }
    // extrae la extensión del archivo ('pdf', 'docx', y otros) en minúsculas.
    const extension = this.selectedFile.name.split('.').pop()?.toLowerCase();

    //FORMATOS PERMITIDOS PARA LOS ARCHIVOS - ESTO TIENE QUE SER IGUAL A LA BASE DE DATOS DE FORMATO_ARCHIVO
    const formatosPermitidos: { [key: string]: number } = {
      pdf: 1,
      docx: 2,
      mp3: 3,
      mp4: 4,
      pptx: 5
    };

    // busca el ID del formato en base a la extensión extraída y lo asigna a LA Constante idFormato
    const idFormato = formatosPermitidos[extension || ''];

    // Si idformato es diferente a los formatospermidos va enviar una alerta de formato no permitido
    if (!idFormato) {
      alert('Formato de archivo no permitido');
      return;
    }
    // En caso contrario se crea el formdata para pasar todos los campos necesarios para enviar un objeto de tipo archivo
  const formData = new FormData();
  formData.append('archivo', this.selectedFile);
  formData.append('idUsuario', this.idUsuarioActual.toString());
  
  formData.append('idAsesoria', this.idAsesoria.toString());
  formData.append('idFormato', idFormato.toString()); // id 1 = pdf, 2= docx , 3=mp3, 4 = mp4 y 5 = pptx

  // SE LLAMA AL SERVICIO Y METODO SUBIR ARCHIVO
  this.archivoS.subirArchivo(formData).subscribe(() => {
      alert('Archivo subido con éxito'); //alerta en la interfaz
      this.selectedFile = null; // la seleccion  del archivo se pone en null nuevamente
      this.cargarArchivos(); // actualiza lista en el chat de archivos
    },
  );
}

}
