import { useState } from 'react';

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

	// Derive the resolved tab during render: keep the current selection while it
	// stays valid, otherwise fall back to the first enabled tab (or the default).
	let resolvedTab = activeTab;
	if (!isLoading) {
		const current =
			activeTab !== null ? tabs.find((t) => t.value === activeTab) : undefined;
		if (!current || current.disabled) {
			const firstAvailable = tabs.find((tab) => !tab.disabled);
			resolvedTab = firstAvailable?.value ?? defaultTab;
		}
	}

	return {
		activeTab: resolvedTab ?? defaultTab,
		setActiveTab,
		isReady: !isLoading && resolvedTab !== null,
	};
};
