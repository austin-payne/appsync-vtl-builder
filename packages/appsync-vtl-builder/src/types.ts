export interface VTLBuilderConstruct<
    Requires extends string = string,
    Provides extends string = string
> {
    vtl: VTLBuilderOutput<Requires, Provides>;
}

export type VTLBuilderInput<
    Requires extends string,
    Provides extends string
> = {
    requiresVars: Requires[];
    providesVars: Provides[];
    buildRequestMappingTemplate: VTLBuilderFunction<Requires | Provides>;
    buildResponseMappingTemplate: VTLBuilderFunction<Requires | Provides>;
};

export type VTLBuilderOutput<
    Requires extends string = string,
    Provides extends string = string
> = {
    requiresVars: Requires[];
    providesVars: Provides[];
    allVars: (Requires | Provides)[];
    usesVars: (Requires | Provides)[];
    setsVars: (Requires | Provides)[];
    requestMappingTemplate: string;
    responseMappingTemplate: string;
};

export type VTLBuilderFunction<Vars extends string> = (
    utils: VTLBuilderUtils<Vars>
) => string;

export type VTLBuilderUtils<Vars extends string> = {
    value: (variable: Vars) => string;
    setValue: (variable: Vars, value: string) => string;
};
