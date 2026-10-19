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
 * The certificate image is the screenshot embedded in the HackerRank PDF,
 * extracted losslessly rather than re-rendered from the page.
 */
const input: CertificateInput[] = [
	{
		title: "Python (Basic)",
		issuer: "HackerRank",
		issued: 2024,
		verifyUrl: "https://www.hackerrank.com/certificates/d5f710b194af",
		image: "hackerrank-python-basic",
		alt: "HackerRank Certificate of Accomplishment for Python (Basic), issued to Kevin Charlie on 15 July 2024.",
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