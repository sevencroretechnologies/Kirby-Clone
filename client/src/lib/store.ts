import { create } from 'zustand';
import { 
  BuildingConfig, 
  VisualizationSettings, 
  ViewMode,
  TemplateType,
  createDefaultBuildingConfig,
  Opening,
  Accessory
} from '@shared/schema';

interface ConfiguratorState {
  // Building configuration
  buildingConfig: BuildingConfig | null;
  selectedTemplate: TemplateType | null;
  
  // Active panel
  activePanel: string;
  
  // Visualization settings
  visualization: VisualizationSettings;
  
  // View mode
  viewMode: ViewMode;
  
  // History for undo/redo
  history: BuildingConfig[];
  historyIndex: number;
  
  // Actions
  setSelectedTemplate: (template: TemplateType) => void;
  initializeBuilding: (templateType: TemplateType) => void;
  updateDimensions: (updates: Partial<BuildingConfig['dimensions']>) => void;
  updateRoof: (updates: Partial<BuildingConfig['roof']>) => void;
  updateColors: (updates: Partial<BuildingConfig['colors']>) => void;
  updateFrameType: (frameType: string) => void;
  updateCrane: (capacity: number) => void;
  addOpening: (opening: Opening) => void;
  removeOpening: (id: string) => void;
  addAccessory: (accessory: Accessory) => void;
  removeAccessory: (id: string) => void;
  setActivePanel: (panel: string) => void;
  setVisualization: (updates: Partial<VisualizationSettings>) => void;
  setViewMode: (mode: ViewMode) => void;
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;
  resetConfig: () => void;
}

const defaultVisualization: VisualizationSettings = {
  showEdges: true,
  showFaces: true,
  showPanels: true,
  showSolidWalls: true,
  showOpenings: true,
  showFrames: true,
  showPurlins: false,
  showGirts: false,
  showFlashing: true,
  showAccessories: true,
  showBasePlate: true,
  showDimensions: true,
  showButtons: true,
};

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  buildingConfig: null,
  selectedTemplate: null,
  activePanel: 'building',
  visualization: defaultVisualization,
  viewMode: '3D',
  history: [],
  historyIndex: -1,

  setSelectedTemplate: (template) => set({ selectedTemplate: template }),

  initializeBuilding: (templateType) => {
    const config = createDefaultBuildingConfig(templateType);
    set({ 
      buildingConfig: config,
      selectedTemplate: templateType,
      history: [config],
      historyIndex: 0,
    });
  },

  updateDimensions: (updates) => {
    const { buildingConfig } = get();
    if (!buildingConfig) return;
    
    const newConfig = {
      ...buildingConfig,
      dimensions: { ...buildingConfig.dimensions, ...updates },
    };
    set({ buildingConfig: newConfig });
    get().saveToHistory();
  },

  updateRoof: (updates) => {
    const { buildingConfig } = get();
    if (!buildingConfig) return;
    
    const newConfig = {
      ...buildingConfig,
      roof: { ...buildingConfig.roof, ...updates },
    };
    set({ buildingConfig: newConfig });
    get().saveToHistory();
  },

  updateColors: (updates) => {
    const { buildingConfig } = get();
    if (!buildingConfig) return;
    
    const newConfig = {
      ...buildingConfig,
      colors: { ...buildingConfig.colors, ...updates },
    };
    set({ buildingConfig: newConfig });
    get().saveToHistory();
  },

  updateFrameType: (frameType) => {
    const { buildingConfig } = get();
    if (!buildingConfig) return;
    
    set({ buildingConfig: { ...buildingConfig, frameType } });
    get().saveToHistory();
  },

  updateCrane: (capacity) => {
    const { buildingConfig } = get();
    if (!buildingConfig) return;
    
    set({ 
      buildingConfig: { 
        ...buildingConfig, 
        crane: capacity > 0 ? { capacity } : undefined 
      } 
    });
    get().saveToHistory();
  },

  addOpening: (opening) => {
    const { buildingConfig } = get();
    if (!buildingConfig) return;
    
    set({ 
      buildingConfig: { 
        ...buildingConfig, 
        openings: [...buildingConfig.openings, opening] 
      } 
    });
    get().saveToHistory();
  },

  removeOpening: (id) => {
    const { buildingConfig } = get();
    if (!buildingConfig) return;
    
    set({ 
      buildingConfig: { 
        ...buildingConfig, 
        openings: buildingConfig.openings.filter(o => o.id !== id) 
      } 
    });
    get().saveToHistory();
  },

  addAccessory: (accessory) => {
    const { buildingConfig } = get();
    if (!buildingConfig) return;
    
    set({ 
      buildingConfig: { 
        ...buildingConfig, 
        accessories: [...buildingConfig.accessories, accessory] 
      } 
    });
    get().saveToHistory();
  },

  removeAccessory: (id) => {
    const { buildingConfig } = get();
    if (!buildingConfig) return;
    
    set({ 
      buildingConfig: { 
        ...buildingConfig, 
        accessories: buildingConfig.accessories.filter(a => a.id !== id) 
      } 
    });
    get().saveToHistory();
  },

  setActivePanel: (panel) => set({ activePanel: panel }),

  setVisualization: (updates) => {
    set((state) => ({
      visualization: { ...state.visualization, ...updates },
    }));
  },

  setViewMode: (mode) => set({ viewMode: mode }),

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      set({ 
        buildingConfig: history[historyIndex - 1],
        historyIndex: historyIndex - 1,
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      set({ 
        buildingConfig: history[historyIndex + 1],
        historyIndex: historyIndex + 1,
      });
    }
  },

  saveToHistory: () => {
    const { buildingConfig, history, historyIndex } = get();
    if (!buildingConfig) return;
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(buildingConfig);
    
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    
    set({ 
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  resetConfig: () => {
    set({
      buildingConfig: null,
      selectedTemplate: null,
      history: [],
      historyIndex: -1,
    });
  },
}));
