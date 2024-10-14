import { describe, expect, it } from 'vitest';
import { splitResultHelpTexts } from './pdfHelpers';

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
				comment: `Het bedrag dat u kunt aflezen van uw balans.<br>
		 Het door u ingevulde bedrag bij Eigen vermogen.`,
				header: 'Totaal eigen vermogen'
			},
			{
				comment: `De private bestemmingsreserves en -fondsen op uw balans bij elkaar opgeteld.<br />
		 Het door u ingevulde bedrag bij Eigen vermogen.`,
				header: 'Privaat eigen vermogen'
			},
			{
				comment: `Het publieke deel van uw eigen vermogen op uw balans.<br />
		 Totaal eigen vermogen -/- privaat vermogen.`,
				header: 'Feitelijk eigen vermogen'
			}
		]);
	});
});
