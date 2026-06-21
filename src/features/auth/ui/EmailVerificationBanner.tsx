import { useAuthContext } from '@/features/auth/hooks/useAuthContext';
import { useResendVerification } from '@/features/auth/hooks/useResendVerification';
import { Button } from '@/shared/components/ui/button';

export const EmailVerificationBanner = () => {
	const { user } = useAuthContext();
	const { resendVerification, loading } = useResendVerification();

	if (!user || user.isEmailVerified) return null;

	return (
		<div
			role="status"
			className="border-border bg-muted text-foreground border-b px-4 py-2"
		>
			<div className="mx-auto flex max-w-5xl flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
				<p className="text-sm">
					Підтвердіть свою email-адресу, щоб захистити акаунт і відкрити всі
					можливості.
				</p>
				<Button
					variant="outline"
					size="sm"
					onClick={resendVerification}
					disabled={loading}
				>
					{loading ? 'Надсилання…' : 'Надіслати лист знову'}
				</Button>
			</div>
		</div>
	);
};
