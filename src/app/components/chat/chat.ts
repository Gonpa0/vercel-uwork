import { Component } from '@angular/core';
import { GeminiService } from '../../services/gemini.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat',
  imports: [FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat {
  userPrompt: string = '';
  selectedFile: File | null = null;
  geminiResponse: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private geminiService: GeminiService) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.errorMessage = ''; // Clear previous errors
      console.log('Archivo seleccionado:', this.selectedFile.name, this.selectedFile.type, this.selectedFile.size);
    } else {
      this.selectedFile = null;
    }
  }

  enviarMensaje() {
    this.geminiResponse = '';
    this.errorMessage = '';
    this.isLoading = true;

    if (this.selectedFile) {
      if (!this.userPrompt.trim()) {
        this.errorMessage = 'Por favor, introduce una pregunta para el archivo.';
        this.isLoading = false;
        return;
      }
      this.geminiService.enviarArchivo(this.selectedFile, this.userPrompt).subscribe({
        next: (response) => {
          this.geminiResponse = response;
          console.log('Respuesta de Gemini (archivo):', response);
          this.isLoading = false;
          
          this.selectedFile = null;
          this.userPrompt = '';
        },
        error: (err) => {
          this.errorMessage = err.message || 'Error al enviar el archivo a Gemini.';
          console.error('Error en componente al enviar archivo:', err);
          this.isLoading = false;
        }
      });
    } else if (this.userPrompt.trim()) {
      const geminiData = { prompt: this.userPrompt };
      this.geminiService.enviarTexto(geminiData).subscribe({
        next: (response) => {
          this.geminiResponse = response;
          console.log('Respuesta de Gemini (texto):', response);
          this.isLoading = false;
          this.userPrompt = ''; 
        },
        error: (err) => {
          this.errorMessage = err.message || 'Error al enviar texto a Gemini.';
          console.error('Error en componente al enviar texto:', err);
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Por favor, introduce un mensaje o selecciona un archivo.';
      this.isLoading = false;
    }
  }
}
