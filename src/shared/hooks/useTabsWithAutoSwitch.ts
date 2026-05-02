import { useState, useEffect } from 'react';

interface Tab {
	title: string;
	value: string;
	disabled: boolean;
}

interface UseTabsWithAutoSwitchProps<T extends Tab> {
	tabs: T[];
	defaultTab: string;
	isLoading: boolean;
}

interface UseTabsWithAutoSwitchResult {
	activeTab: string;
	setActiveTab: (value: string) => void;
	isReady: boolean;
}

export const useTabsWithAutoSwitch = <T extends Tab>({
	tabs,
	defaultTab,
	isLoading,
}: UseTabsWithAutoSwitchProps<T>): UseTabsWithAutoSwitchResult => {
	const [activeTab, _setActiveTab] = useState<string | null>(null);

	const setActiveTab = (value: string) => _setActiveTab(value);

	useEffect(() => {
		if (isLoading) return;

		_setActiveTab((prev) => {
			if (prev !== null) {
				const current = tabs.find((t) => t.value === prev);
				if (current && !current.disabled) return prev;
			}
			const firstAvailable = tabs.find((tab) => !tab.disabled);
			return firstAvailable?.value ?? defaultTab;
		});
	}, [isLoading, tabs, defaultTab]);

	return {
		activeTab: activeTab ?? defaultTab,
		setActiveTab,
		isReady: !isLoading && activeTab !== null,
	};
};
