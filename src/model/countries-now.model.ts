import { Iso } from './iso.model';

export interface CountriesNow {
  error: boolean;
  msg: string;
  data: Array<Iso>;
}
