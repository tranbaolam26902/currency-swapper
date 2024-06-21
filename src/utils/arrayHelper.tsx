/**
 * Remove duplicated items in an array
 * @param {Array<T>} array - Array need to be remove duplicated times
 */
const removeDuplicate = <T,>(array: Array<T>): Array<T> => {
    const jsonArray = array.map((element) => JSON.stringify(element));
    const uniqueSet = new Set(jsonArray);
    const uniqueArray = Array.from(uniqueSet).map((element) => JSON.parse(element));

    return uniqueArray;
};

export { removeDuplicate };
