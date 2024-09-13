import { useTranslation } from "../i18n";

const Step = () => {
	const { t } = useTranslation();
	return (
		<div className="bg-slate-500 ">
			<div>stappenheader</div>
			<h2>{t("select-form.question")}</h2>
		</div>
	);
};
export default Step;
