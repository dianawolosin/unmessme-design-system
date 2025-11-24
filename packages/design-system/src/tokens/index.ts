import colors from './colors.json';
import elevation from './elevation.json';
import radius from './radius.json';
import spacing from './spacing.json';
import typography from './typography.json';
import borders from './borders.json';
import effects from './effects.json';

// Type helper to strip { $value: T } wrapper
type StripToken<T> = T extends { $value: infer V } ? V : {
  [K in keyof T]: StripToken<T[K]>
};

// Helper to resolve references like {color.primitive.slate.900}
function resolveReferences(
  value: string,
  allTokens: any
): string {
  if (!value || typeof value !== 'string' || !value.includes('{')) {
    return value;
  }

  return value.replace(/\{([^}]+)\}/g, (_, path) => {
    const parts = path.split('.');
    let current = allTokens;
    
    for (const part of parts) {
      current = current?.[part];
    }

    if (current?.$value) {
      // Recursively resolve if the referenced value is also a reference
      return resolveReferences(current.$value, allTokens);
    }
    
    console.warn(`Could not resolve token reference: ${path}`);
    return value;
  });
}

// Flatten the token object to just values (removing $value, $type)
function processTokens(
  obj: any, 
  allTokens: any
): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // If it's a token object with a $value
  if ('$value' in obj) {
    return resolveReferences(obj.$value, allTokens);
  }

  // Otherwise recurse
  const result: any = {};
  for (const key in obj) {
    if (key === '$schema' || key === '$type') continue;
    result[key] = processTokens(obj[key], allTokens);
  }
  return result;
}

// Aggregate all raw tokens
const rawTokens = {
  color: colors.color,
  elevation: elevation.elevation,
  radius: radius.radius,
  spacing: spacing.spacing,
  typography: typography.typography,
  border: borders.border,
  effect: effects.effect,
};

// Processed tokens (values only)
export const tokens = processTokens(rawTokens, rawTokens) as StripToken<typeof rawTokens>;

// Export raw for reference if needed
export const raw = rawTokens;
