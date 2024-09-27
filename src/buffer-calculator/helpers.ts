const formatter = new Intl.NumberFormat("nl-NL", {
	style: "currency",
	currency: "EUR",
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
	currencySign: "accounting"
});

export const formatThousands = (val: number) => {
	return val == undefined ? "€ " : formatter.format(val);
};

export const toNumber = (str: string) => {
	if (!str) return 0;
	const cleaned = str.replaceAll(/\D/g, "");
	return cleaned ? parseInt(cleaned, 10) : 0;
};

export const summary = (fn: () => number) => {
	try {
		const result = fn();
		return Number.isNaN(result) || result == undefined ? "€ 0" : formatThousands(result);
	} catch (e) {
		return "€ 0";
	}
};
