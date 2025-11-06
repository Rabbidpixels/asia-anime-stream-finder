import fs from 'fs/promises';
import path from 'path';

export type LegalPageType = 'privacy' | 'terms';

interface LegalContent {
  type: LegalPageType;
  content: string;
  lastModified: string;
}

// In-memory storage for development (replace with database in production)
let legalContent: Record<LegalPageType, string> = {
  privacy: '',
  terms: '',
};

// Initialize with default content
async function initializeDefaultContent() {
  if (!legalContent.privacy) {
    try {
      const privacyPath = path.join(process.cwd(), 'data/legal/default-privacy.md');
      const termsPath = path.join(process.cwd(), 'data/legal/default-terms.md');

      const [privacy, terms] = await Promise.all([
        fs.readFile(privacyPath, 'utf-8').catch(() => getDefaultPrivacy()),
        fs.readFile(termsPath, 'utf-8').catch(() => getDefaultTerms()),
      ]);

      legalContent.privacy = privacy;
      legalContent.terms = terms;
    } catch (error) {
      console.error('Failed to load default legal content:', error);
      legalContent.privacy = getDefaultPrivacy();
      legalContent.terms = getDefaultTerms();
    }
  }
}

function getDefaultPrivacy(): string {
  return `# Privacy Policy

**Last Updated: January 2025**

We respect your privacy. This page will contain our privacy policy.

Please contact us at privacy@rabbidpixel.com for more information.

---

**Rabbid Pixel LLC © 2025**`;
}

function getDefaultTerms(): string {
  return `# Terms of Use

**Last Updated: January 2025**

These are our terms of use. Please read them carefully.

For questions, contact us at legal@rabbidpixel.com

---

**Rabbid Pixel LLC © 2025**`;
}

// Get legal content
export async function getLegalContent(type: LegalPageType): Promise<string> {
  await initializeDefaultContent();
  return legalContent[type];
}

// Update legal content (for Admin Panel)
export async function updateLegalContent(type: LegalPageType, content: string): Promise<boolean> {
  try {
    legalContent[type] = content;
    // In production, save to database here
    return true;
  } catch (error) {
    console.error(`Failed to update ${type} content:`, error);
    return false;
  }
}

// Get all legal content
export async function getAllLegalContent(): Promise<Record<LegalPageType, LegalContent>> {
  await initializeDefaultContent();

  return {
    privacy: {
      type: 'privacy',
      content: legalContent.privacy,
      lastModified: new Date().toISOString(),
    },
    terms: {
      type: 'terms',
      content: legalContent.terms,
      lastModified: new Date().toISOString(),
    },
  };
}
