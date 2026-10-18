import { motion } from "motion/react";

import { Badge } from "../ui/badge";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { MotionRoot } from "./MotionRoot";

export interface ProjectCardData {
	slug: string;
	title: string;
	/** Already resolved to display copy - see `projectStatusLabels`. */
	statusLabel: string;
	summary?: string;
	tech: string[];
}

/**
 * Project cards.
 *
 * One island for the whole grid rather than one per card: three separate
 * islands would triple the hydration bookkeeping for the same effect.
 *
 * The `<li>` is a bare layout/lift wrapper - all the visual treatment lives on
 * `Card`. Motion owns the lift (`whileHover`) because the prompt calls for it.
 * Surface brightening stays in CSS so it can transition independently instead
 * of inheriting the 1s reveal duration.
 *
 * Cards are deliberately not links yet.
 */
export default function ProjectGrid({ items }: { items: ProjectCardData[] }) {
	return (
		<MotionRoot>
			<ul className="grid gap-3 sm:gap-4">
				{items.map((project) => (
					<motion.li
						key={project.slug}
						data-reveal=""
						initial={{ opacity: 0, filter: "blur(8px)" }}
						whileInView={{ opacity: 1, filter: "blur(0px)" }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 1, ease: "easeOut" }}
						whileHover={{ y: -4 }}
					>
						<Card className="glass h-full transition-[background-color,box-shadow] duration-500 ease-out hover:bg-raised/30">
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
							</CardContent>
						</Card>
					</motion.li>
				))}
			</ul>
		</MotionRoot>
	);
}