const formatter = new Intl.NumberFormat("nl-NL", {
	style: "currency",
	currency: "EUR",
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
	currencySign: "accounting"
});

export const formatThousands = (str: string) => {
	console.log("formatThousands", str, str.length);
	return str.length > 2 ? formatter.format(toNumber(str)) : "€ ";
};

export const toNumber = (str: string) => {
	const cleaned = str.replaceAll(/[^0-9]/g, "");
	return cleaned ? parseInt(cleaned, 10) : 0;
};
