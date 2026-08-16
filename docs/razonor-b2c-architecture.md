# Adaptación B2C de Razonor

## Auditoría de la base existente

### Lo que se conserva

- Next.js 14 con App Router y componentes React en JavaScript.
- Tailwind y los tokens visuales actuales: navy, ámbar, fondos claros, radios amplios y sombras suaves.
- Clerk para identidad del padre y Supabase para persistencia.
- Mercado Pago para Colombia y Lemon Squeezy para otros mercados.
- Suscripción autoritativa en servidor y paywall existente.
- Perfiles infantiles múltiples, XP, racha, niveles, minutos, casos y habilidades.
- Motor de mundos, capítulos y casos. Los misterios pasan a ser `Desafío Razonor`, no se eliminan.
- Panel de padres, reportes semanales y analítica.

### Brechas encontradas

- El registro ocurría antes de entregar valor y el onboarding terminaba directamente en precios.
- La edad se guardaba como rango, insuficiente para personalizar contenido de 6 a 12 años.
- El posicionamiento principal hablaba de IA y programación antes que del resultado académico medible.
- Las habilidades internas de los casos no coinciden todavía uno a uno con las cuatro habilidades que verá el padre.
- El contenido vive principalmente en `lib/world.js`, un archivo demasiado grande para crecer hacia sesiones adaptativas.
- No existía un resultado diagnóstico persistido ni una capa separada para selección de ejercicios.

## Arquitectura progresiva

El sistema actual seguirá funcionando mientras se añaden módulos nuevos alrededor de él.

```text
Landing pública
  -> Onboarding público
  -> Diagnóstico público (banco separado de la UI)
  -> Resultados públicos
  -> Registro del padre (migra el progreso invitado)
  -> Paywall y proveedor de pago existente
  -> Home del niño / sesión diaria
  -> Progreso y panel de padres
```

## Contrato de ejercicio

```js
{
  id,
  category,
  skill,
  age: [min, max],
  difficulty,
  question,
  options,
  correctAnswer,
  explanation
}
```

La UI no decide dificultad ni mezcla categorías. Un motor de selección recibirá `edad + nivel por habilidad + intentos previos` y devolverá una sesión. Esto permitirá añadir en el futuro Math, Logic, Reading o Science sin acoplar los componentes a un único producto.

## Compatibilidad de datos

El perfil actual se amplía de forma aditiva con:

- `onboarding.age`
- `onboarding.primaryGoal`
- `onboarding.mathFeeling`
- `onboarding.dailyMinutes`
- `diagnostic.completed`
- `diagnostic.scores`
- `diagnostic.answers`

Los campos anteriores (`ageBand`, `goals`, `interests`) se mantienen para que los casos y cuentas existentes sigan funcionando.

## Próximas migraciones

1. Crear `ExerciseAttempt`, `DailySession`, `SkillProgress` y `WeeklyReport` como estructuras explícitas dentro del perfil y luego como tablas si el volumen lo exige.
2. Extraer gradualmente los ejercicios nuevos a bancos por dominio y edad.
3. Crear el selector adaptativo con reglas configurables y pruebas unitarias.
4. Reconvertir `/aprendo` en “Entrenamiento de hoy” sin eliminar el acceso a los mundos y casos.
5. Mapear las habilidades internas actuales a las cuatro métricas visibles para padres.
6. Adaptar el paywall a mensual/anual cuando existan productos reales configurados en ambos proveedores.
