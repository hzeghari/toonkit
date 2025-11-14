export interface TOONOptions {
  delimiter: string;
  indentation: string;
  showLengthMarkers: boolean;
}

export function jsonToTOON(json: string, options: TOONOptions): string {
  try {
    const obj = JSON.parse(json);
    return convertToTOON(obj, options, 0);
  } catch {
    throw new Error('Invalid JSON');
  }
}

function convertToTOON(obj: unknown, options: TOONOptions, depth: number): string {
  const indent = options.indentation.repeat(depth);

  if (obj === null) return 'null';
  if (typeof obj === 'boolean') return obj.toString();
  if (typeof obj === 'number') return obj.toString();
  if (typeof obj === 'string') return needsQuotes(obj, options.delimiter) ? `"${obj}"` : obj;

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    
    // Check if array is uniform (all objects with same keys)
    if (isUniformArray(obj)) {
      return convertUniformArray(obj, options, depth);
    } else {
      // Non-uniform array - use traditional format
      return convertNonUniformArray(obj, options, depth);
    }
  }

  if (typeof obj === 'object') {
    const lines: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
      const formattedKey = needsQuotes(key, options.delimiter) ? `"${key}"` : key;
      
      if (Array.isArray(value) && isUniformArray(value)) {
        lines.push(`${indent}${formattedKey}: ${convertUniformArray(value, options, depth)}`);
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        lines.push(`${indent}${formattedKey}:`);
        lines.push(convertToTOON(value, options, depth + 1));
      } else {
        const formattedValue = convertToTOON(value, options, depth);
        lines.push(`${indent}${formattedKey}: ${formattedValue}`);
      }
    }
    return lines.join('\n');
  }

  return String(obj);
}

function isUniformArray(arr: unknown[]): boolean {
  if (arr.length === 0) return false;
  if (!arr.every(item => typeof item === 'object' && item !== null && !Array.isArray(item))) {
    return false;
  }

  const firstKeys = Object.keys(arr[0] as Record<string, unknown>).sort();
  return arr.every(item => {
    const keys = Object.keys(item as Record<string, unknown>).sort();
    return keys.length === firstKeys.length && keys.every((key, i) => key === firstKeys[i]);
  });
}

function convertUniformArray(arr: unknown[], options: TOONOptions, depth: number): string {
  if (arr.length === 0) return '[]';

  const keys = Object.keys(arr[0] as Record<string, unknown>);
  const lengthMarker = options.showLengthMarkers ? `[${arr.length}]` : '';
  const header = `${lengthMarker}{${keys.join(options.delimiter)}}:`;
  
  const indent = options.indentation.repeat(depth + 1);
  const rows = arr.map(item => {
    const obj = item as Record<string, unknown>;
    const values = keys.map(key => {
      const value = obj[key];
      if (value === null) return 'null';
      if (typeof value === 'boolean') return value.toString();
      if (typeof value === 'number') return value.toString();
      if (typeof value === 'string') return needsQuotes(value, options.delimiter) ? `"${value}"` : value;
      return JSON.stringify(value);
    });
    return `${indent}${values.join(options.delimiter)}`;
  });

  return `${header}\n${rows.join('\n')}`;
}

function convertNonUniformArray(arr: unknown[], options: TOONOptions, depth: number): string {
  const nextIndent = options.indentation.repeat(depth + 1);
  
  const lengthMarker = options.showLengthMarkers ? `[${arr.length}]` : '';
  const items = arr.map(item => `${nextIndent}- ${convertToTOON(item, options, depth + 1)}`);
  
  return `${lengthMarker}\n${items.join('\n')}`;
}

function needsQuotes(str: string, delimiter: string): boolean {
  // Need quotes if string contains delimiter, newlines, or special characters
  return str.includes(delimiter) || 
         str.includes('\n') || 
         str.includes(':') ||
         str.trim() !== str ||
         str === '' ||
         /^[\d.-]/.test(str); // starts with number
}
