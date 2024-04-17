import { AbstractControl } from "@angular/forms";

// Esta seccion es para crear Valideitors personalizados para el formControl.
export class CustomValidators {
    // Creamos un valideitor statico
    static matchValues(toCompare: AbstractControl) {
        // Retorno el valor del formulario en el cual va este validador
        return (control: AbstractControl) => {
            // Esta condicion valida que si el valor con el que se compara no es el mismo que de un error sino retorne el valor comparado
            if (control.value !== toCompare.value) {
                return {noMatch: true}
                
            } else {
                return null
            }
        }
    }
}