import type { ImageMetadata } from "astro";
import { siHackerrank } from "simple-icons";

/** A brand mark, resolved from `simple-icons` so the data file owns it. */
export interface IssuerMark {
	path: string;
	hex: string;
}

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
	/** The issuer's mark, shown next to their name. */
	issuerMark?: IssuerMark;
}

/** As authored: the image is referenced by slug and resolved below. */
type CertificateInput = Omit<Certificate, "image" | "issuerMark"> & {
	image: string;
	/** simple-icons slug of the issuer's mark. */
	issuerIcon?: string;
};

/**
 * Issuer marks, keyed by simple-icons slug. Add an entry here when a new
 * issuer appears - the card renders the mark generically.
 */
const issuerMarks: Record<string, IssuerMark> = {
	hackerrank: { path: siHackerrank.path, hex: siHackerrank.hex },
};

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
 *
 * The PDF stores the certificate as a 1600x1200 RGB image plus a separate
 * soft mask, and the mask is what draws the rounded corners. Extracting the
 * colour image on its own flattens those transparent corners to black, which
 * the card's invert filter then turns white - a bright notch in the corner
 * of every card. The file in `src/assets/certificates/` keeps the alpha.
 *
 * The file is also cropped to the certificate's inner panel, inside the
 * ornamental guilloche band. At card size that band is grey mush, and the
 * parts worth reading are the name, the date and the signature.
 */
const input: CertificateInput[] = [
	{
		title: "Python (Basic)",
		issuer: "HackerRank",
		issuerIcon: "hackerrank",
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
	({ image: slug, issuerIcon, ...rest }) => {
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

		const issuerMark = issuerIcon ? issuerMarks[issuerIcon] : undefined;

		if (issuerIcon && !issuerMark) {
			throw new Error(
				[
					`[content] Unknown issuer icon "${issuerIcon}" for "${rest.title}".`,
					`  Known: ${Object.keys(issuerMarks).join(", ") || "(none registered)"}`,
				].join("\n"),
			);
		}

		return { ...rest, image, issuerMark };
	},
);
