export interface Certificate {
	title: string;
	issuer: string;
	verifyUrl: string;
	/** TODO(content): add once confirmed. */
	year?: number;
	/**
	 * Path to a self-hosted image under /public/certificates.
	 * Never hotlink a remote certificate image.
	 */
	image?: string;
}

export const certificates: Certificate[] = [
	{
		title: "Python (Basic)",
		issuer: "HackerRank",
		verifyUrl: "https://www.hackerrank.com/certificates/d5f710b194af",
	},
];