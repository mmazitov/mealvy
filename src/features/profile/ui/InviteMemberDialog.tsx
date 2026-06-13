import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	FormInput,
} from '@/shared/components';
import { InviteMemberSchema } from '@/shared/lib/utils/schemas';

type InviteMemberFormData = z.infer<typeof InviteMemberSchema>;

interface InviteMemberDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onInvite: (email: string) => void;
	inviting: boolean;
}

const InviteMemberDialog = ({
	open,
	onOpenChange,
	onInvite,
	inviting,
}: InviteMemberDialogProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<InviteMemberFormData>({
		resolver: zodResolver(InviteMemberSchema),
		mode: 'onChange',
	});

	const onSubmit = (data: InviteMemberFormData) => {
		onInvite(data.email.trim());
		reset();
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Запросити члена сім&apos;ї</DialogTitle>
					<DialogDescription>
						Введіть email адресу людини, яку хочете додати до вашої сім&apos;ї
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-4 py-4">
						<FormInput
							id="invite-email"
							label="Email"
							error={errors.email}
							registration={register('email')}
							inputProps={{
								type: 'email',
								placeholder: 'example@email.com',
								autoFocus: true,
							}}
						/>
						<div className="bg-muted/50 space-y-2 rounded-lg p-4">
							<p className="text-sm font-medium">Член сім&apos;ї зможе:</p>
							<ul className="text-muted-foreground space-y-1 text-sm">
								<li>• Переглядати ваші меню</li>
								<li>• Додавати страви до спільних меню</li>
								<li>• Створювати списки покупок</li>
							</ul>
						</div>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
							disabled={inviting}
						>
							Скасувати
						</Button>
						<Button type="submit" disabled={inviting || !isValid}>
							{inviting ? 'Надсилання...' : 'Надіслати'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default InviteMemberDialog;
