/**
 * Vendors
 */
import parser from "fast-xml-parser";

/**
 * Simple API request implementation
 */
export function apiService<T>(url: string): Promise<T> {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.text().then((text) =>
      parser.parse(text, {
        parseAttributeValue: true,
        ignoreAttributes: false,
        attributeNamePrefix: "",
      })
    );
  });
}
