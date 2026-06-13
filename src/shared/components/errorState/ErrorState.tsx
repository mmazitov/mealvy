import { cn } from '@/shared/lib/utils';

interface ErrorStateProps {
	message?: string;
	className?: string;
}

const DEFAULT_MESSAGE = 'Сталася помилка. Спробуйте оновити сторінку.';

const ErrorState = ({
	message = DEFAULT_MESSAGE,
	className,
}: ErrorStateProps) => (
	<div className={cn('container mx-auto px-4 py-8', className)}>
		<div
			role="alert"
			className="bg-destructive/10 text-destructive rounded-lg p-4"
		>
			{message}
		</div>
	</div>
);

export default ErrorState;
