function storeInLocal(key,val){
    return localStorage.setItem(key,val);
}

function getFromLocal(key){
    return localStorage.getItem(key);
}

function removeFromLocal(key){
    return localStorage.removeItem(key);
}

export {storeInLocal,removeFromLocal,getFromLocal};