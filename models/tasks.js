import { Task } from './task.js';

class Tasks {

    _listing = {};

    get listingArr() {
        const listing = [];
        Object.keys( this._listing).forEach( key => {
            const task = this._listing[key];
            listing.push( task );
        });

        return listing;
    }

    constructor( desc ) {
        this._listing = {};
    }

    deleteTask( id = '' ) {
        if( this._listing[id]) {
            delete this._listing[id];
        }
    }

    loadTasksFromArray( tasks = [] ) {
        tasks.forEach( task => {
            this._listing[task.id] = task;
        });
    }

    createTask( desc = '' ) {
        const task = new Task( desc );
        this._listing[task.id] = task;
    }

    renderListing( task, index ) {
        const status = (task.completedIn) ? `Completed ${ task.completedIn }`.green : 'Pending'.red;
        const taskNumber = `${index+1}.`;
        console.log(`${taskNumber.green} ${task.desc} :: ${status}`);
    }

    listingAllTasks() {
        this.listingArr.forEach( (task, index) => {
            this.renderListing(task, index);
        });
    }

    listingPendingCompleted( completed = true ) {
        this.listingArr.forEach( (task, index) => {
            if(completed && task.completedIn) {
                this.renderListing(task, index);
            } else if(!completed && task.completedIn === null) {
                this.renderListing(task, index);
            }
        });
    }

    toggleCompletedTasks( ids = [] ) {
        ids.forEach( id => {
            const task = this._listing[id];

            if( !task.completedIn ) {
                task.completedIn = new Date().toISOString();
            }
        });

        this.listingArr.forEach( task => {
            if( !ids.includes(task.id) ) {
                this._listing[task.id].completedIn = null;
            }
        });
    }
}

export { Tasks };