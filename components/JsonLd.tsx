/**
 * Inline JSON-LD emitter.
 *
 * Usage:
 *   <JsonLd data={myJsonLdObject} id="ld-something" />
 *
 * We serialize without whitespace and escape the only two characters that
 * could prematurely close or confuse the surrounding <script> tag.
 * Google is tolerant of whitespace but browsers are not tolerant of a
 * `</script>` inside a script body.
 */

// Anything JSON-serializable. Keeping it permissive so callers can build
// schemas freely without fighting the type system.
type JsonLdInput = Record<string, unknown> | Record<string, unknown>[];

function safeSerialize(data: JsonLdInput): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export function JsonLd({ data, id }: { data: JsonLdInput; id?: string }) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: safeSerialize(data) }}
    />
  );
}
