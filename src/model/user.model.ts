import { Credential } from '@models/credential.model';
import { Country } from '@models/country.model';

export interface User extends Credential{

	id: string,
	name: string,
    surname: string,
	country: Country

}