import { useTranslation } from '../i18n';
import { File } from '../icons';

const DownloadButton = () => {
	const { t } = useTranslation();
	return (
		<button
			type="button"
			className="hover:bg-hover group relative bg-button py-5 pl-20 text-left text-white"
			onClick={() => {}}
		>
			<File className="absolute left-5 top-1/2 h-10 w-10 -translate-y-1/2 fill-white" />
			<div className="text-xl font-bold group-hover:underline">{t('result.download-title')}</div>
			<div className="text-sm">{t('result.download-text')}</div>
		</button>
	);
};

export default DownloadButton;
