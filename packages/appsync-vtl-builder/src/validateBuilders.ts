import { mergeItems, missingItems } from './arrays';

import { VTLBuilderConstruct } from './types';

type VTLBuilderContext = {
    hasVars: string[];
};

export const validateBuilderConstructs = (
    context: VTLBuilderContext,
    constructs: VTLBuilderConstruct<string, string>[]
) =>
    constructs.forEach((construct) => {
        if (construct.vtl !== undefined) {
            const missingRequiredVars = missingItems(
                construct.vtl.requiresVars,
                context.hasVars
            );
            if (missingRequiredVars.length) {
                throw new Error(
                    `Missing context variables marked as required by "${
                        construct.constructor.name
                    }": ${missingRequiredVars.join(', ')}`
                );
            }

            const missingProvidedVars = missingItems(
                construct.vtl.providesVars,
                construct.vtl.providesVars
            );
            if (missingProvidedVars.length) {
                throw new Error(
                    `Missing context variables marked as provided by "${
                        construct.constructor.name
                    }": ${missingProvidedVars.join(', ')}`
                );
            }

            const unusedRequiredVars = missingItems(
                construct.vtl.requiresVars,
                construct.vtl.usesVars
            );
            if (unusedRequiredVars.length) {
                throw new Error(
                    `Some variables required by "${
                        construct.constructor.name
                    }" are unused: ${unusedRequiredVars.join(', ')}`
                );
            }

            context.hasVars = mergeItems(
                context.hasVars,
                construct.vtl.providesVars
            );
        }
    });
