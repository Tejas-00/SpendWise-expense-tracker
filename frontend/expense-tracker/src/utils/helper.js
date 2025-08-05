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

export const addIndianThousandSeparator = (number) => {
    let [integer, decimal] = number.toString().split(".");
    let lastThree = integer.slice(-3);
    let otherNumbers = integer.slice(0, -3);
    
    if (otherNumbers !== "") {
        lastThree = "," + lastThree;
    }

    let formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return decimal ? formatted + "." + decimal : formatted;
}