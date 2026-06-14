import { useAuthContext } from '@/features/auth';
import { Button } from '@/shared/components';
import { SOCIAL_ITEMS } from '@/shared/constants';
import { useSocialLogin } from '@/shared/hooks';

interface SocialListProps {
	onOpenChange: (open: boolean) => void;
}

const SocialList = ({ onOpenChange }: SocialListProps) => {
	const { login } = useAuthContext();
	const { loginWithProvider } = useSocialLogin({
		login,
		onSuccess: () => onOpenChange(false),
	});

	return (
		<ul className="grid grid-cols-1 gap-3">
			{SOCIAL_ITEMS.map((item) => (
				<li key={item.name}>
					<Button
						aria-label={`Увійти через ${item.name}`}
						variant="outline"
						className="w-full cursor-pointer"
						onClick={() => loginWithProvider(item.name)}
					>
						<item.icon className="h-5 w-5" aria-hidden="true" />
					</Button>
				</li>
			))}
		</ul>
	);
};

export default SocialList;
