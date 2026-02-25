import type {
  FileCategoryStats,
  MonthlyTransferItem,
  RecentFileItem,
} from "../types";

/** Single source of truth for dashboard storage (used by cards, remaining, treemap) */
export const STORAGE_TOTAL_GB = 3;
export const STORAGE_USED_GB = 1.8;

/** Mock stats for dashboard cards (Documents, Images, Videos, Others). usedGb sums to STORAGE_USED_GB; percent = usedGb/STORAGE_TOTAL_GB. */
export function getFileCategoryStats(): FileCategoryStats[] {
  const now = new Date();
  const recent = new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString();
  const totalGb = STORAGE_TOTAL_GB;
  const usedGb = STORAGE_USED_GB;
  const raw = [
    { key: "documents" as const, count: 1390, share: 0.28 },
    { key: "images" as const, count: 5678, share: 0.38 },
    { key: "videos" as const, count: 901, share: 0.22 },
    { key: "others" as const, count: 234, share: 0.12 },
  ];
  return raw.map(({ key, count, share }) => {
    const categoryUsedGb = Math.round(usedGb * share * 100) / 100;
    const percent = Math.round((categoryUsedGb / totalGb) * 100);
    return {
      key,
      count,
      usedGb: categoryUsedGb,
      percent,
      updatedAt: recent,
    };
  });
}

const MONTH_SHORTS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Mock monthly upload counts by file type (document, image, video, other) for last 12 months */
export function getMonthlyTransferData(): MonthlyTransferItem[] {
  return MONTH_SHORTS.map((monthShort, i) => {
    const total = 60 + ((i * 12) % 120);
    return {
      month: monthShort,
      monthShort,
      document: Math.round(total * (0.28 + (i % 5) * 0.02)),
      image: Math.round(total * (0.38 + (i % 3) * 0.03)),
      video: Math.round(total * (0.22 + (i % 4) * 0.02)),
      other: Math.round(total * (0.08 + (i % 2) * 0.02)),
    };
  });
}

/** Mock recently uploaded files */
export function getRecentlyUploadedFiles(): RecentFileItem[] {
  return [
    {
      name: "project-proposal.docx",
      size: "2.38 MB",
      uploadDate: "Apr 15, 2025",
      type: "document",
    },
    {
      name: "company-logo.png",
      size: "1.14 MB",
      uploadDate: "Apr 14, 2025",
      type: "image",
    },
    {
      name: "presentation.pptx",
      size: "5.34 MB",
      uploadDate: "Apr 13, 2025",
      type: "document",
    },
    {
      name: "budget.xlsx",
      size: "957.03 KB",
      uploadDate: "Mar 12, 2025",
      type: "spreadsheet",
    },
    {
      name: "product-video.mp4",
      size: "150.68 MB",
      uploadDate: "Apr 11, 2025",
      type: "video",
    },
  ];
}
