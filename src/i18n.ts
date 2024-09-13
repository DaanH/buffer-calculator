// the translations
// (tip move them in a JSON file and import them)
const translation: Record<string, string> = {
	// tabs
	"steps.all.change": "Aanpassen",
	"steps.organization.name": "Onderwijsinstelling",
	"steps.capital.name": "Eigen vermogen",
	"steps.buildings.name": "Gebouwen",
	"steps.assets.name": "Resterende MVA",
	"steps.risk_buffer.name": "Risicobuffer",

	// step content
	"select-form.submit": "Ga verder",
	"select-form.school": "School",
	"select-form.partnership": "Samenwerkingsverband",
	"select-form.question":
		"Voor welk type onderwijsinstelling wilt u op bestuursniveau uw bovenmatig eigen vermogen uitrekenen?",

	"steps.buttons.previous-step": "Terug",
	"steps.buttons.next-step": "Ga verder",
	"steps.buttons.to-result": "Bekijk de berekening",

	"steps.capital.title": "Eigen vermogen",
	"steps.capital.more-help": "Toon extra informatie over eigen vermogen",
	"steps.capital.less-help": "Toon minder",
	"steps.capital.help": `<p>Het <em>totaal aan eigen vermogen</em> kunt u aflezen van uw balans (onderdeel van uw jaarrekening). Het totale eigen vermogen kan naast een <em>publiek</em> deel (zoals de algemene reserve, de publieke bestemmingsreserve en het publieke bestemmingsfonds) ook bestaan uit een <em>privaat</em> deel (de private bestemmingsreserve en het private bestemmingsfonds). Dit onderscheid vindt u terug in de toelichting op de balans (een nadere uitsplitsing van de balansposten).</p>
        <p>U vult eerst het totaal aan eigen vermogen in en daarna het private deel van het totale eigen vermogen.</p>
        <p>In de berekening van mogelijk bovenmatig eigen vermogen wordt uiteindelijk alleen rekening gehouden met het publieke deel.</p>`,
	"steps.capital.labels.total": "Wat is het totaal aan eigen vermogen?",
	"steps.capital.labels.private": "Hoeveel daarvan bedraagt het private deel?",

	"steps.buildings.title": "Gebouwen",
	"steps.buildings.more-help": "Toon extra informatie over gebouwen",
	"steps.buildings.less-help": "Toon minder",
	"steps.buildings.help": `<p>De <em>aanschafwaarde</em> van uw gebouwen, ook wel genoemd de historische kostprijs, vindt u terug in de toelichting op de balans. In de toelichting is onder materiële vaste activa een verloopoverzicht van al uw materiële vaste activa opgenomen. 
        <p>Neem de aanschafwaarde aan het einde van de periode over in de rekenhulp.</p>
        <p><strong>Let op</strong> dat u het niet verwart met de <em>boekwaarde</em> van de gebouwen (die in een latere vraag aan de orde komt).</p>`,
	"steps.buildings.labels.total": "Wat is de aanschafwaarde van uw gebouwen?",

	"steps.assets.title": "Resterende materiële vaste activa",
	"steps.assets.more-help": "Toon extra informatie over resterende MVA",
	"steps.assets.less-help": "Toon minder",
	"steps.assets.help": `<p>De <em>boekwaarde</em> van uw materiële vaste activa (MVA) vindt u terug in de toelichting op de balans. Voorbeelden hiervan zijn gebouwen, machines, installaties en computers. In de toelichting is onder materiële vaste activa een verloopoverzicht van al uw materiële vaste activa opgenomen. Neem de boekwaarde aan het einde van de periode over in de rekenhulp.</p>
        <p>U vult eerst de boekwaarde in van het totaal aan materiële vaste activa en daarna de boekwaarde van de gebouwen. </p>
        <p><strong>Let op</strong> dat u het niet verwart met de <em>aanschafwaarde</em> van de gebouwen (die u in een eerdere vraag invulde).</p>`,
	"steps.assets.labels.total": "Wat is de boekwaarde van uw totale materiële vaste activa?",
	"steps.assets.labels.current-building-value": "Wat is de boekwaarde van uw gebouwen?",

	"steps.risk-buffer.title": "Risicobuffer",
	"steps.risk-buffer.more-help": "Toon extra informatie over risicobuffer",
	"steps.risk-buffer.less-help": "Toon minder",
	"steps.risk-buffer.help":
		"<p>Het <em>totaal aan baten</em> kunt u aflezen van verschillende posten in uw staat van baten en lasten (onderdeel van uw jaarrekening). Tel bij totaal baten (de rijksbijdragen, overige overheidsbijdragen, collegegelden, in opdracht van derden, overige baten) de financiële baten op. Neem het totaal van deze baten over in de rekenhulp.</p>",
	"steps.risk-buffer.labels.total": "Hoeveel bedraagt het totaal aan baten?",

	// Results
	"result.title": "Berekening",
	"result.more-help": "Hoe komt deze berekening tot stand?",
	"result.less-help": "Sluiten",
	"result.help.partnership": `
         <h4>Totaal eigen vermogen</h4>
         <p>Het bedrag dat u kunt aflezen van uw balans.<br>
         <strong>Bedrag:</strong> Het door u ingevulde bedrag bij Eigen vermogen.</p>

         <h4>Privaat eigen vermogen</h4>
         <p>De private bestemmingsreserves en -fondsen op uw balans bij elkaar opgeteld.<br />
         <strong>Bedrag:</strong> Het door u ingevulde bedrag bij Eigen vermogen.</p>

         <h4>Feitelijk eigen vermogen</h4>
         <p>Het publieke deel van uw eigen vermogen op uw balans.<br />
         <strong>Bedrag:</strong> Totaal eigen vermogen -/- privaat vermogen.</p>

         <h4>Normatief eigen vermogen</h4>
         <p>het vermogen dat u redelijkerwijs nodig hebt om bezittingen te financieren en risico’s op te vangen.<br />
         <strong>Bedrag:</strong> (0,035 * het door u ingevulde bedrag bij Risicobuffer). Er kan ten minste een risicobuffer van 250.000 worden aanhouden.</p>

         <h4>Mogelijk bovenmatig eigen vermogen</h4>
         <p><strong>Bedrag:</strong> Feitelijk eigen vermogen -/- normatief vermogen. Bij een negatief bedrag wordt een 0 getoond.</p>

         <h4>Ratio eigen vermogen</h4>
         <p>Het verhoudingsgetal tussen uw feitelijk en normatief eigen vermogen.<br />
         <strong>Bedrag:</strong> Feitelijk eigen vermogen / normatief eigen vermogen. Een getal boven de 1 duidt op mogelijk bovenmatig eigen vermogen.</p>
        `,
	"result.help.singleSchool": `
        <h4>Totaal eigen vermogen</h4>
        <p>Het bedrag dat u kunt aflezen van uw balans.<br />
        <strong>Bedrag:</strong> Het door u ingevulde bedrag bij Eigen vermogen.</p>

        <h4>Privaat eigen vermogen</h4>
        <p>De private bestemmingsreserves en -fondsen op uw balans bij elkaar opgeteld.<br />
        <strong>Bedrag:</strong> Het door u ingevulde bedrag bij Eigen vermogen.</p>

        <h4>Feitelijk eigen vermogen</h4>
        <p>Het publieke deel van uw eigen vermogen op uw balans.<br />
        <strong>Bedrag:</strong> Totaal eigen vermogen -/- privaat vermogen.</p>

        <h4>Normatief eigen vermogen</h4>
        <p>Het vermogen dat u redelijkerwijs nodig hebt om bezittingen te financieren en risico’s op te vangen).<br />
        De logaritmische interpolatie vindt plaats volgens de volgende formule: 0,05 + (0,1-0,05) / (log(3.000.000) -log(12.000.000)) * (log(<em>a</em>) - log(12.000.000).
        Daarbij is <em>a</em> het bedrag van uw totaal baten + financiële baten.<br />
        <strong>Bedrag:</strong> (0,5 * aanschafwaarde gebouwen * bouwkostenindex) + (boekwaarde resterende materiële vaste activa) + (percentage volgens oplopende schaal * alle baten).
        De door u ingevulde bedragen bij Gebouwen, Resterende materiële vaste activa en Risicobuffer zijn hier gebruikt. De bouwkostenindex is 1,27.
        De (logaritmisch) oplopende schaal loopt van 5% (besturen met totale baten ≥ 12 mln) naar 10% (besturen met totale baten = 3 mln). Besturen met lagere totale baten dan 3 mln kunnen een vaste risicobuffer van 300.000 aanhouden.</p>

        <h4>Mogelijk bovenmatig eigen vermogen</h4>
        <p><strong>Bedrag:</strong> Feitelijk eigen vermogen -/- normatief vermogen. Bij een negatief bedrag wordt een 0 getoond.</p>

        <h4>Ratio eigen vermogen</h4>
        <p>Het verhoudingsgetal tussen uw feitelijk en normatief eigen vermogen.<br />
        <strong>Bedrag:</strong> Feitelijk eigen vermogen / normatief eigen vermogen. Een getal boven de 1 duidt op mogelijk bovenmatig eigen vermogen.</p>
        `,
	"result.note.excess":
		"Uw feitelijk eigen vermogen ligt boven uw normatief eigen vermogen. Kijk samen met de andere interne belanghebbenden in uw onderwijsinstelling kritisch naar uw reserves en onderneem waar nodig actie.",
	"result.note.no-excess":
		"Uit de door u ingevulde gegevens blijkt niet dat er sprake is van mogelijk bovenmatig eigen vermogen.",
	"result.download-title": "Download deze berekening als PDF",
	"result.download-text": "Deze gegevens worden verder niet door ons opgeslagen.",
	"result.restart": "Terug naar beginscherm",
	"result.total": "Totaal eigen vermogen",
	"result.private": "Privaat eigen vermogen",
	"result.real": "Feitelijk eigen vermogen",
	"result.normative": "Normatief eigen vermogen",
	"result.excess": "Mogelijk bovenmatig eigen vermogen",
	"result.ratio": "Ratio eigen vermogen:",
	"result.disclaimer": "N.B. Aan de berekening zijn geen rechten te ontlenen."
};

export const useTranslation = () => ({
	t: (key: string) => {
		return translation[key];
	}
});
