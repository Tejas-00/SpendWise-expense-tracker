export const validEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    return regex.test(email);
}
// /^[^\s@]+@[^\s@]+\.[^\s@]+$/ checks:
// at least one non-space, non-@ character before @
// then an @
// then at least one non-space, non-@ character
// then a dot .
// then again at least one non-space, non-@ character

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0]
    }

    return initials.toUpperCase();
}

export const addThousandSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!d))/g, ",");
    
    return fractionPart ? `${formattedInteger}.${fractionPart}` : formattedInteger
}