# Calendario Social Media

Este módulo contiene los componentes para el calendario de redes sociales con funcionalidades de programación de posts.

## 📁 Estructura de Archivos

### **Componentes Principales**
- `index.tsx` - Calendario principal (usado en calendar-social-media)
- `SocialMediaScheduler.tsx` - Programador avanzado (usado en calendar-advanced)
- `NewPostModal.tsx` - Modal para crear/editar posts (usado en SocialMediaScheduler)

### **Componentes de Posts Sociales**
- `SocialMediaPost.tsx` - Componente individual de post (usado en DayView y WeekView)
- `SocialMediaPostDialog.tsx` - Dialog para ver detalles de posts (usado en SocialMediaScheduler)

### **Vistas del Calendario**
- `DayView.tsx` - Vista diaria
- `WeekView.tsx` - Vista semanal  
- `MonthView.tsx` - Vista mensual

### **Componentes de Eventos**
- `CalendarEvent.tsx` - Componente individual de evento
- `CalendarEventDialog.tsx` - Dialog para ver eventos
- `CalendarEventForm.tsx` - Formulario para crear/editar eventos

### **Componentes de Configuración**
- `ConfigurationSection.tsx` - Sección de configuraciones del modal
- `LogsSection.tsx` - Sección de logs del modal

### **Datos y Tipos**
- `types.ts` - Interfaces TypeScript
- `data.ts` - Datos de ejemplo y configuraciones

### **Estilos**
- `Calendar.css` - Estilos del calendario principal
- `SocialMediaScheduler.css` - Estilos del programador

### **Punto de Entrada**
- `CalendarIndex.tsx` - Exportaciones centralizadas

## 🔄 Migración a Post Modal Modular

El `NewPostModal.tsx` actual será reemplazado por el sistema modular en `@/post_modal`:

```typescript
// Antes (obsoleto)
import { NewPostModal } from '@/app/components/calendar_social_media';

// Después (nuevo)
import { NewPostModal } from '@/app/components/apps/post_modal';
```

## 📋 Archivos Funcionales

### **Archivos que SÍ se usan:**
- ✅ `index.tsx` - Calendario principal
- ✅ `SocialMediaScheduler.tsx` - Programador avanzado
- ✅ `SocialMediaPost.tsx` - Componente de post individual
- ✅ `SocialMediaPostDialog.tsx` - Dialog de detalles
- ✅ `NewPostModal.tsx` - Modal (pendiente migración)
- ✅ `DayView.tsx`, `WeekView.tsx`, `MonthView.tsx` - Vistas
- ✅ `CalendarEvent.tsx`, `CalendarEventDialog.tsx`, `CalendarEventForm.tsx` - Eventos
- ✅ `ConfigurationSection.tsx`, `LogsSection.tsx` - Configuraciones
- ✅ `types.ts`, `data.ts` - Tipos y datos
- ✅ `Calendar.css`, `SocialMediaScheduler.css` - Estilos

### **Archivos Eliminados (Obsoletos):**
- ❌ `SocialMediaPostForm.tsx` - Reemplazado por NewPostModal
- ❌ `Example.tsx` - Archivo de ejemplo
- ❌ `CalendarWrapper.tsx` - Wrapper innecesario

## 📝 Notas de Integración

1. **SocialMediaScheduler** usa el modal actual pero debe migrar al nuevo sistema
2. **Calendar principal** no usa modales, solo eventos básicos
3. **DayView y WeekView** usan `SocialMediaPost` para mostrar posts individuales
4. Los tipos y datos se comparten entre ambos sistemas
5. **SocialMediaPostDialog** se usa para mostrar detalles de posts en el programador

## 🎯 Próximos Pasos

1. **Migrar SocialMediaScheduler** al nuevo modal modular
2. **Eliminar NewPostModal.tsx** obsoleto después de la migración
3. **Actualizar documentación** con la nueva estructura 