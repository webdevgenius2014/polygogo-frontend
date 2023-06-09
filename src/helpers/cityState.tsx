import { State, City } from 'country-state-city';

export const getStateData = (countryCode: any) => {
    const stateData = State.getStatesOfCountry(countryCode).map(state => ({
        value: state.name,
        displayValue: `${state.name} - ${state.isoCode}` 
    }))   
	return stateData;
}
export const getCityData=(countryCode:any, stateCode:any) => {
    const citydata = City.getCitiesOfState(countryCode, stateCode).map(city => ({
        value: city.name,
        displayValue: city.name
    }))
    return citydata;
}

export const filterStateCode = (countryCode: any, sateVal: any, ) => {
    let isoCode:any;
    const stateData = State.getStatesOfCountry(countryCode);

    const filteredState = stateData.filter(
        (state) => state.name === sateVal
    );
    if(filteredState){        
        isoCode = filteredState[0]?.isoCode
    }    
	return isoCode;
}