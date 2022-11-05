export const getVariableIdentifier = <Var extends string>(variable: Var) =>
    `$appsync-vtl-builder_${variable}`;

export const getVariableIdentifiers = <Vars extends string>(
    variables: Vars[]
) =>
    Object.fromEntries(
        variables.map((variable) => [variable, getVariableIdentifier(variable)])
    ) as Record<Vars, string>;

export const setVariable = <Var extends string>(variable: Var, value: string) =>
    `#set(${getVariableIdentifier(variable)} = ${value})`;
