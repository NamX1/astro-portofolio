export type ProjectStatus = "in-progress" | "shipped" | "archived";

export interface Project {
	slug: string;
	title: string;
	status: ProjectStatus;
	/** One honest line. `undefined` renders no description rather than filler. */
	summary?: string;
	/** Stack used, rendered as a small uppercase list. */
	tech: string[];
	links?: {
		repo?: string;
		live?: string;
	};
}

/**
 * TODO(content): titles are placeholders. Swap in real project names.
 *
 * No images, no screenshots, no invented metrics. The summaries below
 * deliberately describe how finished each thing actually is rather than
 * pretending they are done.
 */
export const projects: Project[] = [
	{
		slug: "golearn",
		title: "golearn",
		status: "in-progress",
		summary: "Runnable Go examples, one concept at a time, all built around a small lending library.",
		tech: ["Go"],
		links: {
			repo: "https://github.com/NamX1/golearn",
		},
	},
	{
		slug: "project-two",
		title: "Project Two",
		status: "in-progress",
		summary: "Coming soon.",
		tech: [],
	},
	{
		slug: "project-three",
		title: "Project Three",
		status: "in-progress",
		summary: "Coming soon.",
		tech: [],
	},
];

/** Badge copy for each status. */
export const projectStatusLabels: Record<ProjectStatus, string> = {
	"in-progress": "In progress",
	shipped: "Shipped",
	archived: "Archived",
};