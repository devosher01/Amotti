# 📋 Documentación de Parámetros - Módulo Empresa (AIGENCIA)

## 🎯 Resumen General
Este documento lista todos los campos y parámetros que se solicitan en el módulo de empresa de AIGENCIA, organizados por secciones. Esta información será utilizada para el desarrollo del backend.

---

## 📊 **SECCIÓN 1: INFORMACIÓN BÁSICA**

### Campos Obligatorios:
- **`companyName`** (string)
  - **Descripción**: Nombre completo de la empresa
  - **Tipo**: Texto libre
  - **Validación**: Requerido, mínimo 2 caracteres

- **`industry`** (string)
  - **Descripción**: Industria a la que pertenece la empresa
  - **Tipo**: Select con opciones predefinidas
  - **Opciones**: 
    - `tecnologia` - Tecnología
    - `salud` - Salud y Bienestar
    - `educacion` - Educación
    - `finanzas` - Finanzas
    - `retail` - Retail y E-commerce
    - `servicios` - Servicios Profesionales
    - `manufactura` - Manufactura
    - `turismo` - Turismo y Hospitalidad
    - `inmobiliaria` - Bienes Raíces
    - `otros` - Otros

- **`contactEmail`** (string)
  - **Descripción**: Email de contacto principal
  - **Tipo**: Email
  - **Validación**: Formato de email válido

- **`phone`** (string)
  - **Descripción**: Número de teléfono de contacto
  - **Tipo**: Texto libre
  - **Ejemplo**: "+52 55 1234 5678"

- **`website`** (string)
  - **Descripción**: Sitio web de la empresa
  - **Tipo**: URL
  - **Validación**: Formato de URL válido
  - **Ejemplo**: "https://www.empresa.com"

- **`location`** (string)
  - **Descripción**: Ubicación principal de la empresa
  - **Tipo**: Texto libre
  - **Ejemplo**: "Ciudad, País"

- **`description`** (string)
  - **Descripción**: Descripción breve de la empresa
  - **Tipo**: Texto multilínea (4 filas)
  - **Validación**: Máximo 500 caracteres

---

## 🎭 **SECCIÓN 2: HISTORIA Y STORYTELLING**

### Campos Obligatorios:
- **`mission`** (string)
  - **Descripción**: Misión de la empresa
  - **Tipo**: Texto multilínea (4 filas)
  - **Validación**: Máximo 300 caracteres

- **`vision`** (string)
  - **Descripción**: Visión de la empresa
  - **Tipo**: Texto multilínea (4 filas)
  - **Validación**: Máximo 300 caracteres

- **`brandStory`** (string)
  - **Descripción**: Historia de la marca
  - **Tipo**: Texto multilínea (5 filas)
  - **Validación**: Máximo 800 caracteres

- **`values`** (array de strings)
  - **Descripción**: Valores corporativos
  - **Tipo**: Lista dinámica
  - **Validación**: Mínimo 3 valores, máximo 10
  - **Ejemplo**: ["Innovación", "Transparencia", "Excelencia"]

---

## 🛍️ **SECCIÓN 3: PRODUCTOS Y SERVICIOS**

### Campos Obligatorios:
- **`productDescription`** (string)
  - **Descripción**: Descripción general de productos/servicios
  - **Tipo**: Texto multilínea (4 filas)
  - **Validación**: Máximo 600 caracteres

- **`products`** (array de strings)
  - **Descripción**: Lista de productos/servicios principales
  - **Tipo**: Lista dinámica
  - **Validación**: Mínimo 1 producto, máximo 20
  - **Ejemplo**: ["Software de gestión empresarial", "Consultoría digital"]

---

## 👥 **SECCIÓN 4: AUDIENCIA OBJETIVO**

### Campos Obligatorios:
- **`targetAgeGroup`** (string)
  - **Descripción**: Grupo de edad principal de la audiencia
  - **Tipo**: Select con opciones predefinidas
  - **Opciones**:
    - `18-24` - 18-24 años (Gen Z)
    - `25-34` - 25-34 años (Millennials jóvenes)
    - `35-44` - 35-44 años (Millennials mayores)
    - `45-54` - 45-54 años (Gen X)
    - `55-64` - 55-64 años (Baby Boomers jóvenes)
    - `65+` - 65+ años (Baby Boomers)
    - `mixed` - Audiencia mixta

- **`targetSocioeconomic`** (string)
  - **Descripción**: Nivel socioeconómico de la audiencia
  - **Tipo**: Select con opciones predefinidas
  - **Opciones**:
    - `alto` - Alto (Ingresos altos)
    - `medio-alto` - Medio-Alto
    - `medio` - Medio
    - `medio-bajo` - Medio-Bajo
    - `bajo` - Bajo
    - `varied` - Variado

- **`targetAudience.description`** (string)
  - **Descripción**: Descripción detallada de la audiencia
  - **Tipo**: Texto multilínea (4 filas)
  - **Validación**: Máximo 500 caracteres

- **`audienceBehavior`** (string)
  - **Descripción**: Comportamiento y preferencias de la audiencia
  - **Tipo**: Texto multilínea (4 filas)
  - **Validación**: Máximo 500 caracteres

---

## 🏆 **SECCIÓN 5: ANÁLISIS DE COMPETENCIA**

### Campos Obligatorios:
- **`competitiveAnalysis`** (string)
  - **Descripción**: Análisis del mercado y competencia
  - **Tipo**: Texto multilínea (4 filas)
  - **Validación**: Máximo 600 caracteres

- **`competitiveAdvantage`** (string)
  - **Descripción**: Ventaja competitiva principal
  - **Tipo**: Texto multilínea (4 filas)
  - **Validación**: Máximo 400 caracteres

- **`competitors`** (array de strings)
  - **Descripción**: Lista de competidores principales
  - **Tipo**: Lista dinámica
  - **Validación**: Mínimo 1 competidor, máximo 15
  - **Ejemplo**: ["Empresa ABC", "Startup XYZ"]

---

## 🎨 **SECCIÓN 6: BRANDING Y COMUNICACIÓN**

### Campos Obligatorios:
- **`brandPersonality`** (array de strings)
  - **Descripción**: Personalidad de marca
  - **Tipo**: Select con opciones predefinidas (selección múltiple)
  - **Opciones**:
    - `profesional` - Profesional y confiable
    - `innovadora` - Innovadora y vanguardista
    - `cercana` - Cercana y amigable
    - `premium` - Premium y exclusiva
    - `juvenil` - Juvenil y energética
    - `tradicional` - Tradicional y establecida
    - `disruptiva` - Disruptiva y audaz

- **`communicationTone`** (string)
  - **Descripción**: Tono de comunicación
  - **Tipo**: Select con opciones predefinidas
  - **Opciones**:
    - `formal` - Formal y corporativo
    - `casual` - Casual y relajado
    - `tecnico` - Técnico y especializado
    - `inspiracional` - Inspiracional y motivador
    - `educativo` - Educativo y didáctico
    - `conversacional` - Conversacional y directo
    - `emocional` - Emocional y empático

- **`brandDescription`** (string)
  - **Descripción**: Descripción de la identidad de marca
  - **Tipo**: Texto multilínea (4 filas)
  - **Validación**: Máximo 400 caracteres

- **`visualStyle`** (string)
  - **Descripción**: Estilo visual y preferencias
  - **Tipo**: Texto multilínea (4 filas)
  - **Validación**: Máximo 400 caracteres

---

## 📱 **SECCIÓN 7: CANALES Y ESTRATEGIA**

### Campos Obligatorios:
- **`marketingGoal`** (string)
  - **Descripción**: Objetivo principal de marketing
  - **Tipo**: Select con opciones predefinidas
  - **Opciones**:
    - `awareness` - Generar conocimiento de marca
    - `leads` - Generar leads y conversiones
    - `sales` - Incrementar ventas directas
    - `engagement` - Aumentar engagement y comunidad
    - `education` - Educar al mercado
    - `retention` - Retener clientes existentes
    - `recruitment` - Atraer talento

- **`marketingBudget`** (string)
  - **Descripción**: Presupuesto mensual aproximado
  - **Tipo**: Select con opciones predefinidas
  - **Opciones**:
    - `bajo` - Menos de $500.000
    - `medio-bajo` - $500.000 - $1.500.000
    - `medio` - $1.500.000 - $5.000.000
    - `medio-alto` - $5.000.000 - $15.000.000
    - `alto` - Más de $15.000.000
    - `flexible` - Flexible según resultados

- **`socialPlatforms`** (array de strings)
  - **Descripción**: Plataformas de redes sociales preferidas
  - **Tipo**: Selección múltiple
  - **Opciones**:
    - `facebook` - Facebook
    - `instagram` - Instagram
    - `linkedin` - LinkedIn
    - `twitter` - Twitter/X
    - `tiktok` - TikTok
    - `youtube` - YouTube

- **`contentStrategy`** (string)
  - **Descripción**: Estrategia de contenido
  - **Tipo**: Texto multilínea (4 filas)
  - **Validación**: Máximo 600 caracteres

- **`otherChannels`** (string)
  - **Descripción**: Otros canales de marketing
  - **Tipo**: Texto multilínea (3 filas)
  - **Validación**: Máximo 400 caracteres

---

## 📋 **RESUMEN DE VALIDACIONES**

### Validaciones Generales:
- **Campos requeridos**: Todos los campos listados son obligatorios
- **Longitud mínima**: Textos deben tener al menos 10 caracteres
- **Longitud máxima**: Según especificación por campo
- **Formato de email**: Validación RFC 5322
- **Formato de URL**: Validación de URL válida
- **Arrays**: Mínimo y máximo según especificación

### Validaciones Específicas:
- **`companyName`**: 2-100 caracteres
- **`contactEmail`**: Formato email válido
- **`website`**: Formato URL válido
- **`values`**: 3-10 elementos
- **`products`**: 1-20 elementos
- **`competitors`**: 1-15 elementos
- **`socialPlatforms`**: 1-6 elementos (máximo todas las plataformas)

---

## 🗄️ **ESTRUCTURA DE BASE DE DATOS SUGERIDA**

### Tabla Principal: `company_profiles`
```sql
CREATE TABLE company_profiles (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  company_name VARCHAR(100) NOT NULL,
  industry VARCHAR(50) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  website VARCHAR(255),
  location VARCHAR(100),
  description TEXT,
  mission TEXT,
  vision TEXT,
  brand_story TEXT,
  product_description TEXT,
  target_age_group VARCHAR(20),
  target_socioeconomic VARCHAR(20),
  target_audience_description TEXT,
  audience_behavior TEXT,
  competitive_analysis TEXT,
  competitive_advantage TEXT,
  brand_description TEXT,
  visual_style TEXT,
  communication_tone VARCHAR(50),
  marketing_goal VARCHAR(50),
  marketing_budget VARCHAR(50),
  content_strategy TEXT,
  other_channels TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tablas Relacionales:
```sql
-- Valores corporativos
CREATE TABLE company_values (
  id UUID PRIMARY KEY,
  company_profile_id UUID REFERENCES company_profiles(id),
  value VARCHAR(100) NOT NULL
);

-- Productos/Servicios
CREATE TABLE company_products (
  id UUID PRIMARY KEY,
  company_profile_id UUID REFERENCES company_profiles(id),
  product_name VARCHAR(200) NOT NULL
);

-- Competidores
CREATE TABLE company_competitors (
  id UUID PRIMARY KEY,
  company_profile_id UUID REFERENCES company_profiles(id),
  competitor_name VARCHAR(200) NOT NULL
);

-- Personalidad de marca
CREATE TABLE company_brand_personality (
  id UUID PRIMARY KEY,
  company_profile_id UUID REFERENCES company_profiles(id),
  personality_type VARCHAR(50) NOT NULL
);

-- Plataformas sociales
CREATE TABLE company_social_platforms (
  id UUID PRIMARY KEY,
  company_profile_id UUID REFERENCES company_profiles(id),
  platform VARCHAR(50) NOT NULL
);
```

---

## 🚀 **ENDPOINTS SUGERIDOS PARA EL BACKEND**

### Endpoints Principales:
- `POST /api/company-profiles` - Crear perfil de empresa
- `GET /api/company-profiles/:id` - Obtener perfil de empresa
- `PUT /api/company-profiles/:id` - Actualizar perfil de empresa
- `DELETE /api/company-profiles/:id` - Eliminar perfil de empresa
- `GET /api/company-profiles/user/:userId` - Obtener perfil por usuario

### Endpoints de Validación:
- `POST /api/company-profiles/validate` - Validar datos del perfil
- `GET /api/company-profiles/industries` - Obtener lista de industrias
- `GET /api/company-profiles/age-groups` - Obtener grupos de edad
- `GET /api/company-profiles/socioeconomic-levels` - Obtener niveles socioeconómicos

---

## 📝 **NOTAS IMPORTANTES**

1. **Relación con Usuario**: Cada perfil de empresa debe estar asociado a un usuario autenticado
2. **Unicidad**: Un usuario solo puede tener un perfil de empresa
3. **Completitud**: El sistema debe validar que todos los campos obligatorios estén completos
4. **Historial**: Considerar guardar versiones anteriores del perfil para auditoría
5. **Exportación**: Permitir exportar el perfil en formato JSON/PDF
6. **Importación**: Permitir importar datos desde otros sistemas

---

*Documento generado para el desarrollo del backend del módulo Empresa de AIGENCIA*

