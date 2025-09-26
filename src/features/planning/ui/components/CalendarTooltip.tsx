import { PlatformIconHTML } from './PlatformIcon';
import { ContentTypeIconHTML, getContentTypeLabelHTML } from './ContentTypeIcon';
import { extractEventData, getStatusInfo, formatEventDate, formatEventTime } from './calendarUtils';

export class CalendarTooltip {
  private static hideTimeout: NodeJS.Timeout | null = null;
  private static currentTooltip: HTMLDivElement | null = null;
  
  static showTooltip = (info: any) => {
    this.clearHideTimeout();
    this.clearExistingTooltips();
    this.highlightEvent(info);
    
    const { tooltip, isAbove } = this.createTooltip(info);
    document.body.appendChild(tooltip);
    this.positionTooltip(tooltip, info.el, isAbove);
    
    // Guardar referencia al tooltip actual
    this.currentTooltip = tooltip;
    
    // Agregar eventos para mantener el tooltip visible
    this.addTooltipHoverEvents(tooltip, info);
  };

  static hideTooltip = (info: any) => {
    // Programar el ocultamiento con delay
    this.scheduleHide(info);
  };

  static forceHideTooltip = () => {
    this.clearHideTimeout();
    this.resetAllEventStyles();
    this.clearExistingTooltips();
    this.currentTooltip = null;
  };

  private static clearExistingTooltips() {
    const existingTooltips = document.querySelectorAll('[id^="tooltip-"]');
    existingTooltips.forEach(tooltip => tooltip.remove());
    
    const allEvents = document.querySelectorAll('.fc-event') as NodeListOf<HTMLElement>;
    allEvents.forEach(eventEl => {
      eventEl.style.zIndex = 'auto';
      eventEl.style.position = 'relative';
      eventEl.style.transform = 'scale(1)';
    });
  }

  private static clearHideTimeout() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  private static scheduleHide(info: any) {
    this.clearHideTimeout();
    this.hideTimeout = setTimeout(() => {
      // Limpiar event listeners antes de ocultar
      if (this.currentTooltip) {
        this.removeTooltipHoverEvents(this.currentTooltip, info);
      }
      
      this.resetEventStyle(info);
      this.clearExistingTooltips();
      this.currentTooltip = null;
    }, 300); // 300ms de delay
  }

  private static addTooltipHoverEvents(tooltip: HTMLDivElement, info: any) {
    // Permitir interacción con el tooltip
    tooltip.style.pointerEvents = 'auto';
    
    // Crear funciones para manejar los eventos
    const handleTooltipMouseEnter = () => {
      this.clearHideTimeout();
    };
    
    const handleTooltipMouseLeave = () => {
      this.scheduleHide(info);
    };
    
    const handleEventMouseLeave = () => {
      this.scheduleHide(info);
    };
    
    // Agregar event listeners
    tooltip.addEventListener('mouseenter', handleTooltipMouseEnter);
    tooltip.addEventListener('mouseleave', handleTooltipMouseLeave);
    info.el.addEventListener('mouseleave', handleEventMouseLeave);
    
    // Guardar referencias para poder limpiarlas después
    (tooltip as any).__eventListeners = {
      mouseenter: handleTooltipMouseEnter,
      mouseleave: handleTooltipMouseLeave
    };
    (info.el as any).__tooltipMouseLeave = handleEventMouseLeave;
  }

  private static removeTooltipHoverEvents(tooltip: HTMLDivElement, info: any) {
    // Limpiar event listeners del tooltip
    if ((tooltip as any).__eventListeners) {
      const listeners = (tooltip as any).__eventListeners;
      tooltip.removeEventListener('mouseenter', listeners.mouseenter);
      tooltip.removeEventListener('mouseleave', listeners.mouseleave);
    }
    
    // Limpiar event listener del evento
    if ((info.el as any).__tooltipMouseLeave) {
      info.el.removeEventListener('mouseleave', (info.el as any).__tooltipMouseLeave);
    }
  }

  private static resetAllEventStyles() {
    const allEvents = document.querySelectorAll('.fc-event') as NodeListOf<HTMLElement>;
    allEvents.forEach(eventEl => {
      eventEl.style.zIndex = 'auto';
      eventEl.style.position = 'relative';
      eventEl.style.transform = 'scale(1)';
    });
  }

  private static highlightEvent(info: any) {
    info.el.style.zIndex = '1000';
    info.el.style.position = 'relative';
    info.el.style.transform = 'scale(1.05)';
  }

  private static resetEventStyle(info: any) {
    info.el.style.zIndex = 'auto';
    info.el.style.position = 'relative';
    info.el.style.transform = 'scale(1)';
  }

  private static createTooltip(info: any): { tooltip: HTMLDivElement; isAbove: boolean } {
    const tooltip = document.createElement('div');
    const tooltipId = `tooltip-${info.event.id}-${Date.now()}`;
    tooltip.id = tooltipId;
    tooltip.className = 'calendar-event-tooltip';
    tooltip.style.zIndex = '999999';
    // pointerEvents se configurará en addTooltipHoverEvents

    // Determinar si el tooltip aparecerá arriba o abajo
    const rect = info.el.getBoundingClientRect();
    const tooltipHeight = 200;
    const isAbove = rect.top - tooltipHeight - 10 >= 10;

    const eventData = this.buildTooltipContent(info.event, isAbove);
    tooltip.innerHTML = eventData;

    return { tooltip, isAbove };
  }

  private static buildTooltipContent(event: any, isAbove: boolean = true): string {
    const {
      platforms,
      status,
      contentType,
      hasImage,
      imageUrl,
      fullText
    } = extractEventData(event);

    const statusInfo = getStatusInfo(status);
    const date = event.start ? formatEventDate(event.start) : '';
    const time = event.start ? formatEventTime(event.start) : '';
    
    const platformIconsHTML = platforms.map(platform => PlatformIconHTML(platform)).join('');
    const contentTypeIconHTML = ContentTypeIconHTML(contentType);
    const contentTypeLabel = getContentTypeLabelHTML(contentType);

    return `
      <div style="
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        padding: 16px;
        min-width: 280px;
        max-width: 320px;
        font-size: 12px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        position: relative;
      ">
        ${this.buildTooltipArrow(isAbove)}
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div style="display: flex; gap: 4px; align-items: center;">
            ${platformIconsHTML}
          </div>
          <span style="font-weight: 600; color: #374151; font-size: 13px;">${date} ${time}</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div style="display: flex; align-items: center;">
            <div style="
              width: 8px; 
              height: 8px; 
              border-radius: 50%; 
              background-color: ${statusInfo.color}; 
              margin-right: 6px;
            "></div>
            <span style="color: #6b7280; font-size: 12px;">${statusInfo.text}</span>
          </div>
          <div style="
            display: flex;
            align-items: center;
            gap: 4px;
            background: #f3f4f6;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 10px;
            color: #374151;
          ">
            ${contentTypeIconHTML}
            <span>${contentTypeLabel}</span>
          </div>
        </div>
        
        <div style="
          color: #374151; 
          font-size: 12px; 
          line-height: 1.4; 
          word-wrap: break-word;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          margin-bottom: 12px;
        ">
          ${fullText || 'Sin contenido'}
        </div>
        
        ${this.buildImageSection(hasImage, imageUrl)}
      </div>
    `;
  }

  private static buildImageSection(hasImage: boolean, imageUrl: string | null): string {
    if (!hasImage) return '';

    return `
        <div style="display: flex; align-items: center; margin-top: 8px;">
          ${imageUrl ? `
          <img 
            src="${imageUrl}" 
            alt="Preview" 
            style="
              width: 48px;
              height: 48px;
              border-radius: 6px;
              border: 1px solid #e5e7eb;
              object-fit: cover;
              flex-shrink: 0;
            "
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
          <div style="
            display: none;
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            align-items: center;
            justify-content: center;
            color: #9ca3af;
            font-size: 14px;
            flex-shrink: 0;
          ">
            📷
          </div>
          ` : `
          <div style="
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #9ca3af;
            font-size: 14px;
            flex-shrink: 0;
          ">
            📷
          </div>
          `}
        </div>
    `;
  }

  private static positionTooltip(tooltip: HTMLDivElement, eventElement: HTMLElement, isAbove: boolean) {
    const rect = eventElement.getBoundingClientRect();
    const tooltipHeight = 200;
    const tooltipWidth = 320;
    const viewportWidth = window.innerWidth;
    
    tooltip.style.position = 'fixed';
    
    // Calcular posición vertical
    let topPosition: number;
    if (isAbove) {
      topPosition = rect.top - tooltipHeight - 10;
    } else {
      topPosition = rect.bottom + 10;
    }
    
    // Calcular posición horizontal (centrado sobre el evento)
    let leftPosition = rect.left + (rect.width / 2) - (tooltipWidth / 2);
    
    // Ajustar si se sale por la izquierda
    if (leftPosition < 10) {
      leftPosition = 10;
    }
    
    // Ajustar si se sale por la derecha
    if (leftPosition + tooltipWidth > viewportWidth - 10) {
      leftPosition = viewportWidth - tooltipWidth - 10;
    }
    
    tooltip.style.top = `${topPosition}px`;
    tooltip.style.left = `${leftPosition}px`;
  }

  private static buildTooltipArrow(isAbove: boolean): string {
    if (isAbove) {
      // Flecha apuntando hacia abajo (tooltip arriba)
      return `
        <div style="
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid white;
          z-index: 1;
        "></div>
        <div style="
          position: absolute;
          bottom: -9px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid #e5e7eb;
          z-index: 0;
        "></div>
      `;
    } else {
      // Flecha apuntando hacia arriba (tooltip abajo)
      return `
        <div style="
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid white;
          z-index: 1;
        "></div>
        <div style="
          position: absolute;
          top: -9px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid #e5e7eb;
          z-index: 0;
        "></div>
      `;
    }
  }

}