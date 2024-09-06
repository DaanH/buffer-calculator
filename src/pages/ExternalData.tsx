import OnlineCommunicationColors from "../components/OnlineCommunicationColors";

const ExternalData = () => {
    return (
        <article className="external-data article">
            <h1 className="article__title">Externe data</h1>
            <div className="article__intro">
                <p>
                    Dit is een voorbeeld van een pagina waarop externe data wordt ingeladen. In dit geval gaat het om
                    een CSV-bestand met daarin informatie over de 17 online communicatiekleuren van de{" "}
                    <a href="https://www.rijkshuisstijl.nl/" target="_blank" rel="noreferrer">
                        Rijkshuisstijl
                    </a>
                    .
                </p>
            </div>
            <OnlineCommunicationColors />
        </article>
    );
};

export default ExternalData;
