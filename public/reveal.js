const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("show");
				observer.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.15 }
);

const observedElements = new WeakSet();

const observeReveals = (root = document) => {
	const elements = root.querySelectorAll(".reveal");

	elements.forEach((element) => {
		if (observedElements.has(element)) return;

		observedElements.add(element);
		observer.observe(element);
	});
};

observeReveals();

const mutationObserver = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			if (!(node instanceof Element)) return;

			if (node.matches(".reveal")) {
				observeReveals(node.parentElement ?? document);
				return;
			}

			observeReveals(node);
		});
	});
});

mutationObserver.observe(document.body, {
	childList: true,
	subtree: true,
});
