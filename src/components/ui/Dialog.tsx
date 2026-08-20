"use client";

import * as DialogPrimitive from "radix-ui/dialog";
import { XIcon } from "@phosphor-icons/react";

import { cn } from "@/utils/cn";

function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
    return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger(
    props: React.ComponentProps<typeof DialogPrimitive.Trigger>,
) {
    return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal(
    props: React.ComponentProps<typeof DialogPrimitive.Portal>,
) {
    return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose(
    props: React.ComponentProps<typeof DialogPrimitive.Close>,
) {
    return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
    return (
        <DialogPrimitive.Overlay
            data-slot="dialog-overlay"
            className={cn(
                "fixed inset-0 z-50 bg-[rgba(16,17,17,0.35)] transition-opacity duration-300",
                "data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
                className,
            )}
            {...props}
        />
    );
}

function DialogContent({
    className,
    children,
    showCloseButton = true,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean;
}) {
    return (
        <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
                data-slot="dialog-content"
                className={cn(
                    "fixed top-1/2 left-1/2 z-50 flex max-h-[85dvh] w-[calc(100%-var(--space-400))] max-w-[34rem] -translate-x-1/2 -translate-y-1/2 flex-col",
                    "rounded-[6px] bg-[var(--cream-100)] shadow-[0_12px_40px_rgba(0,0,0,0.25)]",
                    "transition-all duration-300 data-[state=closed]:scale-[0.97] data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
                    className,
                )}
                {...props}
            >
                {children}

                {showCloseButton && (
                    <DialogPrimitive.Close
                        data-slot="dialog-close"
                        aria-label="Close"
                        className="absolute top-300 right-300 flex h-[34px] w-[34px] items-center justify-center rounded-full text-cabernet transition-colors duration-300 hover:bg-[var(--cream-600)] focus:outline-none md:top-400 md:right-400"
                    >
                        <XIcon size={20} weight="bold" />
                        <span className="sr-only">Close</span>
                    </DialogPrimitive.Close>
                )}
            </DialogPrimitive.Content>
        </DialogPortal>
    );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="dialog-header"
            className={cn(
                "flex flex-none flex-col gap-050 pt-300 pr-[calc(34px+var(--spacing-300))] pb-200 pl-300",
                "md:pt-400 md:pr-[calc(34px+var(--spacing-400))] md:pb-300 md:pl-400",
                className,
            )}
            {...props}
        />
    );
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="dialog-body"
            className={cn(
                "flex min-h-0 flex-1 flex-col gap-300 overflow-y-auto px-300 pb-300",
                "md:px-400 md:pb-400",
                className,
            )}
            {...props}
        />
    );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="dialog-footer"
            className={cn(
                "flex flex-none flex-col-reverse gap-100 px-300 pb-300 sm:flex-row sm:justify-end",
                "md:px-400 md:pb-400",
                className,
            )}
            {...props}
        />
    );
}

function DialogTitle({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
    return (
        <DialogPrimitive.Title
            data-slot="dialog-title"
            className={cn("heading-s text-cabernet", className)}
            {...props}
        />
    );
}

function DialogDescription({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
    return (
        <DialogPrimitive.Description
            data-slot="dialog-description"
            className={cn("font-sans text-s text-[var(--black-700)]", className)}
            {...props}
        />
    );
}

export {
    Dialog,
    DialogBody,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
};
