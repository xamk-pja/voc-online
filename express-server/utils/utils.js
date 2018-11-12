// Dynamic sorter util function for objects
export function dynamicSort(property, sortOrder) {
    if ( sortOrder === "asc" ) {
        sortOrder = 1;
    } else {
        sortOrder = -1;
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }