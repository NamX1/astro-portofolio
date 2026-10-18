export type ProjectStatus = "in-progress" | "shipped" | "archived";

export interface Project {
	slug: string;
	title: string;
	status: ProjectStatus;
	/**
	 * TODO(content): write a real one-liner for each project. Left undefined on
	 * purpose - do not fill this with plausible-sounding filler.
	 */
	summary?: string;
	/** Stack used, rendered as a small uppercase list. */
	tech: string[];
	links?: {
		repo?: string;
		live?: string;
	};
}

/**
 * TODO(content): titles below are placeholders. Swap in real project names.
 * No images and no invented descriptions.
 */
export const projects: Project[] = [
	{
		slug: "project-one",
		title: "Project One",
		status: "in-progress",
		tech: [],
	},
	{
		slug: "project-two",
		title: "Project Two",
		status: "in-progress",
		tech: [],
	},
];