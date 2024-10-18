import { useEffect, useState } from 'react';
import createAssetPath from '../utils/createAssetPath';

const useAsset = <T = string>(path: string, parser: (source: string) => T = (v) => v as T) => {
	const [asset, setAsset] = useState<T>();
	useEffect(() => {
		(async () => {
			const assetPath = createAssetPath(path);
			const response = await fetch(assetPath);
			if (!response.ok) {
				throw new Error(`Failed to fetch ${path}`);
			}
			const data = await response.text();
			setAsset(parser(data));
		})();
	}, [path, parser]);

	return asset;
};

export default useAsset;
