import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { PiMoonBold as Moon, PiSunBold as Sun } from 'react-icons/pi';

import { Button } from '@/shared/components';

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button variant="ghost" size="icon" className="h-9 w-9">
				<Sun className="h-4 w-4" />
			</Button>
		);
	}

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className="h-9 w-9"
		>
			{theme === 'dark' ? (
				<Sun className="h-4 w-4 transition-all" />
			) : (
				<Moon className="h-4 w-4 transition-all" />
			)}
			<span className="sr-only">Переключить тему</span>
		</Button>
	);
};

export default ThemeToggle;
