import {
	cloneElement,
	isValidElement,
	type CSSProperties,
	type ReactElement,
	type ReactNode,
} from "react";

type RevealDirection =
	| "up"
	| "down"
	| "left"
	| "right"
	| "zoom-in"
	| "zoom-out"
	| "fade"
	| "rotate-left"
	| "rotate-right"
	| "rise";

type RevealWrapperProps = {
	asChild?: boolean;
	children: ReactNode;
	className?: string;
	delay?: number;
	direction?: RevealDirection;
};

export default function RevealWrapper({
	asChild = false,
	children,
	className = "",
	delay = 0,
	direction = "up",
}: RevealWrapperProps) {
	const classes = ["reveal", `reveal-${direction}`, className]
		.filter(Boolean)
		.join(" ");
	const style = {
		"--reveal-delay": `${delay}ms`,
	} as CSSProperties;

	if (asChild && isValidElement(children)) {
		const child = children as ReactElement<{
			className?: string;
			style?: CSSProperties;
		}>;

		return cloneElement(child, {
			className: [classes, child.props.className].filter(Boolean).join(" "),
			style: {
				...style,
				...child.props.style,
			},
		});
	}

	return (
		<div className={classes} style={style}>
			{children}
		</div>
	);
}
