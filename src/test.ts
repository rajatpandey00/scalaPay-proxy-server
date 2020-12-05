type TypeCheck = {
    name?: string;
};

function namer(param: TypeCheck): string {
    if(param.name) {
        return param.name
    } else {
        return "Null"
    }
}
