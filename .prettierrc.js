module.exports = {
    singleQuote: true,
    semi: true,
    bracketSpacing: true,
    tabWidth: 4,
    trailingComma: 'es5',
    overrides: [
        {
            files: '*.md',
            options: {
                tabWidth: 2,
            },
        },
    ],
    plugins: [
        require('prettier-plugin-import-sort'),
        require('prettier-plugin-packagejson'),
    ],
};
