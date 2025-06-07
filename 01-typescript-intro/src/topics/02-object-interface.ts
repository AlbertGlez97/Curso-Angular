/**
 * Las interfaces en TypeScript son una forma de definir la estructura que deben tener los objetos,
 * especificando los nombres y tipos de sus propiedades. Permiten establecer contratos en el código,
 * facilitando la validación estática y la autocompletación en los editores. Las interfaces pueden
 * incluir propiedades obligatorias, opcionales (usando el operador '?'), y métodos. Son fundamentales
 * para garantizar la consistencia y robustez en aplicaciones TypeScript, especialmente en proyectos
 * grandes o colaborativos.
 */

/**
 * Arreglo de habilidades disponibles para los personajes.
 */
const skills: string[] = ["Bash", "Counter", "Healing"];

/**
 * Interfaz que define la estructura de un personaje.
 * @property name - Nombre del personaje.
 * @property hp - Puntos de vida del personaje.
 * @property skills - Arreglo de habilidades que posee el personaje.
 * @property hometown - Ciudad de origen del personaje (opcional).
 */
interface Character {
    name: string;
    hp: number;
    skills: string[];
    hometown?: string; // Propiedad opcional
}

/**
 * Objeto que representa al personaje 'Strider', implementando la interfaz Character.
 */
const strider: Character = {
    name: "Strider",
    hp: 100,
    skills: ["Bash", "Counter"],
};

/**
 * Asignación de la ciudad de origen al personaje 'Strider'.
 */
strider.hometown = "Rivendell"; // Se puede agregar la propiedad opcional

/**
 * Muestra la información del personaje en formato de tabla en la consola.
 */
console.table(strider);

export {};
