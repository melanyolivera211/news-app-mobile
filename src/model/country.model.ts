import { Element } from './element.model';
import { Iso } from './iso.model';

export interface Country extends Element {}

export function castCountryFromIso(isos: Array<Iso>): Array<Country> {
  return isos.map((iso) => {
    return {
      id: iso.Iso3,
      value: iso.name,
    };
  });
}
