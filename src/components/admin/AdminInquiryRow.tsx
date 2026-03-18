"use client";

import { useState } from "react";
import type { ContactSubmission } from "@prisma/client";

export default function AdminInquiryRow({ inquiry }: { inquiry: ContactSubmission }) {
  const [expanded, setExpanded] = useState(false);

  const mailtoHref = `mailto:${inquiry.email}?subject=${encodeURIComponent(
    "Re: VibeShift Partnership Enquiry"
  )}&body=${encodeURIComponent(`Hi ${inquiry.contactName},\n\nThank you for reaching out about a partnership with VibeShift.\n\n`)}`;

  return (
    <>
      <tr className="hover:bg-surface-container-low transition-colors">
        {/* Organisation */}
        <td className="px-6 py-4">
          <div>
            <p className="font-bold text-sm">{inquiry.orgName}</p>
            <p className="text-xs text-on-surface-variant">{inquiry.contactName}</p>
          </div>
        </td>

        {/* Contact */}
        <td className="px-6 py-4 hidden md:table-cell">
          <p className="text-sm text-primary">{inquiry.email}</p>
          {inquiry.phone && (
            <p className="text-xs text-on-surface-variant">{inquiry.phone}</p>
          )}
        </td>

        {/* Date */}
        <td className="px-6 py-4 hidden lg:table-cell">
          <span className="text-sm text-on-surface-variant">
            {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </td>

        {/* Actions */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-sm">
                {expanded ? "expand_less" : "expand_more"}
              </span>
              {expanded ? "Hide" : "Message"}
            </button>
            <a
              href={mailtoHref}
              className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              <span className="material-symbols-outlined text-sm">reply</span>
              Reply
            </a>
          </div>
        </td>
      </tr>

      {expanded && (
        <tr className="bg-surface-container-low">
          <td colSpan={4} className="px-6 py-4">
            <p className="text-sm text-on-surface whitespace-pre-wrap leading-relaxed">
              {inquiry.message}
            </p>
          </td>
        </tr>
      )}
    </>
  );
}
