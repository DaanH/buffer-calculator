const formatter = new Intl.NumberFormat("nl-NL", {
	style: "currency",
	currency: "EUR",
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
	currencySign: "accounting"
});

export const formatThousands = (str: string) => {
	const cleaned = str.replaceAll(/[^0-9]/g, "");
	return cleaned.length > 0 ? formatter.format(toNumber(str)) : "€ ";
};

export const toNumber = (str: string) => {
	if (!str) return 0;
	const cleaned = str.replaceAll(/[^0-9]/g, "");
	return cleaned ? parseInt(cleaned, 10) : 0;
};
