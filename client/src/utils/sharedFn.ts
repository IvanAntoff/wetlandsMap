export const reduceText = (text: string, max: number = 100) :string => {
    if (!text || typeof(text) !== 'string') return '';
    if (text.length > max) return (text.substring(0, max)+'...'); 
    return text;
}

export const toCapitalizeCase = (text: string) :string => {
    if (!text || text.length <= 0) return '';
    const lowerText = text.substr(1).toLowerCase();
    return (text[0].toUpperCase() + lowerText);
}