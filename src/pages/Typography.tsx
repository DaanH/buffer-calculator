import Image from "../components/Image";
import illustrationUrl from "../assets/images/illustraties-opgemaakt-in-de-rijkshuisstijl.png";

const Typography = () => {
    return (
        <article className="online-colors article">
            <h1 className="article__title">Typografie</h1>
            <div className="article__intro">
                <p>
                    Utere photographica imagine quotiens fieri potest. Illustrationes plerumque rationem functionis
                    habent. Exempli gratia vario argumento exponere. Vel quia de re photographica difficile est capere.
                </p>
            </div>
            <h2 className="article__heading">Illustrationes characteres</h2>
            <ul>
                <li>
                    <h3 className="article__subheading">Validus</h3>
                    Figurarum stylized et numerorum colorum.
                </li>
                <li>
                    <h3 className="article__subheading">Splendida</h3>
                    Communicationis coloribus utere et non nimis accurate.
                </li>
                <li>
                    <h3 className="article__subheading">Credibilis</h3>
                    Characteres vel res in illustratione monstrantur stylized, sed ut humana; maturescere et/vel quam
                    maxime realistica (characteribus viverra non, non cartoonish).
                </li>
            </ul>
            <h2 className="article__heading">Illustrationes identitatis in corporato nationali factae</h2>
            <figure className="article__image">
                <Image src={illustrationUrl} alt="Exempla illustrationes" />
                <figcaption className="caption">Exempla illustrationes</figcaption>
            </figure>
            <h2 className="article__heading">Illustrationes accommodatae ad regimen nationale</h2>
            <p>
                Illustrationes in palatio regiminis sequuntur notas supradictas et in duabus imaginibus infra elaborata
                sunt. Illustratio styles qui intra regimen domus aptae monstrantur intra lineam punctatam et
                illustrationes extra illam non sunt. Difficilis est ad illustrationes strictos limites definire. Mane
                ergo intra lineam punctatam quam maxime.
            </p>
            <p>
                Prima imago ostendit illustrationes in stilo regiminis domus. Secunda imago ostendit diversos stylos
                illustrationis.
            </p>
            <ul>
                <li>Figurarum stylized et numerorum colorum.</li>
                <li>Communicationis coloribus utere et non nimis accurate.</li>
                <li>
                    Characteres vel res in illustratione stylizatae monstrantur, sed ut humana, matura et/vel realitate
                    quam maxime (characteribus viverra non viverra, non viverra).
                </li>
            </ul>
        </article>
    );
};

export default Typography;
