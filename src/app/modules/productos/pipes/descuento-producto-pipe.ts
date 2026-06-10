import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descuentoProducto',
})
export class DescuentoProductoPipe implements PipeTransform {
  transform(valor: number, descuentoPorcentaje: number): number {
    //Valor invalido 
    if(!valor || isNaN(valor)){
      return 0
    }

    if(!descuentoPorcentaje || isNaN(descuentoPorcentaje) || descuentoPorcentaje <= 0){
      return valor
    }

    const discount = valor * (descuentoPorcentaje / 100)

    return valor - discount
  }
}