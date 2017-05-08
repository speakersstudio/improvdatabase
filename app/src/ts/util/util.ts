export class Util {

    static indexOfId (array: any[], object: any): number {
        let index = -1,
            term = typeof(object) == 'string' ? object : object._id;
        array.some((o, i) => {
            if ((o._id && o._id == term) || o == term) {
                index = i;
                return true;
            }
        });
        return index;
    }

}