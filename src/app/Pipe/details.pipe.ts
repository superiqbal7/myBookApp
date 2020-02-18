import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "details"
})
export class DetailsPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    return value.toLocaleLowerCase();
  }
}
