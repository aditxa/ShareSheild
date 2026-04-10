interface RegexPattern {
  pattern: string;
  flags?: string;
}

interface Config {
  version: string;
  selectors: string[];
  regex: RegexPattern[];
  ignore?: {
    selectors?: string[];
    regex?: RegexPattern[];
  };
}

type ShareShieldMode = 'blur' | 'scramble';

interface StorageData {
  enabled: boolean;
  config: Config;
  mode: ShareShieldMode;
}
