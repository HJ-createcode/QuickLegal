import { JsonLd } from "@/components/JsonLd";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  /** List of FAQ entries. */
  faqs: FaqItem[];
  /**
   * Section heading. Omit to suppress the <h2> — useful when the caller
   * already renders its own title (e.g. GuideSection).
   */
  title?: string;
  /**
   * When true, emit a FAQPage JSON-LD block next to the visual output.
   * Default: true. Set to false on pages that already expose multiple
   * FAQ sections (FAQ hub page — a single FAQPage covers everything).
   */
  emitSchema?: boolean;
  /** id attribute for the JSON-LD script tag. Lets callers avoid duplicate ids. */
  schemaId?: string;
  /** Optional heading tag override. Defaults to h2. */
  headingLevel?: "h2" | "h3";
}

/**
 * Collapsible FAQ with schema.org FAQPage emission.
 *
 * Renders as native <details> — no JavaScript sent to the client, SEO
 * friendly because every answer sits in the DOM at load time.
 *
 * Each page that needs a FAQ section should use this component rather
 * than hand-rolling the same <details> + JsonLd pattern twelve times.
 */
export function FaqSection({
  faqs,
  title,
  emitSchema = true,
  schemaId = "ld-faq",
  headingLevel = "h2",
}: FaqSectionProps) {
  if (!faqs || faqs.length === 0) return null;
  const Heading = headingLevel;

  return (
    <>
      <section>
        {title && (
          <Heading className="font-serif text-2xl font-bold text-slate-900 mb-4">
            {title}
          </Heading>
        )}
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-slate-200 bg-white p-5"
            >
              <summary className="flex justify-between items-start gap-4 cursor-pointer font-medium text-slate-900 text-sm list-none">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="text-slate-400 text-lg leading-none transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {emitSchema && (
        <JsonLd
          id={schemaId}
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }}
        />
      )}
    </>
  );
}
