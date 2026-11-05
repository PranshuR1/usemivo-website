import { Star, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { appStoreReviews } from "@/data/content";

export function AppStoreReviews() {
  const fullStars = Math.round(appStoreReviews.rating);

  return (
    <section id="reviews" className="py-24 sm:py-32">
      <Container>
        <div>
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
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8">
          {appStoreReviews.reviews.slice(0, 2).map((review) => (
            <figure
              key={review.author}
              className="flex flex-col rounded-3xl border border-ink/10 bg-surface p-7 sm:p-9"
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
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
