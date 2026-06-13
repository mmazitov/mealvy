import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	PiLockBold as Lock,
	PiEnvelopeSimpleBold as Mail,
	PiUserBold as User,
} from 'react-icons/pi';
import { z } from 'zod';

import { useAuthForm } from '../hooks/useAuthForm';

import { Button, FormInput } from '@/shared/components';
import { modalsConfig } from '@/shared/lib/config';
import { LoginSchema, RegisterSchema } from '@/shared/lib/utils/schemas/';

interface AuthFormProps {
	onOpenChange: (open: boolean) => void;
	isLogin: boolean;
}

type LoginFormData = z.infer<typeof LoginSchema>;
type RegisterFormData = z.infer<typeof RegisterSchema>;
type AuthFormData = LoginFormData | RegisterFormData;

const iconClass = 'text-muted-foreground absolute top-3 left-3 z-10 h-4 w-4';

const AuthForm = ({ onOpenChange, isLogin }: AuthFormProps) => {
	const { handleLogin, handleRegister, isLoading } = useAuthForm();

	const schema = isLogin ? LoginSchema : RegisterSchema;

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<AuthFormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit = async (data: AuthFormData) => {
		const success = isLogin
			? await handleLogin(data as LoginFormData)
			: await handleRegister(data as RegisterFormData);

		if (success) {
			onOpenChange(false);
		}
	};

	const handleFormSubmit = handleSubmit(onSubmit);

	return (
		<form onSubmit={handleFormSubmit} className="space-y-4">
			{!isLogin && (
				<FormInput
					id="name"
					label="Ім'я"
					error={'name' in errors ? errors.name : undefined}
					registration={register('name')}
					icon={<User className={iconClass} aria-hidden="true" />}
					inputProps={{
						type: 'text',
						placeholder: "Введіть ваше ім'я",
						autoComplete: 'username',
					}}
				/>
			)}

			<FormInput
				id="email"
				label="Електронна пошта"
				error={errors.email}
				registration={register('email')}
				icon={<Mail className={iconClass} aria-hidden="true" />}
				inputProps={{
					type: 'email',
					placeholder: 'example@mail.com',
					autoComplete: 'email',
				}}
			/>

			<FormInput
				id="password"
				label="Пароль"
				error={errors.password}
				registration={register('password')}
				icon={<Lock className={iconClass} aria-hidden="true" />}
				showToggle
				inputProps={{
					type: 'password',
					placeholder: '••••••••',
					autoComplete: 'current-password',
				}}
			/>

			<Button
				type="submit"
				className="w-full cursor-pointer"
				disabled={isSubmitting || isLoading}
			>
				{isSubmitting || isLoading
					? 'Завантаження...'
					: isLogin
						? modalsConfig.AUTH_MODAL.LOGIN.btnText
						: modalsConfig.AUTH_MODAL.REGISTER.btnText}
			</Button>
		</form>
	);
};

export default AuthForm;
