type ThemeMode = 'light' | 'dark';
type ThemeType = 'default' | 'theme-red' | 'theme-rose' | 'theme-orange' | 'theme-yellow' | 'theme-violet' | 'theme-indigo' | 'theme-amber';
//this ensures that the theme states are maintained and user can only select from the available themes
// and not any random strings or values 
export class ThemeBoundary {
  private static instance: ThemeBoundary;
  private currentTheme: ThemeType = 'default';
  private currentMode: ThemeMode = 'light';

  private constructor() {}

  static getInstance(): ThemeBoundary {
    if (!ThemeBoundary.instance) {
      ThemeBoundary.instance = new ThemeBoundary();
    }
    return ThemeBoundary.instance;
  }

  validateThemeChange(newTheme: string): boolean {
    // Ensure theme is in our allowed list
    const validThemes: ThemeType[] = [
      'default', 'theme-red', 'theme-rose', 'theme-orange', 
      'theme-yellow', 'theme-violet', 'theme-indigo', 'theme-amber'
    ];
    return validThemes.includes(newTheme as ThemeType);
  }

  setTheme(theme: ThemeType): void {
    this.currentTheme = theme;
    // Reset mode when changing themes
    this.currentMode = 'light';
  }

  toggleMode(): ThemeMode {
    this.currentMode = this.currentMode === 'light' ? 'dark' : 'light';
    return this.currentMode;
  }

  getCurrentState(): { theme: ThemeType; mode: ThemeMode } {
    return {
      theme: this.currentTheme,
      mode: this.currentMode
    };
  }
}
