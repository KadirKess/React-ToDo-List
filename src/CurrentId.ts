let currentId = 0;

export const getCurrentId = () => {
    return currentId;
};

export const setCurrentId = (id: number) => {
    currentId = id;
};
