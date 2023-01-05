import { v4 as uuidv4 } from 'uuid';

class Task {

    id = '';
    desc = '';
    completedIn = null;

    constructor( desc ) {
        this.id = uuidv4();
        this.desc = desc;
        this.completedIn = null;
    }
}

export { Task };