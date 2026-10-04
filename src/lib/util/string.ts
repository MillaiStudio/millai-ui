export const camelToKebab = (value: string): string => {
    return value.replace(/[A-Z]/g, (letter) => {
        return `-${letter.toLowerCase()}`;
    });
};
