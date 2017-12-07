import db from '../db.json';

function getItems(start, end) {
    const arr = JSON.parse(JSON.stringify(db.photos));
    const result = arr.splice(start, end);
    return result;
}

export {
    getItems
}
