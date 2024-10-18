import { describe, expect, it } from 'vitest';
import { createFilename, splitResultHelpTexts } from './pdfHelpers';

describe('splitMultipleTexts', () => {
	it('should split a string into headers and comments', () => {
		const input = `<h4>Totaal eigen vermogen</h4>
		<p>Het bedrag dat u kunt aflezen van uw balans.<br>
		<strong>Bedrag:</strong> Het door u ingevulde bedrag bij Eigen vermogen.</p>

		<h4>Privaat eigen vermogen</h4>
		<p>De private bestemmingsreserves en -fondsen op uw balans bij elkaar opgeteld.<br />
		<strong>Bedrag:</strong> Het door u ingevulde bedrag bij Eigen vermogen.</p>

		<h4>Feitelijk eigen vermogen</h4>
		<p>Het publieke deel van uw eigen vermogen op uw balans.<br />
		<strong>Bedrag:</strong> Totaal eigen vermogen -/- privaat vermogen.</p>

	   `;

		expect(splitResultHelpTexts(input)).toEqual([
			{
				amount: 'Het door u ingevulde bedrag bij Eigen vermogen.',
				comment: 'Het bedrag dat u kunt aflezen van uw balans.',
				header: 'Totaal eigen vermogen'
			},
			{
				amount: 'Het door u ingevulde bedrag bij Eigen vermogen.',
				comment: 'De private bestemmingsreserves en -fondsen op uw balans bij elkaar opgeteld.',
				header: 'Privaat eigen vermogen'
			},
			{
				amount: 'Totaal eigen vermogen -/- privaat vermogen.',
				comment: 'Het publieke deel van uw eigen vermogen op uw balans.',
				header: 'Feitelijk eigen vermogen'
			}
		]);
	});
});

describe('createFilename', () => {
	it('should create a filename based on the title and given date', () => {
		const title = 'Title';
		const date = new Date('2021-10-23');
		expect(createFilename(title, date)).toBe('Title_23_10_2021.pdf');
	});
});
