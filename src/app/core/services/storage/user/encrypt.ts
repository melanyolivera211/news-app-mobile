import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class EncryptProvider {
  hash(value: string): string {
    return CryptoJS.SHA256(value).toString();
  }
  compare(plain: string, hashed: string): boolean {
    return this.hash(plain) === hashed;
  }
}