const formatValue = (value: number): string =>
    Intl.NumberFormat([], {
        currency: 'BRL',
        style: 'currency',
    }).format(value);

export default formatValue;
