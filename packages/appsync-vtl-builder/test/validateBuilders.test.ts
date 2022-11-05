import {
    VTLBuilderConstruct,
    VTLBuilderOutput,
    buildVTL,
    validateBuilderConstructs,
} from '../src';

// mock AppsyncFunction

type AppsyncFunctionProps = {
    requestMappingTemplate: string;
    responseMappingTemplate: string;
};
class AppsyncFunction {
    constructor(_: AppsyncFunctionProps) {}
}

// test

enum Vars {
    A = 'a',
    B = 'b',
    C = 'c',
}

class GetABDataFunction extends AppsyncFunction implements VTLBuilderConstruct {
    public readonly vtl: VTLBuilderOutput;

    constructor() {
        const vtl = buildVTL({
            requiresVars: [],
            providesVars: [Vars.A, Vars.B],
            buildRequestMappingTemplate: () => `{}`,
            buildResponseMappingTemplate: ({ value, setValue }) => `
                ${setValue(Vars.A, '"hello"')}
                ${setValue(Vars.B, '42')}
                {
                    "prop": $util.toJson(${value(Vars.A)})
                }
            `,
        });
        super({
            requestMappingTemplate: vtl.requestMappingTemplate,
            responseMappingTemplate: vtl.responseMappingTemplate,
        });
        this.vtl = vtl;
    }
}

class GetCDataFunction extends AppsyncFunction implements VTLBuilderConstruct {
    public readonly vtl: VTLBuilderOutput;

    constructor() {
        const vtl = buildVTL({
            requiresVars: [Vars.A, Vars.B],
            providesVars: [Vars.C],
            buildRequestMappingTemplate: ({ value }) => `{
                "requiredProp": $util.toJson(${value(Vars.A)})
            }`,
            buildResponseMappingTemplate: ({ value, setValue }) => `
                ${setValue(Vars.C, '"world"')}
                {}
            `,
        });
        super({
            requestMappingTemplate: vtl.requestMappingTemplate,
            responseMappingTemplate: vtl.responseMappingTemplate,
        });
        this.vtl = vtl;
    }
}

describe('works', () => {
    it('does a thing', async () => {
        const functions = [new GetABDataFunction(), new GetCDataFunction()];
        validateBuilderConstructs({ hasVars: [] }, functions);

        expect(functions.map((fn) => fn.vtl)).toEqual([]);
    });
});
