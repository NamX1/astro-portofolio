import type { ImageMetadata } from "astro";

export interface Certificate {
	title: string;
	issuer: string;
	verifyUrl: string;
	/** Self-hosted, from `src/assets/certificates/`. Never a remote URL. */
	image: ImageMetadata;
	/** Descriptive. Required, because these images carry meaning. */
	alt: string;
	/** Omit rather than leaving a gap - undefined fields render nothing. */
	issued?: number;
	/** One line. Omit rather than leaving a gap. */
	summary?: string;
}

/** As authored: the image is referenced by slug and resolved below. */
type CertificateInput = Omit<Certificate, "image"> & { image: string };

const certificateImages = import.meta.glob<{ default: ImageMetadata }>(
	"../assets/certificates/*.{png,jpg,jpeg,webp,avif,svg}",
	{ eager: true },
);

/** Keyed by filename without extension, e.g. "hackerrank-python-basic". */
const imagesBySlug = new Map<string, ImageMetadata>(
	Object.entries(certificateImages).map(([path, mod]) => [
		(path.split("/").pop() ?? path).replace(/\.[^.]+$/, ""),
		mod.default,
	]),
);

/**
 * TODO(content): `issued` and `summary` are intentionally absent on the entry
 * below. Leaving them out means nothing renders in their place - add them when
 * you have real values rather than inventing some.
 */
const input: CertificateInput[] = [
	{
		title: "Python (Basic)",
		issuer: "HackerRank",
		verifyUrl: "https://www.hackerrank.com/certificates/d5f710b194af",
		image: "hackerrank-python-basic",
		// TODO(content): this describes the real certificate once the actual
		// screenshot replaces the placeholder in src/assets/certificates/.
		// Avoid the word "placeholder" - screen readers read this out loud.
		alt: "HackerRank Python (Basic) certificate awarded for passing the Python Basic skills test.",
	},
];

/**
 * Fails the build with an actionable message rather than rendering a broken
 * card. A missing file is a content mistake, not something to ship around.
 */
export const certificates: Certificate[] = input.map(
	({ image: slug, ...rest }) => {
		const image = imagesBySlug.get(slug);

		if (!image) {
			const found = [...imagesBySlug.keys()];
			throw new Error(
				[
					`[content] Missing certificate image "${slug}" for "${rest.title}".`,
					`  Expected: src/assets/certificates/${slug}.{png,jpg,jpeg,webp,avif,svg}`,
					`  Found:    ${found.length > 0 ? found.join(", ") : "(no images in src/assets/certificates)"}`,
				].join("\n"),
			);
		}

		return { ...rest, image };
	},
);