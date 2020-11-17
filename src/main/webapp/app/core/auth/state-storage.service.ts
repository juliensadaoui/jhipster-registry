import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({ providedIn: 'root' })
export class StateStorageService {
  private previousUrlKey = 'previousUrl';

  constructor(private $sessionStorage: SessionStorageService) {}

  storeUrl(url: string): void {
    this.$sessionStorage.store(this.previousUrlKey, url);
  }

  getUrl(): string | null {
    return this.$sessionStorage.retrieve(this.previousUrlKey) as string | null;
  }

  clearUrl(): void {
    this.$sessionStorage.clear(this.previousUrlKey);
  }

  storeDestinationState(destinationState: any, destinationStateParams: any, fromState: any): void {
    const destinationInfo = {
      destination: {
        name: destinationState.name,
        data: destinationState.data,
      },
      params: destinationStateParams,
      from: {
        name: fromState.name,
      },
    };
    this.$sessionStorage.store('destinationState', destinationInfo);
  }
}
