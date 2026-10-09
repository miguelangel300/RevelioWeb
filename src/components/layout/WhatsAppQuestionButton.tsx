'use client';

import Link from 'next/link';

// Icono SVG de WhatsApp
const WhatsAppIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="shrink-0"
    >
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.38 1.25 4.85L2 22l5.25-1.38c1.47.79 3.1 1.25 4.85 1.25 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.13c-1.52 0-2.97-.42-4.22-1.16l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.29-2.82-1.29-4.38 0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24-.01 4.54-3.71 8.24-8.24 8.24zm4.52-6.13c-.25-.12-1.47-.72-1.7-.8s-.39-.12-.56.12c-.17.25-.64.8-.79.96-.15.17-.3.19-.56.06s-1.06-.39-2.02-1.25c-.75-.67-1.25-1.5-1.4-1.75s-.12-.39.06-.51c.16-.15.35-.39.51-.59s.22-.3.33-.51c.12-.2.06-.38-.03-.51s-.56-1.34-.76-1.84c-.2-.48-.4-.42-.56-.42h-.5c-.17 0-.45.06-.68.3s-.89.86-.89 2.1c0 1.23.92 2.42 1.04 2.59s1.77 2.78 4.36 3.81c.6.25 1.02.41 1.37.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18s.2-.96.15-1.18c-.05-.22-.17-.33-.42-.45z" />
    </svg>
);

interface WhatsAppQuestionButtonProps {
    buttonText?: string;
    title?: string | null;
    phoneNumber?: string;
    customMessage?: string;
}

export default function WhatsAppQuestionButton({
    buttonText = "Escríbenos por WhatsApp",
    title = "¿Tienes alguna duda más?",
    phoneNumber = "34698480039",
    customMessage = "¡Hola! Tengo alguna duda más sobre vuestros servicios de boda.",
}: WhatsAppQuestionButtonProps) {
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(customMessage)}`;

    return (
        <div className="flex flex-col items-start gap-3 pt-4">
            {title ? (
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {title}
                </p>
            ) : null}
            <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/80 text-white/80 px-5 py-3 rounded-sm font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
            >
                <WhatsAppIcon />
                <span>{buttonText}</span>
            </Link>
        </div>
    );
}