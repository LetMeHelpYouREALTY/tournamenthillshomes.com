/** RealScout widget configuration — single source for agent ID and office listings filters. */

export const REALSCOUT_AGENT_ID = "QWdlbnQtMjI1MDUw";

export const REALSCOUT_SCRIPT_URL =
  "https://em.realscout.com/widgets/realscout-web-components.umd.js";

/** Office listings widget markup (used with dangerouslySetInnerHTML). */
export const REALSCOUT_OFFICE_LISTINGS_HTML = `<realscout-office-listings agent-encoded-id="${REALSCOUT_AGENT_ID}" sort-order="SOLD_DATE_NEWEST" listing-status="For Sale" property-types=",SFR" price-min="700000" price-max="1000000"></realscout-office-listings>`;
