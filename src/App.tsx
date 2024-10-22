import { useNav } from './hooks/useNav';

import Navigation from './components/Navigation';
import Home from './pages/Home';
import ExternalData from './pages/ExternalData';
import Typography from './pages/Typography';
import FontsAndIcons from './pages/FontsAndIcons';

import BufferCalculator from './buffer-calculator/BufferCalculator';

const { DEV } = import.meta.env;

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
			{DEV ? (
				<>
					<Navigation />
					<ActivePage />
				</>
			) : (
				<BufferCalculator />
			)}
		</div>
	);
};
export default App;
