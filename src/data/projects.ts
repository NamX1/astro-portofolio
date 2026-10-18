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
		slug: "project-one",
		title: "Project One",
		status: "in-progress",
		summary: "Roughly half-built. Screenshots once it has something to show.",
		tech: [],
	},
	{
		slug: "project-two",
		title: "Project Two",
		status: "in-progress",
		summary: "The one I keep rebuilding whenever the last version annoys me.",
		tech: [],
	},
	{
		slug: "project-three",
		title: "Project Three",
		status: "in-progress",
		summary: "Small tool, mostly so I stop repeating myself.",
		tech: [],
	},
];

/** Badge copy for each status. */
export const projectStatusLabels: Record<ProjectStatus, string> = {
	"in-progress": "In progress",
	shipped: "Shipped",
	archived: "Archived",
};