import { connect } from 'react-redux';
import pdfMake from 'pdfmake/build/pdfmake';
import DownloadButton from '../../components/result-screen/download-button';
import { getEquityValues } from '../../selectors/excessive-equity/excessive-equity-selectors';
import pdfFonts from './vfs_fonts';

// Webpack, pdfMake and font stuff: it's an unholy combination, but the next line solves it.
// See https://github.com/bpampuch/pdfmake/issues/910#issuecomment-311824467
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
	ROSansWebText: {
		normal: 'RO-SansWebText-Regular.ttf',
		bold: 'RO-SansWebText-Bold.ttf',
		italics: 'RO-SansWebText-Italic.ttf'
	}
};

const formatCurrency = (number) => {
	const formatter = new Intl.NumberFormat('nl-NL', {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	});
	return formatter.format(number);
};
const format = (number) => {
	const formatter = new Intl.NumberFormat('nl-NL', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	});
	return formatter.format(number);
};
const formatRatio = (number) => {
	const formatter = new Intl.NumberFormat('nl-NL', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
	return formatter.format(number);
};

const downloadPdf = (props) => {
	const { title, equity, explanation } = props;

	const now = new Date();
	const dateOptions = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	};
	const today = now.toLocaleDateString(dateOptions);

	const definitions = {
		pageSize: 'A4',
		pageOrientation: 'portrait',
		pageMargins: [40, 100, 40, 60],

		content: [
			{
				text: title,
				style: 'h2'
			},

			{
				table: {
					widths: [300, 70, 10],
					body: [
						[
							{
								text: 'Totaal eigen vermogen',
								style: { alignment: 'right', padding: [0, 0, 10, 0] }
							},
							{
								text: format(equity.total),
								style: { alignment: 'right' }
							},
							''
						],
						[
							{
								text: 'Privaat eigen vermogen',
								style: { alignment: 'right', padding: [0, 0, 10, 0] }
							},
							{
								text: format(equity.private),
								style: { alignment: 'right' }
							},
							''
						],
						[
							'',
							{
								text: '----------',
								style: { alignment: 'right' }
							},
							'-'
						],
						[
							{
								text: 'Feitelijk eigen vermogen',
								style: { alignment: 'right', padding: [0, 0, 10, 0] }
							},
							{
								text: format(equity.real),
								style: { alignment: 'right' }
							},
							''
						],
						[
							{
								text: 'Normatief eigen vermogen',
								style: { alignment: 'right', padding: [0, 0, 10, 0] }
							},
							{
								text: format(equity.normative),
								style: { alignment: 'right' }
							},
							''
						],
						[
							'',
							{
								text: '----------',
								style: { alignment: 'right' }
							},
							'-'
						],
						[
							{
								text: 'Mogelijk bovenmatig eigen vermogen',
								style: {
									alignment: 'right',
									bold: true,
									padding: [0, 0, 10, 0]
								}
							},
							{
								text: formatCurrency(equity.excess),
								style: { alignment: 'right', bold: true }
							},
							''
						],
						[
							{
								margin: [0, 25, 0, 0],
								text: `Ratio eigen vermogen: ${formatRatio(equity.ratio)}`,
								style: {
									alignment: 'right',
									italics: true
								}
							},
							'',
							''
						],
						[
							{
								margin: [0, 25, 0, 5],
								text: 'N.B. Aan de berekening zijn geen rechten te ontlenen.',
								style: {
									color: '#696969',
									fontSize: 9
								}
							},
							'',
							''
						]
					]
				},
				layout: {
					hLineWidth: () => {
						return 0;
					},
					vLineWidth: () => {
						return 0;
					}
				}
			},

			{
				canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }],
				margin: [0, 0, 0, 20]
			},

			explanation
		],

		defaultStyle: {
			font: 'ROSansWebText',
			fontSize: 10
		},

		styles: {
			h2: {
				fontSize: 23,
				margin: [0, 0, 0, 50],
				bold: true
			},
			h3: {
				fontSize: 12,
				margin: [0, 7]
			},
			definition: {
				fontSize: 11,
				margin: [0, 0, 0, 2],
				bold: true
			},
			explanation: {
				fontSize: 10
			},
			value: {
				fontSize: 10,
				margin: [0, 0, 0, 10]
			}
		}
	};

	pdfMake.createPdf(definitions).download(`${title}-${today}.pdf`);
};

const schoolExplanation = [
	{
		text: 'Totaal eigen vermogen',
		style: 'definition'
	},
	{
		text: 'Het bedrag dat u kunt aflezen van uw balans.',
		style: 'explanation'
	},
	{
		text: [{ text: 'Bedrag: ', bold: true }, 'Het door u ingevulde bedrag bij Eigen vermogen.'],
		style: 'value'
	},
	{
		text: 'Privaat eigen vermogen',
		style: 'definition'
	},
	{
		text: 'De private bestemmingsreserves en -fondsen op uw balans bij elkaar opgeteld.',
		style: 'explanation'
	},
	{
		text: [{ text: 'Bedrag: ', bold: true }, 'Het door u ingevulde bedrag bij Eigen vermogen.'],
		style: 'value'
	},
	{
		text: 'Feitelijk eigen vermogen',
		style: 'definition'
	},
	{
		text: 'Het publieke deel van uw eigen vermogen op uw balans.',
		style: 'explanation'
	},
	{
		text: [{ text: 'Bedrag: ', bold: true }, 'Totaal eigen vermogen -/- privaat vermogen.'],
		style: 'value'
	},
	{
		text: 'Normatief eigen vermogen',
		style: 'definition'
	},
	{
		text: `Het vermogen dat u redelijkerwijs nodig hebt om bezittingen te financieren en risico’s op te vangen).
          De logaritmische interpolatie vindt plaats volgens de volgende formule: 0,05 + (0,1-0,05) / (log(3.000.000) -log(12.000.000)) * (log(a>) - log(12.000.000).
          Daarbij is a het bedrag van uw totaal baten + financiële baten.`,
		style: 'explanation'
	},
	{
		text: [
			{ text: 'Bedrag: ', bold: true },
			`(0,5 * aanschafwaarde gebouwen * bouwkostenindex) + (boekwaarde resterende materiële vaste activa) + (percentage volgens oplopende schaal * alle baten).
          De door u ingevulde bedragen bij Gebouwen, Resterende materiële vaste activa en Risicobuffer zijn hier gebruikt. De bouwkostenindex is 1,27.
          De (logaritmisch) oplopende schaal loopt van 5% (besturen met totale baten ≥ 12 mln) naar 10% (besturen met totale baten = 3 mln). Besturen met lagere totale baten dan 3 mln kunnen een vaste risicobuffer van 300.000 aanhouden.`
		],
		style: 'value'
	},
	{
		text: 'Mogelijk bovenmatig eigen vermogen',
		style: 'definition'
	},
	{
		text: [
			{ text: 'Bedrag: ', bold: true },
			'Feitelijk eigen vermogen -/- normatief vermogen. Bij een negatief bedrag wordt een 0 getoond.'
		],
		style: 'value'
	},
	{
		text: 'Ratio eigen vermogen',
		style: 'definition'
	},
	{
		text: 'Het verhoudingsgetal tussen uw feitelijk en normatief eigen vermogen.',
		style: 'explanation'
	},
	{
		text: [
			{ text: 'Bedrag: ', bold: true },
			'Feitelijk eigen vermogen / normatief eigen vermogen. Een getal boven de 1 duidt op mogelijk bovenmatig eigen vermogen.'
		],
		style: 'value'
	}
];

const partnershipExplanation = [
	{
		text: 'Totaal eigen vermogen',
		style: 'definition'
	},
	{
		text: 'Het bedrag dat u kunt aflezen van uw balans.',
		style: 'explanation'
	},
	{
		text: [{ text: 'Bedrag: ', bold: true }, 'Het door u ingevulde bedrag bij Eigen vermogen.'],
		style: 'value'
	},
	{
		text: 'Privaat eigen vermogen',
		style: 'definition'
	},
	{
		text: 'De private bestemmingsreserves en -fondsen op uw balans bij elkaar opgeteld.',
		style: 'explanation'
	},
	{
		text: [{ text: 'Bedrag: ', bold: true }, 'Het door u ingevulde bedrag bij Eigen vermogen.'],
		style: 'value'
	},
	{
		text: 'Feitelijk eigen vermogen',
		style: 'definition'
	},
	{
		text: 'Het publieke deel van uw eigen vermogen op uw balans.',
		style: 'explanation'
	},
	{
		text: [{ text: 'Bedrag: ', bold: true }, 'Totaal eigen vermogen -/- privaat vermogen.'],
		style: 'value'
	},
	{
		text: 'Normatief eigen vermogen',
		style: 'definition'
	},
	{
		text: 'Het vermogen dat u redelijkerwijs nodig hebt om bezittingen te financieren en risico’s op te vangen.',
		style: 'explanation'
	},
	{
		text: [
			{ text: 'Bedrag: ', bold: true },
			'(0,035 * het door u ingevulde bedrag bij Risicobuffer). Er kan ten minste een risicobuffer van 250.000 worden aanhouden.'
		],
		style: 'value'
	},
	{
		text: 'Mogelijk bovenmatig eigen vermogen',
		style: 'definition'
	},
	{
		text: [
			{ text: 'Bedrag: ', bold: true },
			'Feitelijk eigen vermogen -/- normatief vermogen. Bij een negatief bedrag wordt een 0 getoond.'
		],
		style: 'value'
	},
	{
		text: 'Ratio eigen vermogen',
		style: 'definition'
	},
	{
		text: 'Het verhoudingsgetal tussen uw feitelijk en normatief eigen vermogen.',
		style: 'explanation'
	},
	{
		text: [
			{ text: 'Bedrag: ', bold: true },
			'Feitelijk eigen vermogen / normatief eigen vermogen. Een getal boven de 1 duidt op mogelijk bovenmatig eigen vermogen.'
		],
		style: 'value'
	}
];

const mapStateToProps = (state) => {
	return {
		equity: getEquityValues(state),
		title: 'Berekening',
		explanation: state.balance.organization.type === 'partnership' ? partnershipExplanation : schoolExplanation
	};
};

const mapDispatchToProps = () => {
	return {
		downloadPdf
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadButton);
