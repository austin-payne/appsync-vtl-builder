import { getVariableIdentifier, setVariable } from './variables';

export const getStashKey = <Var extends string>(variable: Var) =>
    `appsync-vtl-builder:${variable}`;

export const getStashValue = <Var extends string>(variable: Var) =>
    `$ctx.stash.get('${getStashKey(variable)}')`;

export const putStashValue = <Var extends string>(
    variable: Var,
    value: string
) => `$util.qr($ctx.stash.put('${getStashKey(variable)}', ${value}))`;

export const setVariableFromStash = <Var extends string>(variable: Var) =>
    setVariable(variable, getStashValue(variable));

export const putStashFromVariable = <Var extends string>(variable: Var) =>
    putStashValue(variable, getVariableIdentifier(variable));
