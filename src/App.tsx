import { useNav } from "./hooks/useNav";

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import ExternalData from "./pages/ExternalData";
import Typography from "./pages/Typography";
import FontsAndIcons from "./pages/FontsAndIcons";

import "./styles/app.scss";
import BufferCalculator from "./buffer-calculator/BufferCalculator";

interface PagesMap {
	[key: string]: () => JSX.Element;
}

const pages: PagesMap = {
	calculator: BufferCalculator,
	home: Home,
	externalData: ExternalData,
	typography: Typography,
	fontsAndIcons: FontsAndIcons
};

const App = () => {
	const { activePage } = useNav();
	const ActivePage = pages[activePage];
	return (
		<div className="web-app">
			<Navigation />
			<ActivePage />
		</div>
	);
};
export default App;
