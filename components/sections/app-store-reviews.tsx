"use client";

import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { appStoreReviews } from "@/data/content";

export function AppStoreReviews() {
  const fullStars = Math.round(appStoreReviews.rating);

  return (
    <section id="reviews" className="py-28 sm:py-36">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="flex justify-center">
            <Eyebrow>{appStoreReviews.eyebrow}</Eyebrow>
          </div>
          <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            {appStoreReviews.heading}
          </h2>

          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < fullStars ? "fill-accent text-accent" : "text-ink/15"}
                />
              ))}
            </div>
            <a
              href={appStoreReviews.url}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-ink-body underline-offset-4 hover:text-ink hover:underline"
            >
              {appStoreReviews.rating} out of 5 on the App Store
            </a>
          </div>
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
              className="flex flex-col rounded-2xl border border-ink/10 bg-surface/40 p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-ink">{review.title}</p>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-kept/15 px-2 py-1 text-[10px] font-medium text-kept">
                  <BadgeCheck size={12} />
                  Verified
                </span>
              </div>
              <blockquote className="mt-2.5 flex-1 text-[14px] leading-relaxed text-ink-body">
                &ldquo;{review.body}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3">
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
