export const getInputType = (value) => {
    if (typeof value === "number") {
        return "number"
    } else if (typeof value === "string") {
        return "text"
    } else if (typeof value === "boolean") {
        return "checkbox"
    }
};

export const title = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}