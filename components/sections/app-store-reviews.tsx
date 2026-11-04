"use client";

import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { appStoreReviews } from "@/data/content";

export function AppStoreReviews() {
  const fullStars = Math.round(appStoreReviews.rating);

  return (
    <section id="reviews" className="py-24 sm:py-32">
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
          <SectionHeader
            eyebrow={appStoreReviews.eyebrow}
            heading={appStoreReviews.heading}
          >
            <a
              href={appStoreReviews.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-flex items-center gap-4 rounded-full border border-ink/10 bg-surface px-6 py-3 shadow-card transition-shadow hover:shadow-lift"
            >
              <span className="font-display text-4xl leading-none text-ink">{appStoreReviews.rating}</span>
              <span className="flex flex-col items-start gap-1">
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={i < fullStars ? "fill-accent text-accent" : "text-ink/15"}
                    />
                  ))}
                </span>
                <span className="text-xs text-ink-muted">out of 5 on the App Store</span>
              </span>
            </a>
          </SectionHeader>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {appStoreReviews.reviews.map((review, index) => (
            <motion.figure
              key={review.author}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.08 }}
              // Two reviews make the point on a phone; all four show from tablet up.
              className={`flex-col rounded-3xl border border-ink/10 bg-surface p-6 shadow-card sm:p-7 ${index < 2 ? "flex" : "hidden sm:flex"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[15px] font-semibold text-ink">{review.title}</p>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-kept/15 px-2 py-1 text-[10px] font-medium text-kept">
                  <BadgeCheck size={12} />
                  Verified
                </span>
              </div>
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-body">
                &ldquo;{review.body}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
                <span className="text-xs font-medium text-ink-body">{review.author}</span>
                <span className="text-xs text-ink-muted">{review.date}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
