function storeInLocal(key,val){
    return localStorage.setItem(key,val);
}

function getFromLocal(key){
    return localStorage.getItem(key);
}

function removeFromLocal(key){
    localStorage.removeItem(key);
}

export {storeInLocal,removeFromLocal,getFromLocal};