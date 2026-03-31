"use client";

import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";
import type { Product } from "@/lib/products";

const CART_STORAGE_KEY = "ayurra-cart";

export type CartItem = Product & {
	quantity: number;
};

type CartContextValue = {
	items: CartItem[];
	itemCount: number;
	subtotal: number;
	addItem: (product: Product, quantity?: number) => void;
	updateQuantity: (slug: string, quantity: number) => void;
	removeItem: (slug: string) => void;
	clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);
	const [hasHydrated, setHasHydrated] = useState(false);

	useEffect(() => {
		try {
			const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
			if (storedCart) {
				setItems(JSON.parse(storedCart));
			}
		} catch {
			window.localStorage.removeItem(CART_STORAGE_KEY);
		} finally {
			setHasHydrated(true);
		}
	}, []);

	useEffect(() => {
		if (!hasHydrated) return;
		window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
	}, [hasHydrated, items]);

	const value = useMemo<CartContextValue>(() => {
		const addItem = (product: Product, quantity = 1) => {
			setItems((currentItems) => {
				const existingItem = currentItems.find(
					(item) => item.slug === product.slug,
				);

				if (existingItem) {
					return currentItems.map((item) =>
						item.slug === product.slug
							? { ...item, quantity: item.quantity + quantity }
							: item,
					);
				}

				return [...currentItems, { ...product, quantity }];
			});
		};

		const updateQuantity = (slug: string, quantity: number) => {
			setItems((currentItems) =>
				currentItems.map((item) =>
					item.slug === slug
						? { ...item, quantity: Math.max(1, quantity) }
						: item,
				),
			);
		};

		const removeItem = (slug: string) => {
			setItems((currentItems) =>
				currentItems.filter((item) => item.slug !== slug),
			);
		};

		const clearCart = () => setItems([]);

		return {
			items,
			itemCount: items.reduce((total, item) => total + item.quantity, 0),
			subtotal: items.reduce(
				(total, item) => total + item.price * item.quantity,
				0,
			),
			addItem,
			updateQuantity,
			removeItem,
			clearCart,
		};
	}, [items]);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}

	return context;
}
