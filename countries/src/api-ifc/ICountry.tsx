import ICurrency from '../api-ifc/ICurrency';
import IContinent from '../api-ifc/IContinent';
import ICity from '../api-ifc/ICity';
import ILanguage from '../api-ifc/ILanguage';
import IReligion from '../api-ifc/IReligion';

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
  }

  export default ICountry;