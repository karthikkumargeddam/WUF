// Common clothing color mapping to hex codes
export const colorMap: Record<string, string> = {
    // Basic Colors
    'black': '#000000',
    'white': '#FFFFFF',
    'grey': '#808080',
    'gray': '#808080',
    'navy': '#000080',
    'red': '#FF0000',
    'blue': '#0000FF',
    'green': '#008000',
    'yellow': '#FFFF00',
    'orange': '#FFA500',
    'purple': '#800080',
    'pink': '#FFC0CB',
    'brown': '#A52A2A',

    // Specific Shades
    'french navy': '#1A237E',
    'royal': '#4169E1',
    'sky': '#87CEEB',
    'sky blue': '#87CEEB',
    'bottle green': '#006A4E',
    'emerald': '#50C878',
    'lime': '#32CD32',
    'maroon': '#800000',
    'burgundy': '#800020',
    'charcoal': '#36454F',
    'heather grey': '#D3D3D3',
    'ash': '#B2BEB5',
    'sport grey': '#A9A9A9',
    'gold': '#FFD700',
    'orange crush': '#FF7F50',
    'sunflower': '#E4D422',
    'kelly green': '#4CBB17',
    'dark heather': '#555555',
    'graphite': '#484848',
    'sand': '#C2B280',
    'khaki': '#F0E68C',
    'olive': '#808000',
    'chocolate': '#D2691E',
    'purple': '#800080',
    'lavender': '#E6E6FA',
    'fuschia': '#FF00FF',
    'hot pink': '#FF69B4',
    'turquoise': '#40E0D0',
    'teal': '#008080',
    'mint': '#98FB98',
};

// Helper function to get color for display
export const getColorHex = (colorName: string): string => {
    const normalizedName = colorName.toLowerCase().trim();
    return colorMap[normalizedName] || '#E5E7EB'; // Default to grey-200 if not found
};

// Common size order for sorting
export const sizeOrder = [
    'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL',
    '6XL', 'S/M', 'L/XL', 'One Size'
];

export const sortSizes = (sizes: string[]): string[] => {
    return [...sizes].sort((a, b) => {
        const indexA = sizeOrder.indexOf(a.toUpperCase());
        const indexB = sizeOrder.indexOf(b.toUpperCase());

        // If both in known list, sort by index
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;

        // If only A is known, it comes first
        if (indexA !== -1) return -1;
        // If only B is known, it comes first
        if (indexB !== -1) return 1;

        // If neither known, sort alphabetically
        return a.localeCompare(b);
    });
};
