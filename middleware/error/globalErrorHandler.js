let MODE = 'DEVELOPMENT' // or PRODUCTION
const HandleGlobalErrors=(err,req,res,next) =>{
    if (MODE =='DEVELOPMENT') {
        DevMode(res,err)
    }
    else{
        ProdMode(res,err)
    }
}
const DevMode =(res,err)=>{
    let code = err.statusCode || 500
    console.log({err:err.message,stack:err.stack});
    res.status(code).json({err:err.message,statusCode:err.statusCode}) //,stack:err.stack
}
const ProdMode =(res,err)=>{
    let code = err.statusCode || 500
    res.status(code).json({err:err.message})
}
export default HandleGlobalErrors;
