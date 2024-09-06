export default (filePath: string) => {
    if (import.meta.env.MODE == "cms") {
        const fileName = filePath.toLowerCase().split("/").pop() as string;
        return new URL(fileName, import.meta.url).href;
    } else {
        return filePath;
    }
};
