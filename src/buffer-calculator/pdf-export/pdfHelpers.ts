import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { IResults } from '../calculations';
import vfs from './vfs_fonts';

export type HelpText = {
	header: string;
	comment: string;
	amount: string;
};
export const splitResultHelpTexts = (input: string): HelpText[] => {
	const regex = /<h4>(.*?)<\/h4>\s*<p>([\s\S]*?)((<br\s\/>)|(<strong>))([\s\S]*?)<\/strong>([\s\S]*?)<\/p>/gi;
	const allTagsRE = /(<([^>]+)>)/gi;
	const results = [];
	let match;

	while ((match = regex.exec(input)) !== null) {
		const header = match[1].replace(allTagsRE, '').trim();
		const comment = match[2].replace(allTagsRE, '').trim();
		const amount = match[7].replace(allTagsRE, '').trim();

		results.push({ header, comment, amount });
	}

	return results;
};

interface Params {
	title: string;
	results: IResults;
	conclusion: string;
	helpTexts: HelpText[];
}

export const generatePdf = async (t: (key: string) => string, { title, results, conclusion, helpTexts }: Params) => {
	const { default: pdfMake } = await import('pdfmake/build/pdfmake');
	pdfMake.vfs = vfs;
	// Assign the virtual file system to pdfMake
	const fonts = {
		ROSansWebText: {
			normal: 'RO-SansWebText-Regular.ttf',
			bold: 'RO-SansWebText-Bold.ttf',
			italics: 'RO-SansWebText-Italic.ttf',
			bolditalics: 'RO-SansWebText-Italic.ttf'
		}
	};

	const labelStyle = { alignment: 'right', padding: [0, 0, 10, 0] };
	const numberStyle = { alignment: 'right' };
	const tableBody = [
		[{ text: t('result.total'), style: labelStyle }, { text: results.total, style: numberStyle }, ''],
		[{ text: t('result.private'), style: labelStyle }, { text: results.private, style: numberStyle }, ''],
		['', { text: '----------', style: numberStyle }, '-'],
		[{ text: t('result.real'), style: labelStyle }, { text: results.real, style: numberStyle }, ''],
		[{ text: t('result.normative'), style: labelStyle }, { text: results.normative, style: numberStyle }, ''],
		['', { text: '----------', style: numberStyle }, '-'],
		[
			{ text: t('result.excess'), style: { ...labelStyle, bold: true } },
			{ text: results.excess, style: { ...numberStyle, bold: true } },
			''
		],
		[
			{
				margin: [0, 25, 0, 0],
				text: `${t('result.ratio')} ${results.ratio}`,
				style: { ...numberStyle, italics: true }
			},
			'',
			''
		],
		[
			{
				margin: [0, 25, 0, 5],
				text: t('result.disclaimer'),
				style: { color: '#696969', fontSize: 9 }
			},
			'',
			''
		]
	];

	const documentDefinition: TDocumentDefinitions = {
		content: [
			{
				text: title,
				style: 'h2'
			},

			{
				table: {
					widths: [300, 70, 10],
					body: tableBody
				},
				layout: {
					hLineWidth: () => 0,
					vLineWidth: () => 0
				}
			},
			{
				text: conclusion,
				style: 'conclusion'
			},
			...helpTexts.map(({ header, comment, amount }) => [
				{ text: header, style: 'definition' },
				{ text: comment, style: 'explanation' },
				{ text: [{ text: 'Bedrag: ', bold: true }, { text: amount }], style: 'value' }
			]),

			{
				canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }],
				margin: [0, 0, 0, 20]
			}
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
			},
			conclusion: {
				margin: [0, 0, 0, 10]
			}
		}
	};

	const today = new Date();
	const filename = createFilename(title, today);

	pdfMake.createPdf(documentDefinition, undefined, fonts).download(filename);
};

export const createFilename = (title: string, today: Date) => {
	const isoDate = today.toISOString();
	const year = isoDate.slice(0, 4);
	const month = isoDate.slice(5, 7);
	const day = isoDate.slice(8, 10);
	const filename = `${title}_${day}_${month}_${year}.pdf`;
	return filename;
};
