import ICurrency from './ICurrency';
import IContinent from './IContinent';
import ICity from './ICity';
import ILanguage from './ILanguage';
import IReligion from './IReligion';

interface ICountry{
    id: number;
    name: string;
    full_name: string;
    capital_city: ICity;
    continent: IContinent;
    language: Array<ILanguage>;
    religion: Array<IReligion>;
    currency: ICurrency;
    area: number;
    population: number;
    GDP: number;
    web_domain: string;
    calling_code: string;
    driving_on_right: boolean;
    flag_url: string;
    difficulty: number;
  }
  export default ICountry;