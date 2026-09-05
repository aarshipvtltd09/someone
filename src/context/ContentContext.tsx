import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppContentConfig, DEFAULT_CONTENT_CONFIG } from '../config/contentConfig';

const STORAGE_KEY = 'aarshi_birthday_notes_config';

interface ContentContextType {
  config: AppContentConfig;
  updateConfig: (updater: (prev: AppContentConfig) => AppContentConfig) => void;
  resetToDefaults: () => void;
  importJsonConfig: (jsonStr: string) => boolean;
  exportJsonConfig: () => string;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AppContentConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.version || parsed.version < DEFAULT_CONTENT_CONFIG.version) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CONTENT_CONFIG));
          return DEFAULT_CONTENT_CONFIG;
        }
        // Merge with defaults to ensure all keys exist
        return {
          ...DEFAULT_CONTENT_CONFIG,
          ...parsed,
          chapter1: { ...DEFAULT_CONTENT_CONFIG.chapter1, ...parsed.chapter1 },
          chapter2: { ...DEFAULT_CONTENT_CONFIG.chapter2, ...parsed.chapter2 },
          chapter3: { ...DEFAULT_CONTENT_CONFIG.chapter3, ...parsed.chapter3 },
          chapter4: { ...DEFAULT_CONTENT_CONFIG.chapter4, ...parsed.chapter4 },
          chapter5Pages: Array.isArray(parsed.chapter5Pages) ? parsed.chapter5Pages : DEFAULT_CONTENT_CONFIG.chapter5Pages,
          chapter6: { ...DEFAULT_CONTENT_CONFIG.chapter6, ...parsed.chapter6 },
        };
      }
    } catch {
      // ignore parse error
    }
    return DEFAULT_CONTENT_CONFIG;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // ignore quota error
    }
  }, [config]);

  const updateConfig = (updater: (prev: AppContentConfig) => AppContentConfig) => {
    setConfig((prev) => {
      const updated = updater(prev);
      return {
        ...updated,
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig(DEFAULT_CONTENT_CONFIG);
  };

  const importJsonConfig = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (typeof parsed === 'object' && parsed !== null) {
        const merged: AppContentConfig = {
          ...DEFAULT_CONTENT_CONFIG,
          ...parsed,
          chapter1: { ...DEFAULT_CONTENT_CONFIG.chapter1, ...parsed.chapter1 },
          chapter2: { ...DEFAULT_CONTENT_CONFIG.chapter2, ...parsed.chapter2 },
          chapter3: { ...DEFAULT_CONTENT_CONFIG.chapter3, ...parsed.chapter3 },
          chapter4: { ...DEFAULT_CONTENT_CONFIG.chapter4, ...parsed.chapter4 },
          chapter5Pages: Array.isArray(parsed.chapter5Pages) ? parsed.chapter5Pages : DEFAULT_CONTENT_CONFIG.chapter5Pages,
          chapter6: { ...DEFAULT_CONTENT_CONFIG.chapter6, ...parsed.chapter6 },
          lastUpdated: new Date().toISOString(),
        };
        setConfig(merged);
        return true;
      }
    } catch {
      // parse fail
    }
    return false;
  };

  const exportJsonConfig = (): string => {
    return JSON.stringify(config, null, 2);
  };

  return (
    <ContentContext.Provider
      value={{
        config,
        updateConfig,
        resetToDefaults,
        importJsonConfig,
        exportJsonConfig,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    return {
      config: DEFAULT_CONTENT_CONFIG,
      updateConfig: () => {},
      resetToDefaults: () => {},
      importJsonConfig: () => false,
      exportJsonConfig: () => JSON.stringify(DEFAULT_CONTENT_CONFIG, null, 2),
    };
  }
  return context;
};
