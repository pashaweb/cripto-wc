interface moneyFormat {
    formated: string;
    money: number;
    name: string;
}
declare const _sfc_main: import("vue").DefineComponent<{
    pair: {
        type: StringConstructor;
        required: false;
    };
    backround: {
        type: StringConstructor;
        required: true;
    };
}, {
    props: any;
    apiUrl: string;
    date: import("vue").Ref<{
        toString: () => string;
        toDateString: () => string;
        toTimeString: () => string;
        toLocaleString: {
            (): string;
            (locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
            (locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
        };
        toLocaleDateString: {
            (): string;
            (locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
            (locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
        };
        toLocaleTimeString: {
            (): string;
            (locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
            (locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
        };
        valueOf: () => number;
        getTime: () => number;
        getFullYear: () => number;
        getUTCFullYear: () => number;
        getMonth: () => number;
        getUTCMonth: () => number;
        getDate: () => number;
        getUTCDate: () => number;
        getDay: () => number;
        getUTCDay: () => number;
        getHours: () => number;
        getUTCHours: () => number;
        getMinutes: () => number;
        getUTCMinutes: () => number;
        getSeconds: () => number;
        getUTCSeconds: () => number;
        getMilliseconds: () => number;
        getUTCMilliseconds: () => number;
        getTimezoneOffset: () => number;
        setTime: (time: number) => number;
        setMilliseconds: (ms: number) => number;
        setUTCMilliseconds: (ms: number) => number;
        setSeconds: (sec: number, ms?: number) => number;
        setUTCSeconds: (sec: number, ms?: number) => number;
        setMinutes: (min: number, sec?: number, ms?: number) => number;
        setUTCMinutes: (min: number, sec?: number, ms?: number) => number;
        setHours: (hours: number, min?: number, sec?: number, ms?: number) => number;
        setUTCHours: (hours: number, min?: number, sec?: number, ms?: number) => number;
        setDate: (date: number) => number;
        setUTCDate: (date: number) => number;
        setMonth: (month: number, date?: number) => number;
        setUTCMonth: (month: number, date?: number) => number;
        setFullYear: (year: number, month?: number, date?: number) => number;
        setUTCFullYear: (year: number, month?: number, date?: number) => number;
        toUTCString: () => string;
        toISOString: () => string;
        toJSON: (key?: any) => string;
        getVarDate: () => VarDate;
        [Symbol.toPrimitive]: {
            (hint: "default"): string;
            (hint: "string"): string;
            (hint: "number"): number;
            (hint: string): string | number;
        };
    }>;
    btcPair: string;
    ethPair: string;
    pass: any;
    btc: {
        formated: string;
        money: number;
        name: string;
    };
    eth: {
        formated: string;
        money: number;
        name: string;
    };
    getCoinPrice: (pair: string) => Promise<moneyFormat>;
    setCoins: () => Promise<void>;
    CoinCheck: import("vue").DefineComponent<{
        coin: {
            type: ObjectConstructor;
            required: true;
        };
    }, {
        props: any;
        coin: import("vue").Ref<{
            name: string;
            money: number;
            formated: string;
        }>;
        ArrowCheck: import("vue").DefineComponent<{
            amount: {
                type: NumberConstructor;
                required: true;
            };
            name: {
                type: StringConstructor;
                required: true;
            };
        }, {
            last: any;
            props: any;
            showUp: import("vue").Ref<boolean>;
            showArrows: import("vue").Ref<boolean>;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
            amount: {
                type: NumberConstructor;
                required: true;
            };
            name: {
                type: StringConstructor;
                required: true;
            };
        }>>, {}>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        coin: {
            type: ObjectConstructor;
            required: true;
        };
    }>>, {}>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    pair: {
        type: StringConstructor;
        required: false;
    };
    backround: {
        type: StringConstructor;
        required: true;
    };
}>>, {}>;
export default _sfc_main;
