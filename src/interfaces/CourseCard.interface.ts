import { ReactNode } from "react";

export interface CourseCardInterface {
  id?: string;
  title?: string;
  description?: string;
  authors?: ReactNode | string[];
  duration?: string;
  createdAt?: string;
}
