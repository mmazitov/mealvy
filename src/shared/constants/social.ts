import type { IconType } from 'react-icons';
import {
	PiFacebookLogoBold as PiFacebookLogo,
	PiGithubLogoBold as PiGithubLogo,
	PiGoogleLogoBold as PiGoogleLogo,
} from 'react-icons/pi';

export interface SocialItem {
	name: string;
	icon: IconType;
}

export const SOCIAL_ITEMS: SocialItem[] = [
	{
		name: 'google',
		icon: PiGoogleLogo,
	},
	{
		name: 'facebook',
		icon: PiFacebookLogo,
	},
	{
		name: 'github',
		icon: PiGithubLogo,
	},
] as const;
