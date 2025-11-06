import { getLegalContent } from '@/lib/legal/legalService';
import ReactMarkdown from 'react-markdown';

export default async function TermsPage() {
  const content = await getLegalContent('terms');

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
