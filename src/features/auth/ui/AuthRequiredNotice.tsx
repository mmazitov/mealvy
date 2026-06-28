import { PiLockKeyBold as Lock } from 'react-icons/pi';

import { Button, Modal } from '@/shared/components';
import { MODAL_TYPES } from '@/shared/constants';
import { useModal } from '@/shared/hooks';

export const AuthRequiredNotice = () => {
	const { isOpen, open, setIsOpen } = useModal();

	return (
		<div className="container mx-auto px-4 py-8">
			<div
				role="status"
				className="border-border bg-muted text-foreground flex flex-col items-start gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
			>
				<div className="flex items-center gap-3">
					<Lock
						className="text-muted-foreground h-5 w-5 shrink-0"
						aria-hidden="true"
					/>
					<p className="text-sm">
						Ця сторінка доступна лише авторизованим користувачам. Увійдіть або
						зареєструйтесь, щоб продовжити.
					</p>
				</div>
				<Button size="sm" className="shrink-0" onClick={open}>
					Увійти
				</Button>
			</div>

			<Modal
				modalType={MODAL_TYPES.AUTH_MODAL}
				open={isOpen}
				onOpenChange={setIsOpen}
			/>
		</div>
	);
};
