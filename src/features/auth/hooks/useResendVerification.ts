import { toast } from 'sonner';

import { useResendVerificationEmailMutation } from '@/shared/api/graphql/profile.gen';
import { logger } from '@/shared/lib/logger';

export const useResendVerification = () => {
	const [resend, { loading }] = useResendVerificationEmailMutation();

	const resendVerification = async () => {
		try {
			await resend();
			toast.success('Лист для підтвердження надіслано. Перевірте пошту.');
		} catch (error) {
			toast.error('Не вдалося надіслати лист. Спробуйте пізніше.');
			logger.error(error);
		}
	};

	return { resendVerification, loading };
};
