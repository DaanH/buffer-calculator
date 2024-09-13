import { useTranslation } from "../i18n";

const Conclusion = () => {
	const { t } = useTranslation();
	return (
		<div className="bg-slate-500 ">
			<div>stappenheader</div>
			<h2>{t("result.title")}</h2>
			<div>calculatie</div>
			<div>uitleg</div>
			<div>conclusie</div>
			<div>downloadknop</div>
			<div>terugknop</div>
		</div>
	);
};
export default Conclusion;
