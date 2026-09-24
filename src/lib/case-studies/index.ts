import type { CaseStudy, CaseStudyId } from "./types";
import { klimashift } from "./klimashift";
import { autoremov } from "./autoremov";
import { trivira } from "./trivira";

export const CASE_STUDIES: Record<CaseStudyId, CaseStudy> = {
  klimashift,
  autoremov,
  trivira,
};

export const CASE_STUDY_ORDER: CaseStudyId[] = ["klimashift", "autoremov", "trivira"];

export const CASE_STUDY_LIST: CaseStudy[] = CASE_STUDY_ORDER.map((id) => CASE_STUDIES[id]);

export function getCaseStudy(id: CaseStudyId): CaseStudy {
  return CASE_STUDIES[id];
}

export type { CaseStudy, CaseStudyId };
