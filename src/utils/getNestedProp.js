// Initially we pass original object and the deeply nested key as a string
// Then in function we create an array of keys, and check if there is any empty value
// Finally we iterate on that each key and in the end value will return
// Example: "key1.key2.key3" --> [key1, key2, key3] --> obj[key1] --> obj1[key2] --> obj2[key3] --> value3
// So in the end when we reach deepest level of key, it will return to primitive value. Because we replaced "acc" obj with new object until the end.
export const getNestedProp = (obj, nestedKey) => {
  return nestedKey
    .split(/\.|\[|\]/)
    .filter(Boolean)
    .reduce((acc, part) => acc && acc[part], obj);
};
