import { motion } from "motion/react";

import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { PRESS_SCALE, springs } from "../../lib/motion";
import { MotionRoot } from "./MotionRoot";

export interface ProjectCardData {
	slug: string;
	title: string;
	/** Already resolved to display copy - see `projectStatusLabels`. */
	statusLabel: string;
	summary?: string;
	tech: string[];
	links?: {
		repo?: string;
		live?: string;
	};
}

/**
 * Project cards.
 *
 * One island for the whole grid rather than one per card: three separate
 * islands would triple the hydration bookkeeping for the same effect.
 *
 * Deliberately not glass - the brief limits glass to the nav, the certificate
 * overlay and dialogs.
 */
export default function ProjectGrid({ items }: { items: ProjectCardData[] }) {
	return (
		<MotionRoot>
			<ul className="grid gap-3 sm:gap-4">
				{items.map((project) => (
					<motion.li
						key={project.slug}
						className="rv"
						data-reveal=""
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={springs.soft}
						whileHover={{ y: -4 }}
						whileTap={{ scale: PRESS_SCALE, transition: springs.quick }}
					>
						<Card className="h-full transition-[background-color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-out-apple)] hover:bg-raised/30">
							<CardHeader>
								<CardTitle>{project.title}</CardTitle>
								<CardAction>
									<Badge variant="secondary">{project.statusLabel}</Badge>
								</CardAction>
							</CardHeader>

							<CardContent className="flex flex-col gap-5">
								{project.summary && (
									<p className="max-w-prose text-body text-ink-2">
										{project.summary}
									</p>
								)}

								{project.tech.length > 0 && (
									<ul className="flex flex-wrap gap-x-4 gap-y-2">
										{project.tech.map((item) => (
											<li
												key={item}
												className="text-label uppercase tracking-label text-ink-2"
											>
												{item}
											</li>
										))}
									</ul>
								)}

							{project.links?.repo && (
								<a
									href={project.links.repo}
									target="_blank"
									rel="noopener noreferrer"
									className="text-label uppercase tracking-label text-ink-2 transition-colors duration-[var(--duration-ui)] ease-[var(--ease-out-apple)] hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-2"
								>
									Repository
								</a>
							)}
							</CardContent>
						</Card>
					</motion.li>
				))}
			</ul>
		</MotionRoot>
	);
}