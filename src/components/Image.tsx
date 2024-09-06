import createAssetPath from "../utils/createAssetPath";

type ImageProps = {
    alt: string;
    src: string;
};

const Image = ({ src, alt }: ImageProps) => {
    return <img src={createAssetPath(src)} alt={alt} />;
};
export default Image;
