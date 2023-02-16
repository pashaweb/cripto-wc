export interface TComplexProps {
    color: string;
    padding: string;
    borderRadius: string;
    border: string;
    margin: string;
    display: string;
    flexDirection: string;
    justifyContent: string;
    alignItems: string;
};
export type TComplex  = TComplexProps | null;


export type TBackground = string | 'yellow';
export type TPair = string | 'red';

export enum MarketEventsEnum {
    CHANGE = 'MARKET_CHANGE',
    UPDATE = 'MARKET_UPDATE',
    SELECT = 'MARKET_SELECT',
    ERROR = 'MARKET_ERROR'
}