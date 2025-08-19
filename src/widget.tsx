import React from 'react';
import { createRoot } from 'react-dom/client';
import FloatingButton from './components/FloatingButton';
import StadiumFloatingButton from './components/StadiumFloatingButton';
import { WidgetConfig } from './types';
import './index.css';

// Ensure we're in a browser environment
if (typeof window === 'undefined') {
  throw new Error('TriviaQuizWidget can only be used in a browser environment');
}

// Widget class for easy embedding
class TriviaQuizWidget {
  private container: HTMLElement;
  private config: WidgetConfig;

  constructor(container: HTMLElement | string, config: WidgetConfig = {}) {
    this.config = config;
    
    if (typeof container === 'string') {
      const element = document.getElementById(container);
      if (!element) {
        throw new Error(`Container element with id "${container}" not found`);
      }
      this.container = element;
    } else {
      this.container = container;
    }

    this.render();
  }

  private render() {
    const root = createRoot(this.container);
    root.render(
      <React.StrictMode>
        <div>
          <FloatingButton config={this.config} />
          <StadiumFloatingButton />
        </div>
      </React.StrictMode>
    );
  }

  // Public method to update config
  public updateConfig(newConfig: Partial<WidgetConfig>) {
    this.config = { ...this.config, ...newConfig };
    this.render();
  }
}

// Make it available globally
declare global {
  interface Window {
    TriviaQuizWidget: typeof TriviaQuizWidget;
  }
}

window.TriviaQuizWidget = TriviaQuizWidget;

// Auto-initialize floating button widget
document.addEventListener('DOMContentLoaded', () => {
  // Check if there are any data-trivia-widget elements
  const widgets = document.querySelectorAll('[data-trivia-widget]');
  
  if (widgets.length > 0) {
    // Initialize widgets in containers
    widgets.forEach((element) => {
      const config: WidgetConfig = {};
      
      // Parse data attributes
      if (element.getAttribute('data-time-limit')) {
        config.timeLimit = parseInt(element.getAttribute('data-time-limit') || '30');
      }
      
      if (element.getAttribute('data-theme')) {
        config.theme = element.getAttribute('data-theme') as 'light' | 'dark';
      }
      
      const primaryColor = element.getAttribute('data-primary-color');
      if (primaryColor) {
        config.primaryColor = primaryColor;
      }
      
      const secondaryColor = element.getAttribute('data-secondary-color');
      if (secondaryColor) {
        config.secondaryColor = secondaryColor;
      }
      
      new TriviaQuizWidget(element as HTMLElement, config);
    });
  } else {
    // Auto-create floating button widget
    const floatingContainer = document.createElement('div');
    floatingContainer.id = 'floating-trivia-widget';
    document.body.appendChild(floatingContainer);
    
    new TriviaQuizWidget(floatingContainer, {});
  }
});

export default TriviaQuizWidget;
