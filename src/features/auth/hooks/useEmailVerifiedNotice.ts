import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

// Reads the ?emailVerified=success|invalid param set by the backend verify-email
// redirect, shows a toast, and strips the param so a refresh doesn't re-fire it.
export const useEmailVerifiedNotice = () => {
	const [params, setParams] = useSearchParams();

	useEffect(() => {
		const status = params.get('emailVerified');
		if (!status) return;

		if (status === 'success') {
			toast.success('Email підтверджено!');
		} else {
			toast.error('Посилання недійсне або застаріле. Спробуйте ще раз.');
		}

		const next = new URLSearchParams(params);
		next.delete('emailVerified');
		setParams(next, { replace: true });
	}, [params, setParams]);
};
