function Log(prefix: any){
    return (target: any) => {
        console.log(prefix, target)
    }
}

//acrescenta um atributo que a classe não tinha
function SetAPIVersion(apiVersion: string) {
    return (constructor: any) => {
        return class extends constructor {
            version = apiVersion
        }
    }
}


@SetAPIVersion('v1.0.0')
class API {}
console.log(new API)

@SetAPIVersion('v1.0.1')
class WebHook {}
console.log(new WebHook)

@Log('print')
class Example{}


export default {}