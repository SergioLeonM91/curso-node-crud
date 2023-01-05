import colors from 'colors';
import { 
    inquirerMenu, 
    pause, 
    readInput,
    listTasksDelete,
    confirm,
    showListChecklist
} from './helpers/inquirer.js';
import { Tasks } from './models/tasks.js';
import { saveInfo, readFile } from './helpers/saveFile.js';

const main = async() => {

    let opt = '';
    const tasks = new Tasks();

    const tasksFile = readFile();

    if( tasksFile ) {
        tasks.loadTasksFromArray(tasksFile);
    }

    do {
        opt = await inquirerMenu();

        switch( opt ) {
            case '1':
                const desc = await readInput('Description:');
                tasks.createTask(desc);
            break;

            case '2':
                tasks.listingAllTasks();
            break;

            case '3':
                tasks.listingPendingCompleted(true);
            break;

            case '4':
                tasks.listingPendingCompleted(false);
            break;

            case '5':
                const ids = await showListChecklist(tasks.listingArr);
                tasks.toggleCompletedTasks( ids );
            break;

            case '6':
                const id = await listTasksDelete( tasks.listingArr );

                if( id !== '0' ) {
                    const response = await confirm('Are you sure?');

                    if( response ) {
                        tasks.deleteTask( id );
                        console.log('Task deleted');
                    }
                }

            break;
        }

        saveInfo( tasks.listingArr );

        await pause();
    } while ( opt !== '0' );

}

main();