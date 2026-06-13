import type { IconType } from 'react-icons';
import { PiGoogleLogoBold as PiGoogleLogo } from 'react-icons/pi';

export interface SocialItem {
	name: string;
	icon: IconType;
}

export const SOCIAL_ITEMS: SocialItem[] = [
	{
		name: 'google',
		icon: PiGoogleLogo,
	},
] as const;
