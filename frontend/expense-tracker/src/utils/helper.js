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