// The homepage sections as the CMS defines them (Home page → Sections): their
// order, whether each is on, and what each is called. Every surface that lists
// the sections (homepage, top menu, footer, breadcrumbs) reads from here so a
// section switched off in the CMS disappears from all of them at once, and its
// SKU pages answer 404 like a page switched off in "Pages on / off".

import { notFound } from "@tanstack/react-router";
import {
  assessments,
  medical,
  memberships,
  tests,
  training,
  type Product,
  type ProductCategory,
} from "@/data/catalog";
import { homePage, type HomeSection, type SectionKey } from "@/data/pages";

/** Category a service takes when it sits in a section, and back. */
export const categoryOfSection: Record<SectionKey, ProductCategory> = {
  tests: "test",
  assessments: "assessment",
  medical: "medical",
  train: "training",
  memberships: "membership",
};

export function sectionOfCategory(category: ProductCategory): SectionKey {
  switch (category) {
    case "test":
      return "tests";
    case "assessment":
      return "assessments";
    case "medical":
      return "medical";
    case "membership":
      return "memberships";
    case "training":
    case "package":
      return "train";
  }
}

/** The live services of a section, in CMS order. */
export function productsInSection(key: SectionKey): Product[] {
  switch (key) {
    case "tests":
      return tests;
    case "assessments":
      return assessments;
    case "medical":
      return medical;
    case "train":
      return training;
    case "memberships":
      return memberships;
  }
}

export function sectionByKey(key: SectionKey): HomeSection | undefined {
  return homePage.sections.find((s) => s.key === key);
}

/** On in the CMS. A section the CMS does not list is off. */
export function sectionEnabled(key: SectionKey): boolean {
  return sectionByKey(key)?.enabled ?? false;
}

/**
 * The sections to show, in order: on in the CMS and with at least one live
 * service. An empty section would be a heading over nothing and a menu link
 * to nowhere.
 */
export function visibleSections(): HomeSection[] {
  return homePage.sections.filter((s) => s.enabled && productsInSection(s.key).length > 0);
}

/** Menu, footer and breadcrumb label of a section; the key when the title was cleared. */
export function sectionLabel(key: SectionKey): string {
  return sectionByKey(key)?.title || fallbackLabel[key];
}

const fallbackLabel: Record<SectionKey, string> = {
  tests: "Tests",
  assessments: "Assessments",
  medical: "Medical",
  train: "Train",
  memberships: "Memberships",
};

/** Whether a service's pages and links are reachable: its section is on. */
export function productReachable(p: Pick<Product, "category">): boolean {
  return sectionEnabled(sectionOfCategory(p.category));
}

/**
 * For SKU route loaders: the product, or 404 when it does not exist or its
 * section is switched off in the CMS.
 */
export function requireProduct(list: Product[], slug: string): Product {
  const product = list.find((p) => p.slug === slug);
  if (!product || !productReachable(product)) throw notFound();
  return product;
}
