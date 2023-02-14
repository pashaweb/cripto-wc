declare const _sfc_main: import("vue").DefineComponent<{
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
export default _sfc_main;
