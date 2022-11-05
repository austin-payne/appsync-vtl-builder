import { VTLBuilderInput, VTLBuilderOutput, VTLBuilderUtils } from './types';
import { getVariableIdentifier, setVariable } from './variables';
import { mergeItems, removeDuplicates } from './arrays';
import { putStashFromVariable, setVariableFromStash } from './stash';

const buildVariableSetterTemplate = <Vars extends string>(variables: Vars[]) =>
    variables.map(setVariableFromStash).join('\n');

const buildStashSetterTemplate = <Vars extends string>(variables: Vars[]) =>
    variables.map(putStashFromVariable).join('\n');

const prettifyTemplate = (template: string) =>
    template
        .split('\n')
        .map((line) => line.trim())
        .join('\n');

export const buildVTL = <Requires extends string, Provides extends string>({
    requiresVars,
    providesVars,
    buildRequestMappingTemplate,
    buildResponseMappingTemplate,
}: VTLBuilderInput<Requires, Provides>): VTLBuilderOutput<
    Requires,
    Provides
> => {
    requiresVars = removeDuplicates(requiresVars);
    providesVars = removeDuplicates(providesVars);
    const allVars = mergeItems<Requires | Provides>(requiresVars, providesVars);
    const usesVars: (Requires | Provides)[] = [];
    const setsVars: (Requires | Provides)[] = [];

    const buildTemplate = (templateBody: string) =>
        `
            ${buildVariableSetterTemplate(allVars)}
            ${templateBody}
            ${buildStashSetterTemplate(allVars)}
        `;

    const utils: VTLBuilderUtils<Requires | Provides> = {
        value: (variable) => {
            usesVars.push(variable);
            return getVariableIdentifier(variable);
        },
        setValue: (variable, value) => {
            setsVars.push(variable);
            return setVariable(variable, value);
        },
    };

    return {
        requiresVars,
        providesVars,
        allVars,
        usesVars,
        setsVars,
        requestMappingTemplate: prettifyTemplate(
            buildTemplate(buildRequestMappingTemplate(utils))
        ),
        responseMappingTemplate: prettifyTemplate(
            buildTemplate(buildResponseMappingTemplate(utils))
        ),
    };
};
