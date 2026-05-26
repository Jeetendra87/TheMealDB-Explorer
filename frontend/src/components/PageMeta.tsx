import { useDocumentTitle } from '@/hooks/useDocumentTitle';

interface PageMetaProps {
  title: string;
}

export const PageMeta = ({ title }: PageMetaProps) => {
  useDocumentTitle(title);
  return null;
};
