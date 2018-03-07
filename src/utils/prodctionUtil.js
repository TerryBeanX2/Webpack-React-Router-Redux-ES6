let printFun;

if (process.env.NODE_ENV === 'production') {
    printFun = () => {
        console.log('生产环境代码');
    }
} else {
    printFun = () => {
        console.log('非生产环境代码');
    }
}

module.exports = {
    printFun
}