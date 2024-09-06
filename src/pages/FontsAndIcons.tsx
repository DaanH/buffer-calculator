import IconsOverview from "../components/IconsOverview";

const FontsAndIcons = () => {
    return (
        <article className="fonts-and-icons article">
            <h1 className="article__title">Fonts & iconen</h1>
            <div className="article__intro">
                <p>
                    Het is uitdrukkelijk de bedoeling dat de styling van een web app compleet onafhankelijk is van de
                    omringende site. De werking van webfonts in combinatie met de Shadom DOM dwingt ons helaas tot een
                    uitzondering hierop:
                </p>
            </div>
            <h2 className="article__heading">Fonts</h2>
            <p>
                Omdat webfonts niet direct in de Shadow DOM ge-embed kunnen worden is het alleen mogelijk om gebruik te
                maken van webfonts die al voor de omringende site zijn ingeladen. In dit project zijn de vier fonts die
                op de verschillende PRO-sites gebruikt worden meegeleverd maar worden slechts ingezet voor
                preview-doeleinden. In de output van dit project worden de fonts daarom ook niet meegenomen.
            </p>
            <h2 className="article__heading">Iconen</h2>
            <p>
                Een ander gevolg van het niet kunnen embedden van webfonts is dat een update van het Rijkshuisstijl
                iconenfont zou kunnen leiden tot ontbrekende iconen in web apps. Om die reden is het niet toegestaan om
                gebruik te maken van het iconenfont. In plaats daarvan hebben we de meest voorkomende iconen als SVG en
                Sass Data URI&apos;s toegevoegd:
            </p>
            <IconsOverview />
        </article>
    );
};

export default FontsAndIcons;
