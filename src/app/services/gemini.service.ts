/*import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Gemini } from '../models/Gemini';
import { Observable } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private url = `${base_url}/chat`;
  constructor(private http: HttpClient) { }

  enviarTexto(gemini: Gemini): Observable<string> {
    return this.http.post(`${this.url}/text`, gemini, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text'
    });
  }
  enviarArchivo(file: File, prompt: string): Observable<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('prompt', prompt);

  const extension = file.name.split('.').pop()?.toLowerCase();

  let tipo = 'file'; 

  if (extension) {
    if (['png', 'jpg', 'jpeg', 'gif'].includes(extension)) tipo = 'image';
    else if (['mp3', 'wav', 'ogg'].includes(extension)) tipo = 'audio';
    else if (['mp4', 'avi', 'mov'].includes(extension)) tipo = 'video';
  }

  return this.http.post(`${this.url}/${tipo}`, formData, {
    responseType: 'text'
  });
}
}*/
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse
import { Gemini } from '../models/Gemini'; // Assuming Gemini model for text
import { Observable, throwError } from 'rxjs'; // Import throwError
import { catchError } from 'rxjs/operators'; // Import catchError

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private url = `${base_url}/chat`;
  private readonly MAX_FILE_SIZE_MB = 18; // Keep it slightly under 20MB for safety

  constructor(private http: HttpClient) { }

  enviarTexto(gemini: Gemini): Observable<string> {
    console.log('Enviando texto a Gemini:', gemini.prompt);
    return this.http.post(`${this.url}/text`, gemini, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text'
    }).pipe(
      catchError(this.handleError) // Add error handling
    );
  }

  enviarArchivo(file: File, prompt: string): Observable<string> {
    // Client-side file size validation
    if (file.size > this.MAX_FILE_SIZE_MB * 1024 * 1024) {
      const errorMessage = `El archivo excede el tamaño máximo permitido de ${this.MAX_FILE_SIZE_MB} MB.`;
      console.error(errorMessage, 'Tamaño del archivo:', file.size / (1024 * 1024), 'MB');
      return throwError(() => new Error(errorMessage)); // Emit an error observable
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('prompt', prompt);

    const extension = file.name.split('.').pop()?.toLowerCase();
    let tipo = 'file'; // Default to 'file' for documents

    // Log detected extension and initial type
    console.log('DEBUG (Frontend): Extensión del archivo detectada:', extension);
    console.log('DEBUG (Frontend): MIME Type del archivo (desde el navegador):', file.type);


    if (extension) {
      if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'heic', 'heif'].includes(extension)) {
        tipo = 'image';
      } else if (['mp3', 'wav', 'ogg', 'flac'].includes(extension)) { // Added flac
        tipo = 'audio';
      } else if (['mp4', 'avi', 'mov', 'mkv', 'webm'].includes(extension)) { // Added mkv, webm
        tipo = 'video';
      }
      // If it's none of the above, it remains 'file' for document processing (.pdf, .docx, .xlsx, .pptx, .txt)
    }

    console.log(`DEBUG (Frontend): Enviando archivo a ${this.url}/${tipo}`);
    return this.http.post(`${this.url}/${tipo}`, formData, {
      responseType: 'text'
    }).pipe(
      catchError(this.handleError) // Add error handling
    );
  }

  // Generic error handling method
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred.
      errorMessage = `Error del cliente/red: ${error.error.message}`;
    } else if (typeof error.error === 'string') {
      // Backend returned an error message as plain text
      errorMessage = `Error del servidor: ${error.error}`;
    } else if (error.status) {
      // Backend returned an unsuccessful response code
      // The response body may contain clues as to what went wrong.
      errorMessage = `Error ${error.status}: ${error.statusText || 'Error en la solicitud'}`;
      if (error.error && typeof error.error === 'object' && error.error.message) {
        errorMessage += ` - ${error.error.message}`;
      } else if (error.message) {
         errorMessage += ` - ${error.message}`;
      }
    }
    console.error('ERROR EN GEMINI SERVICE:', error);
    return throwError(() => new Error(errorMessage));
  }
}
