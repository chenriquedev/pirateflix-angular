import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

type Severity =
  | 'success'
  | 'info'
  | 'warn'
  | 'error'
  | 'secondary'
  | 'contrast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showToast(severity: Severity, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail, life: 3000 });
  }
}
