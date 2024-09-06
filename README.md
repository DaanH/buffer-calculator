# Web App Startpunt

-   **Versie**: 1.0.0
-   **Meest recente update**: 15-2-2024

Welkom bij het _Web App Startpunt_, een major update van wat voorheen de _DPC Interactieve Infographic Sandbox_ heette.
De sandbox-insteek is losgelaten en vervangen door een 'starter project' met daarin verschillende (stijl)elementen en features die het de maker gemakkelijker zou moeten maken om een web app te bouwen die naadloos aansluit op de site waarop die uiteindelijk geplaatst wordt.

## Migratie

Om te kunnen starten met een Web App voor het Platform Rijksoverheid Online (PRO), maak je gebruik van het Web App Startpunt.
Wil je voor [migratie](https://www.platformrijksoverheidonline.nl/actueel/weblog/weblogberichten/2023/platform-rijksoverheid-online-pro-gaat-verhuizen) een Web App op jouw website, dan ben je verplicht deze te ontwikkelen door middel van dit Startpunt.
Web Apps na migratie kunnen het startpunt gebruiken om te ontwikkelen, maar dit is niet verplicht. Wel dien je je te houden aan het gebruik van moderne webtechnologieën die statisch gehost kunnen worden. In deze README en repo staan aanvullende technische uitleg en hulpprogramma's.

\*Het Startpunt is momenteel te vinden onder: https://www.platformrijksoverheidonline.nl/producten-en-expertise/documenten/instructies/2023/09/20/startpunt-web-apps

## Vereisten

De meeste elementen van dit startpunt zijn slechts suggesties maar een aantal dingen zijn vereist voor het bouwen en correct aanleveren van een **web app** voor het PRO-platform:

-   De web app moet gebouwd zijn in [React](https://reactjs.org/).
-   De web app moet werken in / gebruikmaken van de [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM).
-   De web app moet [toegankelijk](https://www.digitoegankelijk.nl/uitleg-van-eisen) zijn.
-   De web app mag geen gebruikmaken van het Rijksoverheid iconenfont.
-   Er mogen geen wijzigingen gedaan worden aan:
    -   gitlab-ci.yml
    -   scripts/reset-package-json.ts
-   Afhankelijkheden hebben geen bekende kwetsbaarheden. Dit controleer je met het commando `pnpm audit`. De verantwoordelijkheid van het bijhouden van afhankelijkheden en het voorkomen van kwetsbaarheden daarin, voor en na de plaatsing, ligt en blijft bij de indiener van de WebApp. Het staat DPC vrij om bij kwetsbaarheden de WebApp offline te halen.

## Tools

Om de kans op issues later in het proces te verkleinen is het aan te raden om met dezelfde tools te werken die wij gebruiken bij het controleren van de aangeleverde web app:

### Visual Studio Code + extensies

-   [VS Code](https://code.visualstudio.com/) code editor
-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensie
-   [webhint](https://marketplace.visualstudio.com/items?itemName=webhint.vscode-webhint) extensie
-   [axe Accessibility Linter](https://marketplace.visualstudio.com/items?itemName=deque-systems.vscode-axe-linter) extensie
-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensie

### editorconfig

Voor editors waarvoor geen Prettier extensie beschikbaar is ook een [EditorConfig](https://editorconfig.org)-bestand toegevoegd met daarin regels die gelijk zijn aan de Prettier-instellingen (in `.prettierrc.yaml`).

## Werking

### Web App ID

In dit project zit een variabele (`VITE_WEB_APP_ID`) in het `.env` bestand. Dit id wordt gebruikt voor 2 dingen:

-   Hiermee identificeren we de webapp om versies te beheren.
-   Dit zorgt ervoor dat de web app in de juiste container geladen wordt. Dit gebeurt op drie plekken; (`index.html`, `src/Main.tsx` en `postcss.config.js`).

### Fonts

Omdat webfonts niet direct in de Shadow DOM ge-embed kunnen worden is het alleen mogelijk om gebruik te maken van webfonts die al voor de omringende site zijn ingeladen. In dit project zijn de vier fonts die op de verschillende PRO-sites gebruikt worden meegeleverd maar worden slechts ingezet voor preview-doeleinden. In de output van dit project worden de fonts daarom ook niet meegenomen.

## Assets
Assest kunnen worden toegevoegd maar daar zit een klein haakje aan. De bestands locatie bij het hosten is op pro1 anders als op ProNext. Om het op beide platformen te laten werken is het (voor nu nog) nodig om ze door CreateAssetsPath.tsx te halen. 

## Toegankelijkheid

Houdt met het ontwikkelen van de web app al rekening met het feit dat de web app toegankelijk moet zijn volgens de specificaties van de [WCAG](https://www.w3.org/TR/WCAG21/). Enkele aandachtspunten zijn:

-   **Kleur contrast**: Er zijn eisen voor het contrast van tekst op een kleurvlak. Dit is onder andere te controleren met de [WebAim contrastchecker](https://webaim.org/resources/contrastchecker/).
-   **Leesbare tekst**: Houdt rekening met bezoekers die vertrouwen op screenreaders. Dit houdt in dat teksten in afbeeldingen niet toegankelijk zijn. Het toevoegen van een ALT tekst is niet altijd voldoende.
-   **Bediening**: Veel bezoekers en assistive hulpmiddelen vertrouwen op navigatie met een toetsenbord. Zorg ervoor dat alle klikbare elementen ook te bedienen zijn met een toetsenbord. Dit houdt in dat je geen niet-klikbare elementen moet gebruiken en deze vervolgens met JavaScript wel klikbaar te maken.
-   **Dynamische content**: Zodra inhoud van de web app dynamisch wisselt (popup, sliders etc.) is dit niet voor alle gebruikers waarneembaar. Je zult met JavaScript en [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)-tags moeten zorgen dat ook gebruikers met bijvoorbeeld screenreaders of braillelezers op de hoogte gebracht worden van de nieuwe informatie op de pagina.
-   Zorg ook voor een **leesbaar alternatief** voor iconen en buttons met pijlen of kruisjes.
-   Meer informatie is te vinden op [digitoegankelijk.nl](https://www.digitoegankelijk.nl) en [w3.org](https://www.w3.org/TR/WCAG21/)
