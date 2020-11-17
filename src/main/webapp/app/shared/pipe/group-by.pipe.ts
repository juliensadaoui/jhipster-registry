import { Pipe, PipeTransform } from '@angular/core';

interface T {
  [index: string]: any;
}

@Pipe({
  name: 'groupBy',
})
export class GroupByPipe implements PipeTransform {
  transform(collection: T[], term: string): any[] {
    const newValue: T[] = [];

    collection.forEach(col => {
      const keyVal = this.deepFind(col, term);
      const index = newValue.findIndex(myObj => myObj.key === keyVal);
      if (index >= 0) {
        newValue[index].value.push(col);
      } else {
        newValue.push({ key: keyVal, value: [col] });
      }
    });
    return newValue;
  }

  private deepFind(obj: T, path: string): unknown {
    const paths = path.toString().split(/[.[\]]/);
    let current = obj;

    paths.forEach(onePath => {
      if (onePath !== '') {
        if (current[onePath]) {
          current = current[onePath];
        }
      }
    });
    return current;
  }
}
